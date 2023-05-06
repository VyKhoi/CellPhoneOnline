import React from "react";
import { Carousel } from "react-bootstrap";
function MyCarousel() {
  const items = [
    {
      src: "https://static.vecteezy.com/system/resources/previews/014/471/152/non_2x/black-friday-sale-banner-promotion-black-white-geometric-on-blue-layout-design-vector.jpg",
      caption: "Khai trương mùa hè tưng bừng khuyến mãi",
    },
    {
      src: "https://static.vecteezy.com/system/resources/previews/000/695/798/non_2x/modern-super-sale-banner-background-vector.jpg",
      caption: "Second Slide",
    },
    {
      src: "https://as1.ftcdn.net/v2/jpg/04/61/99/08/1000_F_461990874_9nrA3gDKNx2BzyALInpUBgeYWxhBVcvZ.jpg  ",
      caption: "Third Slide",
    },
  ];
  return (
    <Carousel interval={30000}>
      {items.map((item) => (
        <Carousel.Item key={item.caption}>
          <img className="d-block w-100" src={item.src} alt={item.caption} />
          <Carousel.Caption>
            <h3>{item.caption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MyCarousel;
