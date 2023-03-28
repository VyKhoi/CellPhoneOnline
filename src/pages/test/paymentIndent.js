import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./style.css";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = async (event) => {
    console.log("co submit form");
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log("bien error dang luu ", error);
    if (!error) {
      console.log("no có nhảy vào if");
      const response = await fetch("http://localhost:8000/home/checkout2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1300000, // Thay đổi số tiền tương ứng với giá trị sản phẩm
          products: [
            {
              id: 1,
              name: "Áo thun nam",
              price: 500000,
              image: "https://example.com/ao-thun-nam.jpg",
              quantity: 2,
            },
            {
              id: 2,
              name: "Quần jean nữ",
              price: 800000,
              image: "https://example.com/quan-jean-nu.jpg",
              quantity: 1,
            },
          ],
        }),
      });
      const data = await response.json();
      setClientSecret(data.client_secret);
    } else {
      console.log("khong co gi trong error");
    }
  };

  const handlePayment = async () => {
    console.log("co handle payment");

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.paymentIntent);
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Thanh toán
      </button>
      {clientSecret && (
        <button onClick={handlePayment}>Xác nhận thanh toán</button>
      )}
    </form>
  );
};

export default CheckoutForm;
