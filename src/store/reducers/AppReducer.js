import { SET_APP_LOADING_FALSE, SET_APP_LOADING_TRUE } from "../constants/app.constant"

const initialState = {
    loading: false
}

const AppReducer = (state = initialState, action) => {
    if (action.type == SET_APP_LOADING_FALSE) {
        return { ...state, loading: false }
    }
    if (action.type == SET_APP_LOADING_TRUE) {
        return { ...state, loading: true }
    }
    return state
}

export default AppReducer