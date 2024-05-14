import React, { useContext } from "react";
import CartContext from "../../component/cart/CartContext";
import { Routes, Route, Link } from "react-router-dom";
import "../../static/css/component/cart/style.css";
import axios from "axios";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
function Cart() {
  const { cartItems, removeFromCart, addToCart, setCartItems } =
    useContext(CartContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // thong tin form
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  // check dat hang
  // const [isError, setIsError] = useState(null);

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };
  const handleCustomerEmailChange = (event) => {
    setCustomerEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  // code xu ly
  const filteredCartItems = [];

  cartItems.forEach((product) => {
    const existingProduct = filteredCartItems.find(
      (p) => p.id === product.id && p.currentColor === product.currentColor
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      filteredCartItems.push({ ...product, quantity: 1 });
    }
  });
  const handleRemoveProduct = (productId) => {
    console.log("id color truyen vao gio hang", productId);
    removeFromCart(productId);
  };
  // xu ly tang giam so luong
  const increaseQuantity = (product) => {
    const sameProductColors = cartItems.filter(
      (item) => item.productColorId === product.productColorId
    );
    if (sameProductColors.length > 0) {
      const lowestPriceProduct = sameProductColors.reduce((prev, current) =>
        prev.currentPrice < current.currentPrice ? prev : current
      );

      if (lowestPriceProduct.currentPrice < product.currentPrice) {
        product = lowestPriceProduct;
        addToCart(lowestPriceProduct);
      } else {
        addToCart(product);
      }

      // console.log("phan tu duoc loc la", lowestPriceProduct);
    } else {
      addToCart(product);
    }
  };

  const decreaseQuantity = (product) => {
    let removed = false;

    const updatedCartItems = cartItems.filter((item) => {
      if (
        !removed &&
        item.branchProductColorId === product.branchProductColorId
      ) {
        removed = true;
        return false;
      }
      return true;
    });

    // Sắp xếp lại mảng sản phẩm trong giỏ hàng
    updatedCartItems.sort(
      (a, b) => a.branchProductColorId - b.branchProductColorId
    );

    setCartItems(updatedCartItems);
  };

  function totalPrice() {
    let price = 0;
    cartItems.forEach((product) => {
      price += parseFloat(product.currentPrice);
    });
    return price;
  }

  function totalPriceProduct(productColorId) {
    let price = 0;
    cartItems.forEach((product) => {
      if (product.productColorId == productColorId) {
        price += parseFloat(product.currentPrice);
      }
    });
    return price;
  }

  // /phần nài là xử lý thanh toán

  const handleSubmit = async (event) => {
    console.log("co submit form");

    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log("bien error dang luu ", error);

    if (!error) {
      
      setIsLoading(true);
      console.log("data dang gui",  JSON.stringify({
        amount: totalPrice(), // Thay đổi số tiền tương ứng với giá trị sản phẩm
        products: [...cartItems],
        customer: {
          name: customerName,
          deliveryPhone: phoneNumber,
          deliveryAddress: address,
          EmailCustomer: customerEmail,
        },
      }));

      const response = await fetch("https://localhost:7242/order/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice(), // Thay đổi số tiền tương ứng với giá trị sản phẩm
          products: [...cartItems],
          customer: {
            name: customerName,
            deliveryPhone: phoneNumber,
            deliveryAddress: address,
            emailCustomer: customerEmail,
          },
        }),
      });
      setIsLoading(false);
      const data = await response.json();
      console.log("data ", data)
      setClientSecret(data.data.clientSecret);
      console.log("data ", data)
      // alert("Vui lòng xác nhận thanh toán");
    } else {
      console.log("khong co gi trong error");
    }
  };

  const handlePayment = async () => {
    console.log("co handle payment");
    // setIsError(null);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (result.error) {
      // xanh nhận thanh toán không thành công
      console.log(result.error.message);
      navigate("/false-order");
    } else {
      console.log(result.paymentIntent);
      console.log(clientSecret);

      // xử lý aftet order

      // xu ly lay doi amount moi san pham
      const product_amounts = {};
      cartItems.forEach((item) => {
        const id = item.branchProductColorId;
        product_amounts[id] = product_amounts[id] ? product_amounts[id] + 1 : 1;
      });
      // lay ngay thang dat hang
      var current_datetime = new Date();
      var formatted_date = current_datetime.toISOString();

      fetch("https://localhost:7242/order/checkout-succeed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": "{{ csrf_token }}", // Thêm CSRF token để bảo vệ khỏi tấn công CSRF
        },
        body: JSON.stringify({
          customer: {
            name: customerName,
            deliveryPhone: phoneNumber,
            deliveryAddress: address,
            emailCustomer: customerEmail,
          },
          products: [...cartItems],
          amountEachProduct: product_amounts,
          orderDate: formatted_date,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Thanh toán thành công");
            // Xử lý sau khi thanh toán thành công
          } else {
            console.log("Lỗi thanh toán");
            // Xử lý khi có lỗi xảy ra
          }
        })
        .catch((error) => {
          console.error("Lỗi khi gửi request: ", error);
          // Xử lý khi có lỗi xảy ra
        });
      navigate("/succeed-order");
    }
  };
  console.log("danh sách san pham cart",filteredCartItems)
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-lg-7">
                    <h5 className="mb-3">
                      <Link to={"/"}>
                        <a href="#!" className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>
                          Continue shopping
                        </a>
                      </Link>
                    </h5>
                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Giỏ hàng</p>
                        <p className="mb-0">
                          Bạn có tổng cộng {cartItems.length} sản phẩm
                        </p>
                      </div>
                      <div>
                        <p className="mb-0">
                          <span className="text-muted">Xếp theo:</span>{" "}
                          <a href="#!" className="text-body">
                            giá <i className="fas fa-angle-down mt-1"></i>
                          </a>
                        </p>
                      </div>
                    </div>
                    {filteredCartItems.map((product, index) => {
                      return (
                        <div className="card mb-3 item_in_cart" key={index}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={product.currentImage}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: 65 }}
                                  />
                                </div>
                                <div className="ms-3 box_item_in_cart">
                                  <h5 className="name_product">
                                    {product.name} , {product.currentColor}
                                  </h5>
                                  <p className="small mb-0">
                                    {product.ram} , {product.rom}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center box_quantity_price">
                                <div
                                  style={{ width: 50 }}
                                  className={"amount_item_in_cart"}
                                >
                                  <button
                                    className="btn btn-secondary btn-sm me-2"
                                    onClick={() => decreaseQuantity(product)}
                                    disabled={product.quantity <= 1}
                                  >
                                    -
                                  </button>
                                  <h5 className="fw-normal mb-0">
                                    {product.quantity}
                                  </h5>
                                  <button
                                    className="btn btn-secondary btn-sm ms-2"
                                    onClick={() => increaseQuantity(product)}
                                  >
                                    +
                                  </button>
                                </div>
                                <div style={{ width: 80 }}>
                                  <h5 className="mb-0 sum_price_item">
                                    {totalPriceProduct(
                                      product.productColorId
                                    ).toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </h5>
                                </div>
                                <a href="#!" style={{ color: "#cecece" }}>
                                  <i
                                    className="fas fa-trash-alt remove_item_card_in_cart"
                                    onClick={() =>
                                      handleRemoveProduct(
                                        product.productColorId
                                      )
                                    }
                                  ></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* phan dat hang */}
                  <div className="col-lg-5">
                    <div className="card bg-primary text-white rounded-3">
                      <div className="card-body payment-box">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">
                            Thông Tin Thanh Toán Đơn Hàng
                          </h5>
                          <img
                            src="	https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.0251fdd.png"
                            className="img-fluid rounded-3"
                            style={{ width: 45 }}
                            alt="Avatar"
                          />
                        </div>

                        <p className="small mb-2">Card type</p>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-visa fa-2x me-2"></i>
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-amex fa-2x me-2"></i>
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-paypal fa-2x"></i>
                        </a>

                        <form onSubmit={handleSubmit}>
                          <div>
                            <label>Tên khách hàng:</label>
                            <input
                              type="text"
                              name="customerName"
                              value={customerName}
                              onChange={handleCustomerNameChange}
                              required
                              className="input-payment"
                            />
                          </div>
                          <div>
                            <label>Email khách hàng:</label>
                            <input
                              type="text"
                              name="email"
                              value={ customerEmail}
                              onChange={handleCustomerEmailChange}
                              required
                              className="input-payment"
                            />
                          </div>
                          <div>
                            <label>Số điện thoại đặt hàng:</label>
                            <input
                              type="tel"
                              name="phoneNumber"
                              value={phoneNumber}
                              onChange={handlePhoneNumberChange}
                              required
                              className="input-payment"
                            />
                          </div>
                          <div>
                            <label>Địa chỉ đặt hàng:</label>
                            <textarea
                              name="address"
                              value={address}
                              onChange={handleAddressChange}
                              required
                              className="input-payment"
                            />
                          </div>
                          <CardElement className={"CardElement"} />

                          <div className="d-flex justify-content-between total_price">
                            <span>
                              Tổng giá tiền là :
                              {totalPrice().toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>

                            {/* <span>
                              Checkout{" "}
                              <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span> */}
                          </div>
                          {isLoading ? (
                            <div className="sprinner-box">
                              <div class="spinner-grow text-muted"></div>
                              <div class="spinner-grow text-primary"></div>
                              <div class="spinner-grow text-success"></div>
                              <div class="spinner-grow text-info"></div>
                              <div class="spinner-grow text-warning"></div>
                              <div class="spinner-grow text-danger"></div>
                              <div class="spinner-grow text-secondary"></div>
                              <div class="spinner-grow text-dark"></div>
                              <div class="spinner-grow text-light"></div>
                            </div>
                          ) : null}
                          {!clientSecret && (
                            <button
                              className="payment_button payment"
                              type="submit"
                              disabled={!stripe}
                            >
                              Thanh toán
                            </button>
                          )}

                          {clientSecret && (
                            <div>
                              <p
                                style={{
                                  textAlign: "center",
                                  marginBottom: "-20px",
                                  color: "black",
                                  fontSize: "20px",
                                }}
                              >
                                Vui lòng quý khách xác nhận thanh toán
                              </p>

                              <button
                                className="payment_button vertry_payment"
                                onClick={handlePayment}
                              >
                                Xác nhận thanh toán
                              </button>
                            </div>
                          )}
                          <hr className="my-4" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
