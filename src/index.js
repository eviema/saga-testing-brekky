import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import rootSaga from "./saga";
import App from "./App";

const Root = ({ children, initialState = {} }) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return <Provider store={store}>{children}</Provider>;
};

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById("root")
);
