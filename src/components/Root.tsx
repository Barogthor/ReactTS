import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import App from "./App";
import Index from "./Index";


const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <App>
                <Route exact path={"/"} component={Index} />
            </App>
        </Router>
    </Provider>
)




Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root