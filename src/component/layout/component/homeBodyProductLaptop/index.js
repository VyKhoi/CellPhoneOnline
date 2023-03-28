import React, { Fragment, useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import HeaderType from "../headerType";
import LogCellPhoneCard from "../logCellPhoneCard";
import LogLaptopCard from "../logLaptopCard";
import LogNews from "../technologyNews";
import { BranchContext } from "../../../branchSelect/BranchContext";
function HomeBodyProductLaptop() {
  const [listLaptops, setListLaptops] = useState([]);
  const { branchID, setBranchID } = useContext(BranchContext);
  const [listTotalLaptops, setListTotalLaptops] = useState([]);
  // lay danh sách khuyen mãi
  useEffect(() => {
    fetch(`https://localhost:8000/home/branch/${branchID}/laptops`)
      .then((response) => response.json())
      .then((data) => {
        setListLaptops(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [branchID]);

  useEffect(() => {
    // `http://localhost:3001/Smartphone?Brach=${defaultBrach}`
    fetch(`https://localhost:8000/home/branch/${branchID}/total-laptops`)
      .then((response) => response.json())
      .then((data) => {
        console.log("no co chay vo ham lay dât", data);

        console.log("no co chay lay lai hang cua cua hang", branchID);
        const updatedListTotalLaptops = data.map((totalPhone) => {
          const laptopIndex = listLaptops.findIndex(
            (phone) => phone.id_product_color === totalPhone.id_product_color
          );
          if (laptopIndex !== -1) {
            // Tìm thấy sản phẩm trong listPhones, cập nhật các thuộc tính của sản phẩm
            return {
              ...listLaptops[laptopIndex],
            };
          }
          // Không tìm thấy sản phẩm trong listPhones, không cập nhật gì cả
          return totalPhone;
        });

        setListTotalLaptops(updatedListTotalLaptops);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [branchID, listLaptops]);

  return (
    <div className="container_body_content_page">
      <HeaderType></HeaderType>
      <hr></hr>
      <h1>Danh sách Laptop bán chạy</h1>
      <hr></hr>
      {listLaptops && <LogLaptopCard listLaptop={listLaptops}></LogLaptopCard>}
      <hr></hr>
      <h1>Danh sách Laptop</h1>
      <hr></hr>
      {listTotalLaptops && (
        <LogLaptopCard listLaptop={listTotalLaptops}></LogLaptopCard>
      )}
      <hr></hr>
      <h2>Tin tức công nghệ</h2>
      <hr></hr>
      <LogNews></LogNews>
    </div>
  );
}

export default HomeBodyProductLaptop;
