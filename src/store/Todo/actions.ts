import {ADD_TODO, SWITCH_TODO, DELETE_TODO, TodoItem, TodoActionTypes} from "./types";


export function AddTodo(newTodo : string) : TodoActionTypes{
    console.log("test action");
    const todo: TodoItem = {content: newTodo, isDone: false}
    return {
        type: ADD_TODO,
        todo: todo
    }
}

export function DeleteTodo(idOfTodo : number) : TodoActionTypes{
    return {
        type: DELETE_TODO,
        id: idOfTodo
    }
}
export function SwitchTodo(idOfTodo : number) : TodoActionTypes{
    return {
        type: SWITCH_TODO,
        id: idOfTodo
    }
}