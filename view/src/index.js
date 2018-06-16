import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import reducer from "./reducers/index";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { SocketProvider } from "socket.io-react";
import io from "socket.io-client";

const store = createStore(reducer, {}, applyMiddleware(reduxThunk));
const socket = io.connect("https://pacific-lake-47000.herokuapp.com/");

ReactDOM.render(
  <Provider store={store}>
    <SocketProvider socket={socket}>
      <App />
    </SocketProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
