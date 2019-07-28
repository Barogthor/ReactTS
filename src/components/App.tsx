import * as React from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";

const App = ({children}) => {
    return (
        <React.Fragment>
            <div><Link to={'/'} >Todos</Link>|<Link to={'/chess'} >Chess</Link></div>
            <div className={"grid-container"}>
                {children}
            </div>
        </React.Fragment>
    )
}

export default App;