import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        console.log( result.user);

        const { email, photoURL, displayName , uid} = result.user;

        return {
            success: true,
            email,
            photoURL,
            displayName,
            uid
        }


    } catch (error) {
        return {
            success: false,
            errorMessage: error.message
        }
    }
}

export const registerUserWithEmail = async ({ email, password, userName }) => {
    try {

        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        

        const { uid, photoURL } = result.user;

        console.log(result.user)

        /*return {
            success: true,
            email,
            photoURL,
            displayName,
            uid
        }*/


    } catch (error) {
        return {
            success: false,
            errorMessage: error.message
        }
    }
}