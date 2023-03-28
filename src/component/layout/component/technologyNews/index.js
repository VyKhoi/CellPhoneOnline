import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LaptopCard from "../cardLaptop";
import CardNews from "../cardNews";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../static/css/component/logLaptopCard/style.css";
let pro = [
  {
    image:
      "https://i1-sohoa.vnecdn.net/2023/03/13/dt-1678684726-6255-1678684746.jpg?w=240&h=144&q=100&dpr=1&fit=crop&s=V7DR5KZbTaGf6F_x_QNRvA",
    title: "Thuê bao di động sai thông tin bị khóa từ 31/3",
    content:
      "Sau 31/3, thuê bao di động có thông tin chưa chuẩn, không trùng khớp với cơ sở dữ liệu quốc gia về dân cư sẽ bị khóa chiều gọi đi",
  },
  {
    image:
      "https://i1-sohoa.vnecdn.net/2023/03/11/fb-1678507665-6483-1678507677.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=1GG5JcL_2ZEGD51ULM84hg",
    title: "Ngày càng nhiều người muốn xóa Facebook, Instagram",
    content: `Từ khóa "cách xóa Instagram" được tìm kiếm nhiều nhất trong khi Facebook đứng đầu danh sách ứng dụng sẽ "hủy kích hoạt`,
  },
  {
    image:
      "https://i1-sohoa.vnecdn.net/2023/03/11/anh-cat-2022-02-05t113250z-259-4478-5273-1678503621.jpg?w=240&h=144&q=100&dpr=1&fit=crop&s=T-RQOZnGv6bHd-gvw8fKlw",
    title: "Meta xây mạng xã hội đối đầu Twitter",
    content:
      "Meta, công ty mẹ của Facebook, đang lên kế hoạch phát triển mạng xã hội tập trung vào văn bản nhằm cạnh tranh với Twitter",
  },
  {
    image:
      "https://i1-sohoa.vnecdn.net/2023/03/10/10001650949519392431771941copy-9158-7776-1678425506.jpg?w=240&h=144&q=100&dpr=1&fit=crop&s=yIGuHB5Rmz8UGjGI9IKepA",
    title: "OpenAI thừa nhận sai lầm về ChatGPT",
    content: `Trước những ý kiến của Elon Musk về ChatGPT, Greg Brockman, Chủ tịch OpenAI, nói công ty "đang phạm sai lầm" với chatbot này`,
  },
];

function LogNews() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  let pages = Math.ceil(pro.length / 10);

  let indext = 0;
  let container_card = [];

  // this is use to save slice pro
  let list_pro = [];
  let start = 0;
  let end = 10;

  for (let i = 0; i < pages; i++) {
    // check dieu kien
    if (pro.length < 10) {
      list_pro = pro.slice(0);
    }
    if (end > pro.length) {
      list_pro = pro.slice(start);
    }

    list_pro = pro.slice(start, end); //start , end

    container_card.push(
      <div className="container_log_laptop">
        <Container className="log_laptop">
          {list_pro.map((value, index) => {
            return (
              <CardNews
                key={index}
                product={value}
                className={"card_laptop"}
              ></CardNews>
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

export default LogNews;
