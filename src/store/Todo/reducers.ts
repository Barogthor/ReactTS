import {ADD_TODO, SWITCH_TODO, DELETE_TODO, TodoActionTypes, TodoState} from "./types";


const initialState: TodoState = {
    todos: []
}

export function todoReducer(
    state = initialState,
    action: TodoActionTypes
) : TodoState {
    console.log("test reducer");
    switch (action.type){
        case ADD_TODO:
            return {
                todos: [...state.todos, action.todo]
            }
        case DELETE_TODO:
            return {
                todos: state.todos.filter( (todo, index) => {
                    if(index!=action.id)
                        return todo
                })
            }
        case SWITCH_TODO:
            const nextTodos = [...state.todos]
            nextTodos[action.id].isDone = !state.todos[action.id].isDone
            return {
                todos: nextTodos
            }
        default:
            return state
    }
}