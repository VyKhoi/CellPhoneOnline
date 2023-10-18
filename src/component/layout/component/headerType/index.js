import React, { useRef, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../../../static/css/component/headerType/style.css";
import CarouselHeaderType from "../carouselHeaderType";
import VerticalMenu from "../verticalMenu/indext";
import MenuItem from "../menuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faL } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { SearchContext } from "../../../searchKeyWord/searchKeyWord";
import { TypeOfProductContext } from "../../../typeOfProduct/context";
function HeaderType() {
  // handle hover phone
  const seePhones = useRef(null);
  const { search, setSearch } = useContext(SearchContext);
  const { typeOfProduct, setTypeOfProduct } = useContext(SearchContext);
  function handleSeePhones() {
    console.log("có lick handleSeePhones");
    if (seePhones.current.classList.contains("d-block") === false) {
      seePhones.current.classList.add("d-block");
      seePhones.current.classList.remove("d-none");
      return;
    }
    if (seePhones.current.classList.contains("d-block")) {
      seePhones.current.classList.remove("d-block");
      seePhones.current.classList.add("d-none");
      return;
    }
  }

  // handle hover Laptop
  const seeLaptops = useRef(null);
  function handleSeeLaptops() {
    console.log("có lick handleSeeLaptops");

    if (seeLaptops.current.classList.contains("d-block") === false) {
      seeLaptops.current.classList.add("d-block");
      seeLaptops.current.classList.remove("d-none");
      return;
    }
    if (seeLaptops.current.classList.contains("d-block")) {
      seeLaptops.current.classList.remove("d-block");
      seeLaptops.current.classList.add("d-none");
      return;
    }
  }
  const handleClickSearchManufacture = (event) => {
    // event.preventDefault();
    console.log("co chay vao day");
    const selectedValue = event.target.innerText;
    setSearch(selectedValue);
  };

  return (
    <Container className="container_header_Type">
      <Row className="row_header_Type">
        <Col className="header_type_box" id="header_type_box_1" sm={3}>
          <div className="container_menu_type_product">
            <ul className="menu_type_product" id="type_product_nav">
              <li onClick={handleSeePhones}>
                <a href="#!">
                  <i class="fa-solid fa-mobile"></i> Điện thoại{" "}
                  <i class="fa-solid fa-chevron-right arrow_right"></i>
                </a>
              </li>
              <li onClick={handleSeeLaptops}>
                <a href="#!">
                  <i class="fa-solid fa-laptop"></i>Laptop{" "}
                  <i class="fa-solid fa-chevron-right arrow_right"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-solid fa-tablet-button"></i>
                  {" Mái tính bản"}
                  <i class="fa-solid fa-chevron-right arrow_right"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-solid fa-headphones"></i>
                  Tai nghe<i class="fa-solid fa-chevron-right arrow_right"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-solid fa-keyboard"></i>
                  Phụ kiện<i class="fa-solid fa-chevron-right arrow_right"></i>
                </a>
              </li>
            </ul>
          </div>
        </Col>

        <Col className="header_type_box" id="header_type_box_2" sm={6}>
          <CarouselHeaderType></CarouselHeaderType>
        </Col>

        <Col className="header_type_box" id="header_type_box_3" sm={3}>
          <div class="container container_boxs_HTB_3">
            <div class="row">
              <div class="col">
                <div class="small-box">
                  <a href="#">
                    <img src="https://thumbs.dreamstime.com/z/modern-color-geometric-pattern-sale-banner-design-template-background-mobile-phone-mobile-clearance-sale-modern-173238101.jpg"></img>
                  </a>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="small-box">
                  <a href="#">
                    <img src="https://i.etsystatic.com/13419319/r/il/bf9089/4338355403/il_fullxfull.4338355403_ooc8.jpg"></img>
                  </a>{" "}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="small-box">
                  <a>
                    <img src="https://i.etsystatic.com/25492735/r/il/454100/4461111331/il_fullxfull.4461111331_dxda.jpg"></img>
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row
        ref={seePhones}
        className="type_product_container type_product_container_phones d-none"
      >
        <Link className="see_full_product" to={"/cellphone"}>
          Xem tất cả sản phẩm
        </Link>

        <Col className="type_product_box" sm={8}>
          <div className="manufactue_product">
            <h6>Hãng điện thoại</h6>
            <VerticalMenu>
              <Link
                className="menu_item"
                to="/search/"
                onClick={handleClickSearchManufacture}
              >
                Iphone
              </Link>
              <Link
                className="menu_item"
                to="/search/"
                onClick={handleClickSearchManufacture}
              >
                Samsung
              </Link>
              <Link
                className="menu_item"
                to="/search/"
                onClick={handleClickSearchManufacture}
              >
                OnePlus
              </Link>
              <Link
                className="menu_item"
                to="/search/"
                onClick={handleClickSearchManufacture}
              >
                Oppo
              </Link>
              <Link
                className="menu_item"
                to="/search/"
                onClick={handleClickSearchManufacture}
              >
                Xiaomi
              </Link>
            </VerticalMenu>
          </div>

          <div className="type_of_price">
            <h6>Chọn theo mức giá</h6>
            <VerticalMenu>
              <Link className="menu_item" to={"/search/0/5000000/0"}>
                Dưới 5 triệu
              </Link>
              <Link className="menu_item" to={"/search/5000000/15000000/0"}>
                Từ 5 - 15 triệu
              </Link>
              <Link className="menu_item" to={"/search/15000000/150000000/0"}>
                Từ 15 triệu trở lên
              </Link>
            </VerticalMenu>
          </div>

          <div className="type_of_operating_system">
            <h6>Loại điện thoại</h6>
            <VerticalMenu>
              <MenuItem link="#">Androi</MenuItem>
              <MenuItem link="#">Iphone (IOS)</MenuItem>
              <MenuItem link="#">Từ 10 đến 15 triệu</MenuItem>
              <MenuItem link="#">trên 15 triệu</MenuItem>
            </VerticalMenu>
          </div>
        </Col>
      </Row>

      <Row
        ref={seeLaptops}
        className="type_product_container type_product_container_laptops d-none"
      >
        <Link className="see_full_product" to={"/laptop"}>
          Xem tất cả sản phẩm
        </Link>
        <Col className="type_product_box" sm={8}>
          <div className="manufactue_product">
            <h6>Hãng Laptop</h6>
            <VerticalMenu>
              <Link
                className="menu_item"
                to="/search/"
                onClick={handleClickSearchManufacture}
              >
                DELL
              </Link>
              <Link
                className="menu_item"
                to="/search/"
                onClick={handleClickSearchManufacture}
              >
                LENOVO
              </Link>
              <Link
                className="menu_item"
                to="/search/"
                onClick={handleClickSearchManufacture}
              >
                ASUS
              </Link>
              <Link
                className="menu_item"
                to="/search/"
                onClick={handleClickSearchManufacture}
              >
                APPLE
              </Link>
              <Link
                className="menu_item"
                to="/search/"
                onClick={handleClickSearchManufacture}
              >
                HP
              </Link>
            </VerticalMenu>
          </div>

          <div className="type_of_price">
            <h6>Chọn theo mức giá</h6>
            <VerticalMenu>
              <Link className="menu_item" to={"/search/0/10000000/1"}>
                Dưới 10 triệu
              </Link>
              <Link className="menu_item" to={"/search/10000000/20000000/1"}>
                Từ 10 - 20 triệu
              </Link>
              <Link className="menu_item" to={"/search/20000000/2000000000/1"}>
                Trên 20 triệu
              </Link>
            </VerticalMenu>
          </div>

          <div className="type_of_operating_system">
            <h6>Chọn theo dòng</h6>
            <VerticalMenu>
              <MenuItem link="#">Laptop Core i5</MenuItem>
              <MenuItem link="#">Laptop Core i3</MenuItem>
              <MenuItem link="#">Laptop Core i7</MenuItem>
              <MenuItem link="#">Laptop Core i9</MenuItem>
            </VerticalMenu>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HeaderType;
