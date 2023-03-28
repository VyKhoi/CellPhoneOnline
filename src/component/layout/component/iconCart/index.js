import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../../../../static/css/component/iconCart/style.css";
import React, { Fragment, useContext } from "react";

import CartContext from "../../../cart/CartContext";

function CartIcon(props) {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-icon">
      <FontAwesomeIcon className="icon_cart" icon={faShoppingCart} />
      <span className="cart-count">{cartItems.length}</span>
    </div>
  );
}

export default CartIcon;
