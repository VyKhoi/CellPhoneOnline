import React, { Fragment, useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import HeaderType from "../headerType";
import LogCellPhoneCard from "../logCellPhoneCard";
import LogLaptopCard from "../logLaptopCard";
import { BranchContext } from "../../../branchSelect/BranchContext";
import LogNews from "../technologyNews";
function HomeBodyProductCellPhone() {
  const [listPhones, setListPhones] = useState([]);
  const { branchID, setBranchID } = useContext(BranchContext);
  const [listTotalPhones, setListTotalPhones] = useState([]);
  var requestDataPhone = {
    pageSize: 100,
    pageIndex: 0,
    type: 0,
    branchId: branchID,
  };
  useEffect(() => {
    // `http://localhost:3001/Smartphone?Brach=${defaultBrach}`
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

  useEffect(() => {
    // `http://localhost:3001/Smartphone?Brach=${defaultBrach}`
    fetch(`https://localhost:7242/product/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestDataPhone),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("no co chay vo ham lay dât", data);

        console.log("no co chay lay lai hang cua cua hang", branchID);
        const updatedListTotalPhones = data.data.items.map((totalPhone) => {
          const phoneIndex = listPhones.findIndex(
            (phone) => phone.productColorId === totalPhone.productColorId
          );
          if (phoneIndex !== -1) {
            // Tìm thấy sản phẩm trong listPhones, cập nhật các thuộc tính của sản phẩm
            return {
              ...listPhones[phoneIndex],
            };
          }
          // Không tìm thấy sản phẩm trong listPhones, không cập nhật gì cả
          return totalPhone;
        });

        setListTotalPhones(updatedListTotalPhones);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [branchID, listPhones]);
  return (
    <div className="container_body_content_page">
      <HeaderType></HeaderType>
      <hr></hr>
      <h1>Danh sách điện thoại đang được khuyến mãi</h1>
      <hr></hr>
      {listPhones && (
        <LogCellPhoneCard listPhones={listPhones}></LogCellPhoneCard>
      )}
      <hr></hr>
      <h1>Danh sách tất cả điện thoại</h1>
      <hr></hr>
      {listTotalPhones && (
        <LogCellPhoneCard listPhones={listTotalPhones}></LogCellPhoneCard>
      )}
      <hr></hr>
      <h2>Tin tức công nghệ</h2>
      <hr></hr>
      <LogNews></LogNews>
    </div>
  );
}

export default HomeBodyProductCellPhone;
