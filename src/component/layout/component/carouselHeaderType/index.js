import React from "react";
import { Carousel } from "react-bootstrap";
function CarouselHeaderType() {
  const items = [
    {
      src: "https://thumbs.dreamstime.com/z/modern-color-geometric-pattern-sale-banner-design-template-background-mobile-phone-mobile-clearance-sale-modern-173238101.jpg",
      caption: "Khai trương mùa hè tưng bừng khuyến mãi",
    },
    {
      src: "https://img.freepik.com/premium-vector/paper-art-shopping-online-smartphone-new-buy-sale-promotion-pink-backgroud-banner-market_238174-248.jpg?w=1060",
      caption: "Second Slide",
    },
    {
      src: "https://as1.ftcdn.net/v2/jpg/04/61/99/08/1000_F_461990874_9nrA3gDKNx2BzyALInpUBgeYWxhBVcvZ.jpg  ",
      caption: "Third Slide",
    },
  ];
  return (
    <Carousel>
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

export default CarouselHeaderType;
