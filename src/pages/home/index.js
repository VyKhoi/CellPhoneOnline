import React, { Fragment, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";

import LogCellPhoneCard from "../../component/layout/component/logCellPhoneCard";
import LogLaptopCard from "../../component/layout/component/logLaptopCard";
import HomeBody from "../../component/layout/component/homeBody";
import Footer from "../../component/layout/component/footer";
import LogNews from "../../component/layout/component/technologyNews";
import Header from "../../component/layout/component/header";
function Home() {
  return (
    <div>
      <HomeBody></HomeBody>
    </div>
  );
}

export default Home;
