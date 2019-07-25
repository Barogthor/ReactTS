import * as React from 'react';
import {connect} from "react-redux";
import {TodoState} from "../store/Todo/types";
import Todo from "../components/Todo";
import {AddTodo, DeleteTodo, SwitchTodo} from "../store/Todo/actions";
import TodoForm from "../components/TodoForm";
import {AppState} from "../store";


interface TodoListingProps {
    schedule: TodoState,
    deleteTodo: typeof DeleteTodo,
    switchTodo: typeof SwitchTodo,
    addTodo: typeof AddTodo
}

class TodoListing extends React.Component<TodoListingProps> {

    render() {

        return (
            <div>
                <h1>Welcome to React with Typescript</h1>
                <div>
                {
                    this.props.schedule.todos.map((todo, index) => {
                        return (<Todo key={index} idOfTodo={index} todo={todo} deleteTodo={this.props.deleteTodo}
                              switchTodo={this.props.switchTodo}/>)
                    })
                }
                </div>
                <TodoForm addTodo={this.props.addTodo}/>
            </div>
        )

    }
}

const mapStateToProps = (state: AppState) => {
    return {
        schedule: state.schedule,
        // addTodo: AddTodo,
        // deleteTodo: DeleteTodo,
        // switchTodo: SwitchTodo
    }
}

const mapDispatchToProps = dispatch => ({
    addTodo: newTodo => dispatch(AddTodo(newTodo)),
    deleteTodo: idOfTodo => dispatch(DeleteTodo(idOfTodo)),
    switchTodo: idOfTodo => dispatch(SwitchTodo(idOfTodo))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoListing);