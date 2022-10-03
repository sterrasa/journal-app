import { async } from "@firebase/util";
import { signInWithGoogle , registerUserWithEmail, loginFirebaseUserAndPassword } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./"

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (!result.success) return dispatch(logout(result.errorMessage))
        dispatch(login(result))
    }
}


export const startAutheticationWithEmail = (user) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await registerUserWithEmail(user);
        if (!result.success) return dispatch(logout(result));
        dispatch(login(result));
    }
}

export const loginWithUserAndPassword = ( credentials ) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginFirebaseUserAndPassword(credentials);
        if (!result.success) return dispatch(logout(result));
        dispatch(login(result));       
    }
}