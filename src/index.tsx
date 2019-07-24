import "../scss/app.scss"
import * as React from "react";
import * as ReactDOM from "react-dom";
import thunkMiddleware from 'redux-thunk'
import App from "./components/App";
import {applyMiddleware, createStore} from "redux";
import appReducer from "./reducers/appReducer";
import Root from "./components/Root";

const store = createStore(
    appReducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
)

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);


const c1 = 0;
let v = "";

const arr1 = [1,2,3,4];
const arr = [...arr1, 5,6,7,47];

const print = (s) => console.log(s);

print("hello world");
console.table(arr);
document.write("Je débute avec Webpack !!!!!");