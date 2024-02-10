import axios from "axios";
import { LOGOUT_USER, REGISTER_USER_ACTION, REGISTER_USER_ACTION_LOADING_FALSE, REGISTER_USER_ACTION_LOADING_TRUE } from "../constants/user.constants";
import API from '../../../api.json'
import { SET_APP_LOADING_FALSE, SET_APP_LOADING_TRUE } from "../constants/app.constant";

export const RegisterUserAction = (data, toast, navigate) => async (dispatch, getState) => {
    try {
        dispatch({ type: REGISTER_USER_ACTION_LOADING_TRUE })
        let registerRequest = await axios.post(API.BACKEND_API + '/user/register', data)
        let registerResponse = await registerRequest.data
        localStorage.setItem("blogAppToken", registerResponse.token)
        dispatch({ type: REGISTER_USER_ACTION, payload: { user: registerResponse.user, token: registerResponse.token } })
        let findElement = document.getElementById("closeLoginModalButton1Id")
        findElement.click()
        navigate(`/${registerResponse?.user?._id}/dashboard`)
        dispatch({ type: REGISTER_USER_ACTION_LOADING_FALSE })

    } catch (error) {
        dispatch({ type: REGISTER_USER_ACTION_LOADING_FALSE })
        if (error) {
            toast.error(error?.response?.data?.msg)
        }
    }
}


export const LoginUserAction = (data, toast, navigate) => async (dispatch, getState) => {
    try {
        dispatch({ type: REGISTER_USER_ACTION_LOADING_TRUE })
        let registerRequest = await axios.post(API.BACKEND_API + '/user/login', data)
        let registerResponse = await registerRequest.data
        localStorage.setItem("blogAppToken", registerResponse.token)
        dispatch({ type: REGISTER_USER_ACTION, payload: { user: registerResponse.user, token: registerResponse.token } })
        let findElement = document.getElementById("closeLoginModalButtonId")
        findElement.click()
        navigate(`/${registerResponse?.user?._id}/dashboard`)
        dispatch({ type: REGISTER_USER_ACTION_LOADING_FALSE })
    } catch (error) {
        dispatch({ type: REGISTER_USER_ACTION_LOADING_FALSE })
        if (error) {
            toast.error(error?.response?.data?.msg)
            console.log(error);
        }
    }
}

export const AuthenticateUserAction = (token, navigate, toast) => async (dispatch) => {
    try {
        dispatch({ type: SET_APP_LOADING_TRUE })
        let authenticateUserRequest = await axios.get(API.BACKEND_API + '/user/get/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let authenticateUserResponse = await authenticateUserRequest.data
        if (authenticateUserResponse?.user) {
            dispatch({ type: REGISTER_USER_ACTION, payload: { user: authenticateUserResponse.user, token } })
        }
        dispatch({ type: SET_APP_LOADING_FALSE })

    } catch (error) {
        dispatch({ type: SET_APP_LOADING_FALSE })
        if (error?.response?.status == 401) {
            toast.error(error?.response?.data?.msg)
            localStorage.removeItem('blogAppToken')
            dispatch({ type: LOGOUT_USER })
            navigate('/')
        }
        console.log(error);
    }
}