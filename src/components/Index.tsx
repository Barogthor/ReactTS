import * as React from 'react';
import {ColorProps} from "../ColorProps";
import {connect} from "react-redux";


class Index extends React.Component<ColorProps> {



    changeColor(event){
        this.setState({color:event.target.value})
    }

    submitColor(event){
        event.preventDefault()
        console.log(this);
    }

    render() {
        return (<div style={{backgroundColor: this.props.color}}>
            <h1>Welcome to React with Typescript</h1>
        <p>The color of this page is: {this.props.color} </p>
            <form onSubmit={this.submitColor}>
                <input type={"text"} onChange={this.changeColor} />
                <button type={"submit"}>change</button>
            </form>
        </div>)

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        color: state.app.color
    }
}

export default connect(mapStateToProps)(Index);