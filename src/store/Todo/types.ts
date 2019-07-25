
export interface TodoItem {
    isDone: boolean,
    content: string
}

export interface TodoState{
    todos: TodoItem[]
}

export const ADD_TODO = "ADD_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const SWITCH_TODO = "SWITCH_TODO"

export interface AddTodoAction{
    type: typeof ADD_TODO,
    todo: TodoItem
}

export interface DeleteTodoAction{
    type: typeof DELETE_TODO,
    id: number
}

export interface SwitchTodoAction{
    type: typeof SWITCH_TODO,
    id: number
}

export type TodoActionTypes = AddTodoAction | DeleteTodoAction | SwitchTodoAction