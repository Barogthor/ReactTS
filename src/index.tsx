import "../scss/app.scss"
import * as React from "react";
import * as ReactDOM from "react-dom";
import thunkMiddleware from 'redux-thunk'
import App from "./components/App";
import {applyMiddleware, createStore} from "redux";
import Root from "./components/Root";
import {todoReducer} from "./store/Todo/reducers";
import configureStore from "./store";

const store = configureStore()

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);

const unsubscribe = store.subscribe(() => console.log(store.getState()))