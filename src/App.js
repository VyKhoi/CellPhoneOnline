import Header from "./component/layout/component/header";

import Footer from "./component/layout/component/footer";

import "./static/css/globalStyle/style.css";
import Home from "./pages/home";

import CartIcon from "./component/layout/component/iconCart";

import React, { useContext, useState } from "react";
import CountContext from "./component/counterCart/countContext";

import Cart from "./pages/cart";

import Detail_Of_Product from "./pages/detailOfProduct";

import SignUp from "./pages/signUp";
import OrderLookup from "./pages/orderLookup";
import { Routes, Route, Link } from "react-router-dom";
import PageProductCellphone from "./pages/pageProductCellphone/indext";
import PageProductLaptop from "./pages/pageProductLaptop/indext";
import CartContext from "./component/cart/CartContext";
import Search from "./pages/search";

// import TestCheckout from "./pages/test";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./pages/test/paymentIndent";
import SucceedPage from "./pages/cart/succeed";
import FalsePage from "./pages/cart/flasePage";
import Chat from "./chat";
import PushNotification from "./component/pushNotification";


const stripePromise = loadStripe(
  "pk_test_51Mm6CAJTSCX72rEN5WIHfvOYH1gdryjkcMjvkpsD3qXvXH61iMYBB0EnlsLZ3cM8ZgbSKaSgVEd1gVUpeXFfXtjM000UU5faQ7"
);

function App() {
  //chuyen back end

  // bien gio hang
  const { cartItems } = useContext(CartContext);

  const { count, setCount } = useContext(CountContext);
  
  function add() {
    setCount(count + 1);
  }

  function watchCart() {
    console.log(cartItems);
  }
  function clear() {
    localStorage.clear();
  }



  return (
    <div className="App">
   

      <Header></Header>
    

      <Routes>
        <Route
          path="/cart"
          element={
            <Elements stripe={stripePromise}>
              <Cart></Cart>
            </Elements>
          }
        ></Route>
        <Route path="/" element={<Home />}></Route>

        <Route path="/cellphone" element={<PageProductCellphone />}></Route>
        <Route path="/laptop" element={<PageProductLaptop />}></Route>

        <Route path="/register" element={<SignUp></SignUp>}></Route>
        <Route path="/product/:id" element={<Detail_Of_Product />} />
        <Route
          path="/search/:from_price?/:to_price?/:type_product?"
          element={<Search />}
        />

        {/* <Route path="/search/:key" element={<Search />} /> */}

        <Route path="/succeed-order" element={<SucceedPage />} />
        <Route path="/false-order" element={<FalsePage />} />

       
        <Route
          path="/order_lookup"
          element={<OrderLookup></OrderLookup>}
        ></Route>

        <Route  path="/push"
          element={<PushNotification></PushNotification>}> </Route>
      </Routes>

      <Link to={"/cart"}>
        <CartIcon count={count} />
      </Link>

      <Chat></Chat>
      <Footer></Footer>
    </div>
  );
}

export default App;
