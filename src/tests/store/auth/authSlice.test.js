import { authSlice, checkingCredentials, login, logout } from '../../../store/auth/authSlice';
import { authenticatedState , initialState, demoUser } from '../../fixtures/authFixtures';

describe('Test Auth Slice', () => {  

    test('should validate initial state and correct slice name', () => { 
        
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('should make authentication', () => {

        const state = authSlice.reducer( initialState, login( demoUser ) );
        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });

    test('should do logout without arguments', () => {

        // authenticatedState // logout sin argumentos
        const state = authSlice.reducer( authenticatedState, logout() );
        expect(state).toEqual({
            status: 'not-auth',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    });

    test('should do logout ans show a message', () => {

        // authenticatedState // logout con argumentos 
        const errorMessage = 'credentials are not correct';

        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );
        expect(state).toEqual({
            status: 'not-auth',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
        
    });

    test('should change status tu checking', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking');
    });


})