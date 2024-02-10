import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import UserReducer from './reducers/UserReducer'
import AppReducer from './reducers/AppReducer'
import BlogReducer from './reducers/BlogReducer'

const combineReducer = combineReducers({
    AppReducer: AppReducer,
    UserReducer: UserReducer,
    BlogReducer: BlogReducer
})

const store = legacy_createStore(combineReducer, applyMiddleware(thunk))

export default store
