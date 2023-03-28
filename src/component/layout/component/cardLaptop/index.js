import React, { useRef, useContext, Fragment } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../../static/css/component/laptopCard/style.css";
import CartContext from "../../../cart/CartContext";
import { TypeOfProductContext } from "../../../typeOfProduct/context";
function LaptopCard({ product }) {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  // const { typeOfProduct, handleSetTypeOfProduct } =
  //   useContext(TypeOfProductContext);

  // const handleClick = () => {
  //   handleSetTypeOfProduct(2);
  // };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    console.log("cai id do laaaaaaaaaaaaaaaa", product);
    removeFromCart(product.id_branch_product_color);
  };

  return (
    <div className="wrapper laptop_card">
      <Link to={`/product/${product.id}`}>
        <div className="product-img">
          <img src={product.currentImage} height="420" width="327" />
        </div>
      </Link>
      <div className="product-info laptop_card_infor">
        <Link to={`/product/${product.id}`}>
          <div className="product-text">
            <h1>
              {product.name}{" "}
              {product.discountRate && (
                <span className="container_discount">
                  <i class="fa-solid fa-tag"></i>
                  {parseFloat(product.discountRate) * 100}
                  {"%"}
                </span>
              )}
            </h1>
          </div>
        </Link>
        <div className="product-price-btn price_laptop_box">
          <p>
            {product.discountRate ? (
              <Fragment>
                <span className="previous_price">
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </span>{" "}
                <i className="fa-solid fa-right-long"></i>
              </Fragment>
            ) : null}

            <span className="sale_price_laptop">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.currentPrice)}
            </span>
          </p>
          {cartItems.includes(product) ? (
            <button
              type="button"
              onClick={handleRemoveFromCart}
              style={{ backgroundColor: "red" }}
            >
              Xóa khỏi giỏ hàng
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              style={{ backgroundColor: "#3dcf05" }}
            >
              Thêm vào giỏ hàng
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LaptopCard;
