import {
    createUserWithEmailAndPassword, GoogleAuthProvider,
    signInWithPopup, updateProfile, signInWithEmailAndPassword
} from 'firebase/auth';
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        console.log(result.user);

        const { email, photoURL, displayName, uid } = result.user;

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

export const registerUserWithEmail = async ({ email, password, displayName }) => {
    try {

        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        updateProfile(FirebaseAuth.currentUser, { displayName })

        const { uid, photoURL } = result.user;

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

export const loginFirebaseUserAndPassword  = async ({ email, password }) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const { uid, photoURL, displayName } = result.user;

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
