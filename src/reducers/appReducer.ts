import {combineReducers} from 'redux'
import {initialState} from "../constant";
import {CHANGE_COLOR} from "../actions/colorAction";


function app(state = initialState, action){
    switch (action.type){
        case CHANGE_COLOR:
            return {...state, color:action.color}
        default:
            return state
    }
}

const appReducer = combineReducers({
    app
})

export default appReducer