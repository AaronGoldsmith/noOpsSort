import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
// import WordLoader from "./components/WordLoader/WordLoader.js";
import TestController from "./components/TestController/TestController";
import "./styles.css";

function App() {
  const [wordList, setWords] = useState(0);
  const handleVal = useCallback(e => {
    setWords(e);
  }, []);

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
