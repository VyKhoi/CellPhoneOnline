import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/js/bootstrap.min.js";
import CountProvider from "./component/counterCart/provider";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./component/storeProduct/provider";
import { CartProvider } from "./component/cart/CartContext";
import { BranchProvider } from "./component/branchSelect/BranchContext";
import { TypeOfProductProvider } from "./component/typeOfProduct/context";
import { SearchProvider } from "./component/searchKeyWord/searchKeyWord";
import UserContextProvider from "./component/userLogin/userlogin";
const root = ReactDOM.createRoot(document.getElementById("root"));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch((err) => {
        console.error('ServiceWorker registration failed: ', err);
      });
  });
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <BranchProvider>
        <SearchProvider>
          <TypeOfProductProvider>
            <CartProvider>
              <CountProvider>
                <ProductProvider>
                  <App />
                </ProductProvider>
              </CountProvider>
            </CartProvider>
          </TypeOfProductProvider>
        </SearchProvider>
      </BranchProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
