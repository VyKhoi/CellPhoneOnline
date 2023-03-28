import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "../../static/css/component/orderLookup/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
const OrderLookup = () => {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `https://localhost:8000/home/order_lookup/${phone}/`
    );
    setOrders(res.data);
    console.log("danh sach order", orders);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  function oke() {
    console.log("danh sach order", orders);
  }
  return (
    <div className="order-lookup-container">
      {/* <button onClick={oke}>lookup</button> */}
      <h2>Order Lookup</h2>
      <Form onSubmit={handleSubmit} className="order-lookup-form">
        <Form.Group controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={handlePhoneChange}
            className="order-lookup-input"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="order-lookup-button">
          Lookup
        </Button>
      </Form>
      <div className="order-list-container">
        {orders.map((order) => {
          const uniqueProducts = order.product_Detail.filter(
            (product, index, self) =>
              index ===
              self.findIndex(
                (p) =>
                  p.id_branch_product_color === product.id_branch_product_color
              )
          );

          console.log(uniqueProducts, "o day");
          return (
            <div key={order.id} className="order-item">
              <p>Mã đơn hàng : {order.order_ID}</p>
              <p>Tổng giá trị đơn hàng : {order.toltal_Price}</p>
              <p>Ngày đặt hàng : {order.orderDate}</p>

              <p>Các sản phẩm đặt mua</p>
              {uniqueProducts.map((value, index) => {
                return (
                  <div key={index}>
                    <hr></hr>
                    <p>
                      tên sản phẩm : {value.Name} , {value.nameColor}
                    </p>
                    <p>số lượng : {value.quantity}</p>
                    <p>đơn giá : {value.unitPrice}</p>
                  </div>
                );
              })}
              <hr></hr>
              <p style={{ color: "#0173b3", fontSize: "15px" }}>
                Trạng thái đơn hàng :
                {order.Status == 2 ? (
                  <span style={{ color: "#04ab00" }}>
                    "đang được giao" <FontAwesomeIcon icon={faTruck} />
                  </span>
                ) : null}
                {order.Status == 1 ? (
                  <span style={{ color: "#a02300" }}>
                    "đã đặt hàng đang chờ xử lý"{" "}
                    <i class="fa-regular fa-clock"></i>
                  </span>
                ) : null}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderLookup;
