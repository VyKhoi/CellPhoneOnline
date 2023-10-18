import React, { Fragment, useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import HeaderType from "../headerType";
import LogCellPhoneCard from "../logCellPhoneCard";
import LogLaptopCard from "../logLaptopCard";
import LogNews from "../technologyNews";
import { BranchContext } from "../../../branchSelect/BranchContext";
import Test from "../../phongthinghiem";
function HomeBody() {
  //{ defaultBrach }
  // cái defaultBrach là cửa hàng, mai mốt gọi tùy theo cửa hàng mà render
  const { branchID, setBranchID } = useContext(BranchContext);
  const [listLaptop, setListLaptop] = useState([]);
  const [listPhones, setListPhones] = useState([]);

  // thay "brand" bằng giá trị mặc định của defaultBrach
  var requestDataLapTop = {
    pageSize: 100,
    pageIndex: 0,
    type: 1,
    branchId: branchID,
  };
  var requestDataPhone = {
    pageSize: 100,
    pageIndex: 0,
    type: 0,
    branchId: branchID,
  };
  useEffect(() => {
    fetch(`https://localhost:7242/product/search/promotion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestDataLapTop),
    })
      .then((response) => response.json())
      .then((data) => {
        setListLaptop(data.data[0]);
        console.log("có gọi lấy data",data)
      })
      .catch((error) => {
        console.error("lỗi rồi",error);
      });
  }, [branchID]);

  useEffect(() => {
    // `http://localhost:3001/Smartphone?Brach=${defaultBrach}`
    //https://localhost:8000/home/branch/${branchID}/phones
    fetch(`https://localhost:7242/product/search/promotion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestDataPhone),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("no co chay vo ham lay dât", data);
        setListPhones(data.data[0]);
        console.log("no co chay lay lai hang cua cua hang", branchID);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [branchID]);

  return (
    <div className="container_body_content_page">
      <HeaderType></HeaderType>
      <hr></hr>
      <h1>Danh sách điện thoại bán chạy</h1>
      <hr></hr>
      {listPhones && (
        <LogCellPhoneCard listPhones={listPhones}></LogCellPhoneCard>
      )}{" "}
      <hr></hr>
      <h1>Laptop bán chạy</h1>
      <hr></hr>
      {listLaptop && <LogLaptopCard listLaptop={listLaptop}></LogLaptopCard>}
      {/* <h1>Phụ Kiện</h1>
      <LogCellPhoneCard></LogCellPhoneCard> */}
      <hr></hr>
      <h2>Tin tức công nghệ</h2>
      <hr></hr>
      <LogNews></LogNews>
      {/* <Test listPhones={listPhones}></Test> */}
    </div>
  );
}

export default HomeBody;
