import { loginFirebaseUserAndPassword, logoutFirebase, signInWithGoogle } from '../../../firebase/providers';
import { checkingCredentials, login, logout } from '../../../store/auth';
import { checkingAuthentication, startGoogleSignIn, loginWithUserAndPassword, startLogoutFirebase } from '../../../store/auth/thunks';
import { clearNotesLogout } from '../../../store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../firebase/providers');

describe('Test AuthThunks', () => {
    
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );


    test('debe de invocar el checkingCredentials', async() => {
        
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        
    });


    test('startGoogleSignIn should call checkingCredentials and login - Sucess', async() => {
        
        const loginData = { success: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        //expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    

    test('startGoogleSignIn sould call checkingCredentials and logout - Error', async() => {
        
        const loginData = { ok: false, errorMessage: 'error with Google' };
        await signInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) );

    });

    test('startLoginWithEmailPassword should call checkingCredentials and login - Sucess', async() => {
        
        const loginData = { success: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginFirebaseUserAndPassword.mockResolvedValue( loginData );

        await loginWithUserAndPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });


    test('startLogout should call logoutFirebase, clearNotes and logout', async() => {

        await startLogoutFirebase()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    });

    
});