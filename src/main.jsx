import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from "react-redux";
import rootReducer from "./reducer/index.js";
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from 'react-router-dom';
import CustomErrorBoundaryForRoutes from './components/HOC/CustomErrorBoundaryForRoutes.jsx';
import i18next from './Translation/TranslationProvider.jsx'
import { I18nextProvider } from 'react-i18next'

const store = configureStore({
  reducer: rootReducer,
});

// console.log=()=>{}
// console.error=()=>{}
// console.info=()=>{}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <BrowserRouter>
          <CustomErrorBoundaryForRoutes errorMsg="Something went wrong. Please try again later !">
            <App />
          </CustomErrorBoundaryForRoutes>
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
)
