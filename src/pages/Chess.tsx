import * as React from 'react';
import {connect} from "react-redux";
import {TodoState} from "../store/Todo/types";
import Todo from "../components/Todo";
import {AddTodo, DeleteTodo, SwitchTodo} from "../store/Todo/actions";
import TodoForm from "../components/TodoForm";
import {AppState} from "../store";
import Chessboard from "../components/Chessboard";


interface ChessProps {

}

class TodoListing extends React.Component<ChessProps> {

    render() {

        return (
            <div>
                <h1>Welcome to Chessboard</h1>
                <Chessboard/>
            </div>
        )

    }
}

const mapStateToProps = (state: AppState) => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoListing);