import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger'
import {todoReducer} from "./Todo/reducers";


const rootReducer = combineReducers({
    schedule: todoReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore(){
    const middlewares = [thunkMiddleware, createLogger()];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        middleWareEnhancer
    )

    return store
}