import React, { useEffect, useState, useMemo, Fragment } from "react";
import Comments from "../../component/layout/component/comments";
import "../../static/css/component/DetailOfProduct/style.css";
import { useContext } from "react";
import ProductContext from "../../component/storeProduct/storeProduct";
import { Link, useParams } from "react-router-dom";
import { map } from "jquery";
import CartContext from "../../component/cart/CartContext";
import { BranchContext } from "../../component/branchSelect/BranchContext";
import { TypeOfProductContext } from "../../component/typeOfProduct/context";
function Detail_Of_Product() {
  console.log("render detail_product");
  // // lay sphttp://localhost:3001/product-cell-phone/1
  // const { selectedProduct } = useContext(ProductContext);
  // console.log("gia tri store product", selectedProduct);
  const { branchID, setBranchID } = useContext(BranchContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [list_Id_product_color, setList_Id_product_color] = useState([]);
  console.log("gia trị cua list id khi moi render", list_Id_product_color);
  const [current_id_product_color, setCurrentProductColor] = useState(null);
  // gio hang
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  // check da them vao chưa
  const [showMessage, setShowMessage] = useState(false);
  const { typeOfProduct, handleSetTypeOfProduct } =
    useContext(TypeOfProductContext);

  const handleAddToCart = () => {
    console.log("co chay");
    let price = 0;
    if (product.discountRate) {
      price = selectedColor.price - selectedColor.price * product.discountRate;
    } else {
      price = selectedColor.price;
    }
    const updatedProduct = {
      ...product,
      id_product_color: current_id_product_color,
      currentColor: selectedColor.color,
      currentImage: selectedImage.link,
      currentPrice: price,
      id_branch_product_color: selectedColor.id_branch_product_color,
    };
    addToCart(updatedProduct);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);
  };

  function handleImageClick(image, idProductColor) {
    console.log("co vao", image);
    console.log("mau mac dinh hien tai la", selectedColor);
    let tmpColor;
    for (let i = 0; i < product.color.length; i++) {
      // console.log(product.color[i]);
      if (
        product.color[i].color.toLowerCase().trim() ===
        image.name.toLowerCase().trim()
      ) {
        tmpColor = product.color[i];
      }
    }
    console.log("chay qua");
    setSelectedImage(image);
    setSelectedColor(tmpColor);
    setCurrentProductColor(idProductColor);
  }

  const handleColorClick = (color, idProductColor) => {
    let tmpImg;

    for (let i = 0; i < product.image.length; i++) {
      console.log(product.image[i]);
      if (
        product.image[i].name.trim().toLowerCase() ===
        color.color.trim().toLowerCase()
      ) {
        tmpImg = product.image[i];
      }
    }
    console.log("id mau san san pham dang dc click", current_id_product_color);
    setSelectedImage(tmpImg);
    setSelectedColor(color);
    setCurrentProductColor(idProductColor);
  };
  var request = {
    
      id: id,
      branchId : branchID,
      
    }
  
  useEffect(() => {
    fetch(`https://localhost:7242/product/detail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("no co lay detail product", data.data[0]);
        var rp = data.data[0]
        setProduct(rp[0]);
        setSelectedColor(rp[0].color[0]);
        setSelectedImage(rp[0].image[0]);

        // setList_Id_product_color((prevList) => {
        //   const newIds = data.map((value) => value["id_product_color"]);
        //   return [...new Set([...prevList, ...newIds])];
        // });
        const listIDCL = data.map((value) => {
          return value["id_product_color"];
        });
        setList_Id_product_color(listIDCL);

        setCurrentProductColor(data[0]["id_product_color"]);
        console.log(list_Id_product_color);
        console.log("san pham fetch duoc  la ", product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [branchID, id]);

  function showIDCORLOR() {
    console.log(list_Id_product_color);
    console.log("id mau sac product", current_id_product_color);
    if (typeOfProduct) {
      console.log(
        "type od product ",
        typeOfProduct,
        "branch ",
        branchID,
        " id product",
        id
      );
    } else {
      console.log("khong co type ò product");
    }
  }

  if (!product) {
    return (
      <Fragment>
        <h1>Loading...</h1>;<button onClick={showIDCORLOR}>showIDCORLOR</button>
      </Fragment>
    );
  }

  // xem type cua san pham

  const handleWatchTypeOfProduct = () => {
    // handleSetTypeOfProduct("newTypeOfProduct");
    console.log(typeOfProduct);
  };

  return (
    <div className="super_container detail_product">
      {/* <button onClick={showIDCORLOR}>showIDCORLOR</button>
      <button onClick={handleWatchTypeOfProduct}>type ò product </button> */}
      <header className="header" style={{ display: "none" }}>
        <div className="header_main">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
                <div className="header_search">
                  <div className="header_search_content">
                    <div className="header_search_form_container">
                      <form action="#" className="header_search_form clearfix">
                        <div className="custom_dropdown">
                          <div className="custom_dropdown_list">
                            {" "}
                            <span className="custom_dropdown_placeholder clc">
                              All Categories
                            </span>{" "}
                            <i className="fas fa-chevron-down"></i>
                            <ul className="custom_list clc">
                              <li>
                                <a className="clc" href="#">
                                  All Categories
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="single_product">
        <div
          className="container-fluid"
          style={{ backgroundColor: "#fff", padding: 11 }}
        >
          <div className="row">
            <div className="col-lg-2 order-lg-1 order-2">
              {/* hien thi hinh anh */}
              <ul className="image_list">
                {product.image.map((picture, index) => (
                  <li
                    key={index}
                    data-image={picture}
                    data-id_product_color={list_Id_product_color[index]}
                  >
                    <img
                      src={picture.link}
                      alt={picture.name}
                      onClick={() =>
                        handleImageClick(picture, list_Id_product_color[index])
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-4 order-lg-2 order-1">
              <div className="image_selected">
                <img
                  src={
                    selectedImage ? selectedImage.link : product.image[0].link
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 order-3">
              <div className="product_description">
                <div className="product_name">{product.name}</div>
                <div className="product-rating">
                  <span className="badge badge-success">
                    <i className="fa fa-star"></i> 4.5 Star
                  </span>{" "}
                  <span className="rating-review">35 Ratings & 45 Reviews</span>
                </div>
                {product.discountRate ? (
                  <div>
                    <span className="product_price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        (
                          selectedColor.price -
                          selectedColor.price * product.discountRate
                        ).toFixed(2)
                      )}
                    </span>
                    <strike className="product_discount">
                      <span style={{ color: "black" }}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(selectedColor.price)}
                      </span>
                    </strike>
                  </div>
                ) : (
                  <span className="product_price">
                    <h1>
                      {parseFloat(selectedColor.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </h1>
                  </span>
                )}

                {product.discountRate && (
                  <div>
                    <span
                      className="product_saved"
                      style={{ color: "#e29d00" }}
                    >
                      Bạn tiết kiệm được: {product.discountRate * 100}%{" "}
                      {"=>   "}
                    </span>
                    <span style={{ color: "black" }}>
                      {" "}
                      {parseFloat(
                        (selectedColor.price * product.discountRate).toFixed(2)
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                )}

                <hr className="singleline" />
                {/* mau sac */}

                <div>
                  {product.color.map((color, index) => (
                    <button
                      key={index}
                      data-id_product_color={list_Id_product_color[index]}
                      className={`product_info_color ${
                        selectedColor === color.color ? "active" : ""
                      }`}
                      onClick={() =>
                        handleColorClick(color, list_Id_product_color[index])
                      }
                      style={{
                        backgroundColor:
                          selectedColor.color === color.color
                            ? "yellow"
                            : selectedColor.bg,
                      }}
                    >
                      {color.color}{" "}
                      {product.discountRate
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            color.price - color.price * product.discountRate
                          )
                        : new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(color.price)}
                    </button>
                  ))}

                  {/* <h1>mau cua no la {selectedColor.bg}</h1> */}
                </div>
                <div>
                  <div className="row" style={{ marginTop: "15px" }}>
                    <div className="col-xs-6" style={{ marginLeft: "15px" }}>
                      <span className="product_options">RAM Options</span>
                      <br />
                      {/* <button className="btn btn-primary btn-sm">4 GB</button> */}
                      {product.options &&
                        product.options.length > 0 &&
                        product.options.map((value, index) => {
                          return (
                            <Link to={`/product/${value.productId}`}>
                              <button
                                className="btn btn-primary btn-sm option_product"
                                key={index}
                                style={
                                  value.productId === product.id
                                    ? { backgroundColor: "red" }
                                    : {}
                                }
                              >
                                {value.ram} / {value.rom}
                              </button>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <hr className="singleline" />

                <div className="row">
                  <div className="col-xs-6">
                    {" "}
                    {/* them vao gio hang */}
                    <button
                      type="button"
                      className="btn btn-primary shop-button"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                    {showMessage && (
                      <div className="message">
                        <i class="fa-regular fa-circle-check"></i> Thêm thành
                        công
                      </div>
                    )}
                    {/* <button
                      type="button"
                      className="btn btn-success shop-button"
                    >
                      Buy Now
                    </button>
                    <div className="product_fav">
                      <i className="fas fa-heart"></i>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-underline">
            <div className="col-md-6">
              {" "}
              <span className=" deal-text">Combo Offers</span>{" "}
            </div>
            <div className="col-md-6">
              {" "}
              <a href="#" data-abc="true">
                {" "}
                <span className="ml-auto view-all"></span>{" "}
              </a>{" "}
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="row padding-2">
                <div className="col-md-5 padding-0">
                  <div className="bbb_combo">
                    <div className="bbb_combo_image">
                      <img
                        className="bbb_combo_image"
                        src="https://i.imgur.com/K4b71NV.jpg"
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                      {" "}
                      <strike style={{ color: "red" }}>
                        {" "}
                        <span className="fs-10" style={{ color: "black" }}>
                          ₹ 32,000<span> </span>
                        </span>
                      </strike>{" "}
                      <span className="ml-auto">
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                      </span>{" "}
                    </div>
                    <div
                      className="d-flex flex-row justify-content-start"
                      style={{ marginBottom: 13 }}
                    >
                      {" "}
                      <span style={{ marginTop: -4 }}>₹30,000</span>{" "}
                      <span className="ml-auto fs-10">23 Reviews</span>{" "}
                    </div>{" "}
                    <span>Acer laptop with 10GB RAM + 500 GB Hard Disk</span>
                  </div>
                </div>
                <div className="col-md-2 text-center">
                  {" "}
                  <span className="step">+</span>{" "}
                </div>
                <div className="col-md-5 padding-0">
                  <div className="bbb_combo">
                    <div className="bbb_combo_image">
                      <img
                        className="bbb_combo_image"
                        src="https://i.imgur.com/K4b71NV.jpg"
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                      {" "}
                      <strike style={{ color: "red" }}>
                        {" "}
                        <span className="fs-10" style={{ color: "black" }}>
                          ₹ 32,000<span> </span>
                        </span>
                      </strike>{" "}
                      <span className="ml-auto">
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                      </span>{" "}
                    </div>
                    <div
                      className="d-flex flex-row justify-content-start"
                      style={{ marginBottom: 13 }}
                    >
                      {" "}
                      <span style={{ marginTop: -4 }}>₹30,000</span>{" "}
                      <span className="ml-auto fs-10">23 Reviews</span>{" "}
                    </div>{" "}
                    <span>Acer laptop with 10GB RAM + 500 GB Hard Disk</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12" style={{ marginLeft: 36 }}>
                  <div className="boxo-pricing-items">
                    <div className="combo-pricing-item">
                      {" "}
                      <span className="items_text">1 Item</span>{" "}
                      <span className="combo_item_price">₹13,200</span>{" "}
                    </div>
                    <div className="combo-plus">
                      {" "}
                      <span className="plus-sign">+</span>{" "}
                    </div>
                    <div className="combo-pricing-item">
                      {" "}
                      <span className="items_text">1 Add-on</span>{" "}
                      <span className="combo_item_price">₹500</span>{" "}
                    </div>
                    <div className="combo-plus">
                      {" "}
                      <span className="plus-sign">=</span>{" "}
                    </div>
                    <div className="combo-pricing-item">
                      {" "}
                      <span className="items_text">Total</span>{" "}
                      <span className="combo_item_price">₹13,700</span>{" "}
                    </div>
                    <div className="add-both-cart-button">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-primary shop-button"
                      >
                        Add to Cart
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 text-center">
              {" "}
              <span className="vertical-line"></span>{" "}
            </div>
            <div className="col-md-5" style={{ marginLeft: "-27px" }}>
              <div className="row padding-2">
                <div className="col-md-5 padding-0">
                  <div className="bbb_combo">
                    <div className="bbb_combo_image">
                      <img
                        className="bbb_combo_image"
                        src="https://i.imgur.com/K4b71NV.jpg"
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                      <strike style={{ color: "red" }}>
                        <span className="fs-10" style={{ color: "black" }}>
                          ₹ 32,000
                        </span>
                      </strike>
                      <span className="ml-auto">
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                      </span>
                    </div>
                    <div
                      className="d-flex flex-row justify-content-start"
                      style={{ marginBottom: "13px" }}
                    >
                      <span style={{ marginTop: "-4px" }}>₹30,000</span>
                      <span className="ml-auto fs-10">23 Reviews</span>
                    </div>
                    <span>Acer laptop with 10GB RAM + 500 GB Hard Disk</span>
                  </div>
                </div>
                <div className="col-md-2 text-center">
                  <span className="step">+</span>
                </div>
                <div className="col-md-5 padding-0">
                  <div className="bbb_combo">
                    <div className="bbb_combo_image">
                      <img
                        className="bbb_combo_image"
                        src="https://i.imgur.com/K4b71NV.jpg"
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                      <strike style={{ color: "red" }}>
                        <span className="fs-10" style={{ color: "black" }}>
                          ₹ 32,000
                        </span>
                      </strike>
                      <span className="ml-auto">
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                        <i className="fa fa-star p-rating"></i>
                      </span>
                    </div>
                    <div
                      className="d-flex flex-row justify-content-start"
                      style={{ marginBottom: "13px" }}
                    >
                      <span style={{ marginTop: "-4px" }}>₹30,000</span>
                      <span className="ml-auto fs-10">23 Reviews</span>
                    </div>
                    <span>Acer laptop with 10GB RAM + 500 GB Hard Disk</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12" style={{ marginLeft: "36px" }}>
                  <div className="boxo-pricing-items">
                    <div className="combo-pricing-item">
                      {" "}
                      <span className="items_text">1 Item</span>{" "}
                      <span className="combo_item_price">₹13,200</span>{" "}
                    </div>
                    <div className="combo-plus">
                      {" "}
                      <span className="plus-sign">+</span>{" "}
                    </div>
                    <div className="combo-pricing-item">
                      {" "}
                      <span className="items_text">1 Add-on</span>{" "}
                      <span className="combo_item_price">₹500</span>{" "}
                    </div>
                    <div className="combo-plus">
                      {" "}
                      <span className="plus-sign">=</span>{" "}
                    </div>
                    <div className="combo-pricing-item">
                      {" "}
                      <span className="items_text">Total</span>{" "}
                      <span className="combo_item_price">₹13,700</span>{" "}
                    </div>
                    <div className="add-both-cart-button">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-primary shop-button"
                      >
                        Add to Cart
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-underline">
            <div className="col-md-6">
              {" "}
              <span className=" deal-text">Specifications</span>{" "}
            </div>
            <div className="col-md-6">
              {" "}
              <a href="#" data-abc="true">
                {" "}
                <span className="ml-auto view-all"></span>{" "}
              </a>{" "}
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 border-detail">
              <h2 className="introduce-of-product">ĐẶC ĐIỂM NỔI BẬT</h2>
              <p>{product.introduce}</p>
            </div>
            <div className="col-md-4 border-detail">
              <h2 className="parameter-of-product">THÔNG SỐ KĨ THUẬT</h2>
              <table className="col-md-12">
                <tbody>
                  <tr className="row mt-10">
                    <td className="col-md-4">
                      {product.manufactureName && (
                        <span className="p_specification">Manufacture</span>
                      )}
                    </td>
                    <td className="col-md-8">
                      <ul>
                        <li>{product.manufactureName}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="row mt-10">
                    <td className="col-md-4">
                      {product.cpu && (
                        <span className="p_specification">CPU</span>
                      )}
                    </td>
                    <td className="col-md-8">
                      <ul>
                        <li> {product.cpu} </li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="row mt-10">
                    <td className="col-md-4">
                      {product.ram && (
                        <span className="p_specification">RAM</span>
                      )}
                    </td>
                    <td className="col-md-8">
                      <ul>
                        <li>{product.ram}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="row mt-10">
                    <td className="col-md-4">
                      {product.rom && (
                        <span className="p_specification">ROM</span>
                      )}
                    </td>
                    <td className="col-md-8">
                      <ul>
                        <li>{product.rom}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="row mt-10">
                    <td className="col-md-4">
                      {product.graphicCard && (
                        <span className="p_specification">Graphic Card</span>
                      )}
                    </td>
                    <td className="col-md-8">
                      <ul>
                        <li>{product.graphicCard}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="row mt-10">
                    <td className="col-md-4">
                      {product.battery && (
                        <span className="p_specification">Battery</span>
                      )}
                    </td>
                    <td className="col-md-8">
                      <ul>
                        <li>{product.battery}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="row mt-10">
                    <td className="col-md-4">
                      {product.operatorSystem && (
                        <span className="p_specification">Operator System</span>
                      )}
                    </td>
                    <td className="col-md-8">
                      <ul>
                        <li>{product.operatorSystem}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="row mt-10">
                    <td className="col-md-4">
                      {product.others && (
                        <span className="p_specification">Others</span>
                      )}
                    </td>
                    <td className="col-md-8">
                      <ul>
                        <li>{product.others}</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Comments idProduct={product.id} name={product.name}></Comments>
    </div>
  );
}
export default Detail_Of_Product;
