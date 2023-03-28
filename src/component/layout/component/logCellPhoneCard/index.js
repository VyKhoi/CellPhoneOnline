import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CellPhoneCard from "../cardCellphone";
import "../../../../static/css/component/logCellPhoneCard/style.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LogCellPhoneCard({ listPhones }) {
  console.log("render lai log cell phone card");
  if (!listPhones || !listPhones.length) {
    return <h1>Trống</h1>;
  }

  // listPhones.sort(() => Math.random() - 0.5);
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 20000,
  };

  let pages = Math.ceil(listPhones.length / 10);
  let container_card = [];

  for (let i = 0; i < pages; i++) {
    let start = i * 10;
    let end = (i + 1) * 10;
    let list_pro = listPhones.slice(start, end);

    let cards = list_pro.map((phone, index) => {
      return (
        <CellPhoneCard
          key={index}
          className={"card_cellphone"}
          product={phone}
        ></CellPhoneCard>
      );
    });

    container_card.push(
      <div className="container_log_cell_phone">
        <Container className="log_cell_phone">{cards}</Container>
      </div>
    );
  }

  return (
    <Slider {...settings} className={"slick_carousel_cellphone_card"}>
      {container_card}
    </Slider>
  );
}
export default LogCellPhoneCard;
