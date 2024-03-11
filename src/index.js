import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TokenContextProvider from "./Components/Context/TokenContext";
import CartContextProvider from "./Components/Context/CartContext";
import WishListContextProvider from "./Components/Context/WishListContext";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "../node_modules/react-query/es/devtools/devtools";

const root = ReactDOM.createRoot(document.getElementById("root"));
const query = new QueryClient();
root.render(
  <QueryClientProvider client={query}>
    <TokenContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </WishListContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
