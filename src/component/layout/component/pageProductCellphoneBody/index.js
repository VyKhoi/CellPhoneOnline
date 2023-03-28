import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import HeaderType from "../headerType";
import LogCellPhoneCard from "../logCellPhoneCard";
import LogLaptopCard from "../logLaptopCard";
import LogNews from "../technologyNews";
function PageProductCellphoneBody() {
  return (
    <Fragment>
      <HeaderType></HeaderType>
      <hr></hr>
      <h1>Danh sách điện thoạiđang khuyến mãi</h1>
      <hr></hr>
      <LogCellPhoneCard></LogCellPhoneCard>
      <hr></hr>
      <h1>DAnh sách điện thoại</h1>
      <hr></hr>
      <LogCellPhoneCard></LogCellPhoneCard>
      <hr></hr>
      <h2>Tin tức công nghệ</h2>
      <hr></hr>
      <LogNews></LogNews>
    </Fragment>
  );
}

export default PageProductCellphoneBody;
