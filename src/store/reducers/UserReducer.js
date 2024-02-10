import { LOGOUT_USER, REGISTER_USER_ACTION, REGISTER_USER_ACTION_LOADING_FALSE, REGISTER_USER_ACTION_LOADING_TRUE } from "../constants/user.constants"

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

const UserReducer = (state = initialState, action) => {
    if (action.type == REGISTER_USER_ACTION) {
        return { ...state, user: action.payload.user, token: action.payload.token }
    }
    if (action.type == LOGOUT_USER) {
        return { ...state, user: null, token: null }
    }
    if (action.type == REGISTER_USER_ACTION_LOADING_FALSE) {
        return { ...state, loading: false }
    }
    if (action.type == REGISTER_USER_ACTION_LOADING_TRUE) {
        return { ...state, loading: true }
    }
    return state
}

export default UserReducer