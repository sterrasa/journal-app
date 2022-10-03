import { signInWithGoogle , registerUserWithEmail } from "../../firebase/providers";
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
        console.log(result);
        //if (!result.success) return dispatch(logout(result.errorMessage))
        //dispatch(created(result))
    }
}