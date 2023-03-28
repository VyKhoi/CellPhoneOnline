import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import "../../../../static/css/component/laptopCard/style.css";

function CardNews({ product }) {
  // console.log("thong tin tin tuc ", product);
  return (
    <div className="wrapper laptop_card cardNews_Container">
      <div className="product-img">
        <img src={product.image} className={'image_news'} height="420" width="400" />
      </div>

      <div className="product-info laptop_card_infor">
        <div className="product-text">
          <h1>{product.title}</h1>
          <h2>{product.content}</h2>
        </div>
      </div>
    </div>
  );
}

export default CardNews;
