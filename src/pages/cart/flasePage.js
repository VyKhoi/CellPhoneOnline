import React from "react";
import "../../static/css/component/cart/succeed.css";
function FalsePage() {
  return (
    <div className="succeed_page">
      {" "}
      <div className="card">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "red",
            margin: "0 auto",
          }}
        >
          <i
            class="fa-solid fa-x"
            style={{ marginLeft: "31%", color: "white" }}
          ></i>
        </div>
        <h1 style={{ color: "red" }}>Thanh Toán Thất Bại</h1>
        <p>
          <p>Thông tin thanh toán không hợp lệ, vui lòng thử lại</p>
          <br /> we'll be in touch shortly!
        </p>
      </div>
    </div>
  );
}

export default FalsePage;
