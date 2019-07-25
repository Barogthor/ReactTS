import {TodoItem} from "../store/Todo/types";
import * as React from "react";
import {AddTodo, DeleteTodo, SwitchTodo} from "../store/Todo/actions";


interface TodoProps{
    idOfTodo: number,
    todo: TodoItem,
    deleteTodo: (idOfTodo: number) => {},
    switchTodo: (idOfTodo: number) => {},
}

class Todo extends React.Component<TodoProps>{

    constructor(props){
        super(props)
        this.changeTodoStatus = this.changeTodoStatus.bind(this)
        this.deleteClick = this.deleteClick.bind(this)

    }

    componentDidMount(){
        console.log("Todo", this.props);
    }

    changeTodoStatus(event: React.ChangeEvent){
        this.props.switchTodo(this.props.idOfTodo)
    }

    deleteClick(){
        this.props.deleteTodo(this.props.idOfTodo)
    }

    render(){
        console.log(this.props.todo);
        return (
            <div>
                <input type={"checkbox"} onChange={this.changeTodoStatus} checked={this.props.todo.isDone} />
                <span>{this.props.todo.content}</span>
                <button onClick={this.deleteClick} style={{color:"red"}}>delete</button>
            </div>
        )
    }
}

export default Todo