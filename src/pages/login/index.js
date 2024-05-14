import React, { Fragment, useRef, useEffect, useContext } from "react";
import "../../../src/static/css/component/login/style.css";
import "../../../src/static/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "../signUp";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../../component/userLogin/userlogin";
import { useNavigate } from "react-router-dom";
import firebaseApp from "./firebase";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
function Login({ myref }) {
  // const showLogin = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const auth = getAuth(firebaseApp);
  const [checkLogin, setCheckLogin] = useState(1);
  const googleProvider = new GoogleAuthProvider();
  function handleSubmit(event) {
    console.log({ username, password });

    event.preventDefault();
    fetch("https://localhost:7242/api/v1/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);

        let user_curent = data.data; //dôi tuong

        console.log("JSON.parse(", data.data);

        if (data.data != null) {
          localStorage.setItem("user", JSON.stringify(data.data)); // luu vao local json
          setUser(user_curent);
        }
        console.log("user trong context ", user);

        handleRegister();
        setCheckLogin(1);
      })
      .catch((error) => {
        console.error(error);
        console.log("no bi loi");
        setCheckLogin(0);
      });
  }

  function handleRegister() {
    const t = myref.current;
    console.log(t);
    console.log("coclick");
    if (t.classList.contains("d-block") === false) {
      t.classList.add("d-block");
      t.classList.remove("d-none");
      return;
    }
    if (t.classList.contains("d-block")) {
      t.classList.remove("d-block");
      t.classList.add("d-none");
      return;
    }
  }

  const STORAGE_KEY = {
    ACCOUNT: "account",
    USERINFO: "FCMService",
    SOCIAL: "social",
    ACCESS_TOKEN: "accessToken",
  };
  const handleSocialLogin = (type, providerI) => {
    signInWithPopup(auth, providerI)
      .then(({ user }) => {
        user.getIdToken().then(async (accesssToken) => {
          const response = await fetch(
            "https://localhost:7242/api/v1/auth/loginsocial",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                accesssToken: accesssToken,
              }),
            }
          );
          const data = await response.json();
          console.log("sau khi login with google ", data);

          let user_curent = data.data; //dôi tuong

          console.log("JSON.parse(", data.data);
  
          if (data.data != null) {
            localStorage.setItem("user", JSON.stringify(data.data)); // luu vao local json
            setUser(user_curent);
          }
          console.log("user trong context ", user);
  
          handleRegister();
          setCheckLogin(1);
          console.log("accestoken ne ", accesssToken);
        });
      })
      .catch(() => {
        console.log("login.message.failure");
      });
  };
  return (
    <Fragment>
      <Container className="container_login_box d-block">
        <div className="d-lg-flex half container_login">
          <div
            className="bg order-1 order-md-2 img_login"
            style={{
              backgroundImage:
                "url('https://wallpaperaccess.com/full/210902.jpg')",
            }}
          ></div>
          <div className="contents order-2 order-md-1">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-7">
                  <h3>
                    Login to <strong>Colorlib</strong>
                  </h3>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                    consectetur adipisicing.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group first">
                      <label for="username">Username</label>
                      <input
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group last mb-3">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {checkLogin === 0 && (
                      <p style={{ color: "red" }}>
                        <i class="fa-sharp fa-solid fa-lock"></i> thông tin sai,
                        xin nhập lại
                      </p>
                    )}
                    <div className="d-flex mb-5 align-items-center">
                      {/* <label className="control control--checkbox mb-0">
                        <span className="caption">Remember me</span>
                        <input type="checkbox" checked="checked" />
                        <div className="control__indicator"></div>
                      </label> */}
                      <Link to={"/register"} onClick={handleRegister}>
                        <span className="ml-auto">
                          <a href="#" className="forgot-pass">
                            Đăng Ký tài khoản
                          </a>
                        </span>
                      </Link>
                    </div>

                    <button
                      type="submit"
                      value="Log In"
                      className="btn btn-block btn-primary login_bt"
                    >
                      Đăng Nhập
                    </button>
                  </form>
                  <button onClick={() => handleSocialLogin(2, googleProvider)}>
                    GG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* <Routes>
        <Route path="/register" element={<SignUp></SignUp>}></Route>
      </Routes> */}
    </Fragment>
  );
}

export default Login;
