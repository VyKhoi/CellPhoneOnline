import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import { useLocation } from "react-router-dom";
const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form action={`${API_URL}/home/checkout`} method="POST">
      <label>
        Name:
        <input type="text" name="name" placeholder="Enter your name" required />
      </label>
      <label>
        Phone number:
        <input
          type="tel"
          name="phone_number"
          placeholder="Enter your phone number"
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          placeholder="Enter your address"
          required
        />
      </label>
      <button type="submit">Checkout</button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function TestCheckout() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}
