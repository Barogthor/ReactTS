import {TodoItem} from "../store/Todo/types";
import * as React from "react";
import {AddTodo} from "../store/Todo/actions";


interface TodoProps{
    addTodo: (newTodo: string) => {},
}

class TodoForm extends React.Component<TodoProps>{
    state = {
        content: ""
    }

    constructor(props){
        super(props)
        this.addTodo = this.addTodo.bind(this)
        this.changeContent = this.changeContent.bind(this)
    }

    componentDidMount(){
    }

    addTodo(e: React.FormEvent){
        e.preventDefault()
        this.props.addTodo(this.state.content)
        this.setState({content: ""})
    }

    changeContent(e){
        this.setState({content: e.target.value})
    }

    render(){
        return (
            <form onSubmit={this.addTodo}>
                <input type={"text"} onChange={this.changeContent} value={this.state.content} />
                <button type={"submit"}>Add todo</button>
            </form>
        )
    }
}

export default TodoForm