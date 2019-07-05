import React from "react";
import ReactDOM from "react-dom";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import TestController from "./components/TestController/TestController";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <TestController />
    </div>
  );
}

const rootElement = document.getElementById("root");
const storeWithThunk = createStore(reducers, {}, applyMiddleware(ReduxThunk));
ReactDOM.render(
  <Provider store={storeWithThunk}>
    <App />
  </Provider>,
  rootElement
);
