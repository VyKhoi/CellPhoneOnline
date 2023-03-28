import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LaptopCard from "../cardLaptop";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../static/css/component/logLaptopCard/style.css";

function LogLaptopCard({ listLaptop }) {
  if (!listLaptop || !listLaptop.length) {
    return <h1>Trống</h1>;
  }

  console.log("laptop", { listLaptop });
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
  };

  let pages = Math.ceil(listLaptop.length / 10);

  let indext = 0;
  let container_card = [];

  // this is use to save slice pro
  let list_pro = [];
  let start = 0;
  let end = 10;

  for (let i = 0; i < pages; i++) {
    // check dieu kien
    if (listLaptop.length < 10) {
      list_pro = listLaptop.slice(0);
    }
    if (end > listLaptop.length) {
      list_pro = listLaptop.slice(start);
    }

    list_pro = listLaptop.slice(start, end); //start , end

    container_card.push(
      <div className="container_log_laptop">
        <Container className="log_laptop">
          {list_pro.map((product, index) => {
            return (
              <LaptopCard
                key={index}
                className={"card_laptop"}
                product={product}
              ></LaptopCard>
            );
          })}
        </Container>
      </div>
    );

    start += 10;
    end += 10;
  }

  return (
    <Slider {...settings} className={"slick_carousel_laptopphone_card"}>
      {container_card}
    </Slider>
  );
}

export default LogLaptopCard;
