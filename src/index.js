import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { combineReducers, createStore } from "redux";
import userReducer from "./components/Feature/User";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import { slice } from "stylis";
import "react-toastify/dist/ReactToastify.css";
window.Buffer = window.Buffer || require("buffer").Buffer;

// devTools: process.env.NODE_ENV !== "production",
const reducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // middleware: [thunk],
);
const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CookiesProvider>
          <div className="hidden md:block">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              Transition={slice}
              style={{ fontSize: "16px", zIndex: 999999999999 }}
              pauseOnHover
            />
          </div>
          <div className="block md:hidden">
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              Transition={slice}
              style={{
                width: "90%",
                fontSize: "14px",
                margin: "20px",
                zIndex: 999999999999,
              }}
              pauseOnHover
            />
          </div>
          <App />
        </CookiesProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  {
    /* </React.StrictMode> */
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
