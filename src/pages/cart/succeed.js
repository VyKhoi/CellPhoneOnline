import React from "react";
import "../../static/css/component/cart/succeed.css";
function SucceedPage() {
  return (
    <div className="succeed_page">
      {" "}
      <div className="card">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "yellow",
            margin: "0 auto",
          }}
        >
          <i className="checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
      </div>
    </div>
  );
}

export default SucceedPage;
