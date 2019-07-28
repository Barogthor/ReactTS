import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import App from "./App";
import TodoListing from "../pages/TodoListing";
import Chess from "../pages/Chess";


const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <App>
                <Route exact path={"/"} component={TodoListing} />
                <Route exact path={"/chess"} component={Chess} />
            </App>
        </Router>
    </Provider>
)




Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root