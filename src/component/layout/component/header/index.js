import React, { useRef } from "react";
import "../../../../static/css/component/header/style.css";

import "../../../../static/css/style.css";

import "../../../../static/js/component/header/index";
import MyCarousel from "../carousel";

import StickyBox from "react-sticky-box";
import { useState, useEffect, useContext } from "react";
import Login from "../../../../pages/login";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BranchContext } from "../../../branchSelect/BranchContext";
import { SearchContext } from "../../../searchKeyWord/searchKeyWord";
import { UserContext } from "../../../userLogin/userlogin";
function Header() {
  const { user, setUser } = useContext(UserContext);

  const sticky = useRef(null);
  const branch = useRef(null);
  const { branchID, setBranchID } = useContext(BranchContext);
  const { search, setSearch } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");
  // const history = useHistory();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    function handleScroll() {
      // console.log(window.scrollY);

      if (window.scrollY > 646) {
        sticky.current.classList.add("p_fixed");
        sticky.current.classList.remove("p_relative");
      } else {
        sticky.current.classList.add("p_relative");
        sticky.current.classList.remove("p_fixed");
      }
    }
  }, []);

  // xu ly hover
  const dropdown = useRef(null);

  // handle click login
  const showLogin = useRef(null);
  function handleLogin() {
    console.log("coclick");
    if (showLogin.current.classList.contains("d-block") === false) {
      showLogin.current.classList.add("d-block");
      showLogin.current.classList.remove("d-none");
      return;
    }
    if (showLogin.current.classList.contains("d-block")) {
      showLogin.current.classList.remove("d-block");
      showLogin.current.classList.add("d-none");
      return;
    }
    console.log(showLogin);
  }

  // handle click change bramch
  function handleClickBranch(event, id) {
    // event.preventDefault();
    console.log("id branch la", id);
    branch.current.innerText = event.target.innerText;
    setBranchID(id);
  }

  /// handle search

  function handleSubmit(event) {
    event.preventDefault();
    console.log("no co chay ham submit");

    console.log("seahc key", search);
  }

  function handleInputChange(event) {
    const value = event.target.value;
    if (!value) {
      setInputValue("");
      setSearch("trống");
      return;
    }
    setInputValue(value);
    setSearch(value);
    console.log("input value", value);
  }

  function hienthiuser() {
    console.log(user);

    console.log("user lay tu local", JSON.parse(localStorage.getItem("user")));
  }

  function logoutUser() {
    localStorage.removeItem("user");
    setUser("");
  }
  return (
    <section className="ftco-section main_header">
      {/* this is carousel  */}

      <div className="container header_carousel">
        {/*   <div className="col-md-6 text-center mb-5"> */}
        <MyCarousel></MyCarousel>
        {/* </div>*/}
      </div>
      {/* <button onClick={hienthiuser}>hien thi user</button> */}

      <div className="menu_nav_header" id="menu_nav_header" ref={sticky}>
        <div className="wrap">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col">
                <p className="mb-0 phone">
                  <span className="fa fa-phone"></span>{" "}
                  <a href="#">+00 1234 567</a>
                </p>
              </div>
              <div className="col d-flex justify-content-end">
                <div className="social-media">
                  <p className="mb-0 d-flex">
                    <a
                      href="#"
                      className="d-flex align-items-center justify-content-center contact"
                    >
                      <i class="fa-brands fa-facebook"></i>
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center justify-content-center contact"
                    >
                      <i class="fa-brands fa-twitter"></i>
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center justify-content-center contact"
                    >
                      <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center justify-content-center contact"
                    >
                      <i class="fa-solid fa-globe"></i>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav
          className="navbar navbar-expand-lg navbar-dark ftco_navbar  ftco-navbar-light navbar_feature "
          id="ftco-navbar"
        >
          <div className="container">
            <Link className="navbar-brand " id="logo_navbar" to={"/"}>
              Phones <span>Hub</span>
            </Link>
            <form
              action=""
              className="searchform order-sm-start order-lg-last"
              onSubmit={handleSubmit}
            >
              <div className="form-group d-flex">
                <input
                  type="text"
                  className="form-control pl-3"
                  placeholder="Search"
                  value={inputValue}
                  onChange={handleInputChange}
                ></input>
                <Link to="/search">
                  <button type="submit" className="form-control search">
                    <span className="fa fa-search"></span>
                  </button>
                </Link>
              </div>
            </form>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#ftco-nav"
              aria-controls="ftco-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fa fa-bars"></span> Menu
            </button>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav m-auto">
                <li className="nav-item active">
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-item dropdown branch">
                  <span className="makeup_see_branch">Xem giá tại</span>
                  <a
                    className="nav-link dropdown-toggle "
                    href="#!"
                    id="dropdown04"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    ref={branch}
                  >
                    Cửa hàng 1
                  </a>
                  <div className="dropdown_contain">
                    <ul className="dropdown_menu">
                      <li>
                        <a href="#!" onClick={(e) => handleClickBranch(e, 1)}>
                          Cửa hàng 1
                        </a>
                      </li>
                      <li>
                        <a href="#!" onClick={(e) => handleClickBranch(e, 2)}>
                          Cửa hàng 2
                        </a>
                      </li>
                      <li>
                        <a href="#!" onClick={(e) => handleClickBranch(e, 3)}>
                          Cửa hàng 3
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* <li className="nav-item">
                  <a href="#type_product_nav" className="nav-link">
                    DOANH MỤC
                  </a>
                </li> */}
                <li className="nav-item">
                  <Link to={"/order_lookup"} className="nav-link">
                    TRA CỨU ĐƠN HÀNG
                  </Link>
                </li>

                {/* {user.role_id == "manager" ? (
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                      QUẢN TRỊ
                    </Link>
                  </li>
                ) : null} */}

                {!user ? (
                  <li className="nav-item" onClick={handleLogin}>
                    <a href="#!" className="nav-link">
                      ĐĂNG NHẬP
                    </a>
                  </li>
                ) : (
                  <li className="nav-item user_function">
                    <a href="#!" className="nav-link">
                      <span style={{ marginLeft: "20px", marginTop: "-20px" }}>
                        XIn Chào
                      </span>{" "}
                      {user.name}
                    </a>
                    <div className=" options_user_funtion_box">
                      <ul className=" option_user_funtion">
                        {user.role_id == "manager" ? (
                          <li>
                            <a href="#!">Quản trị hệ thống</a>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </li>
                )}

                {user && (
                  <li className="nav-item">
                    <a href="#!" className="nav-link" onClick={logoutUser}>
                      Đăng Xuất
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <Container
        ref={showLogin}
        className={"show_login d-none"}
        id={"show_login"}
      >
        <Login myref={showLogin}></Login>
        <div className="blur_login" onClick={handleLogin}>
          {/* {" "}
          <i class="fa-regular fa-circle-xmark close_login"></i> */}
        </div>
      </Container>
    </section>
  );
}

export default Header;
