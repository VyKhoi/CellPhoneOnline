import React, { useEffect, useState } from "react";
import "../../static/css/component/signUp/style.css";
import { Container } from "react-bootstrap";

import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

function SignUp() {
  const [Name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [homeTown, sethomeTown] = useState("");
  //Xác thực capcha
  const [captchaValue, setCaptchaValue] = useState("");

  const [passwordsMatch, setPasswordsMatch] = useState(false);
  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      Name: Name,
      Email: email,
      Username: username,
      Gender: gender,
      Password: password,
      ConfirmPassword: confirmPassword,
      PhoneNumber: phoneNumber,
      Hometown: homeTown,
    };

    // axios.post("http://localhost:8000/home/register/", user)
    //   .then((response) => {
    //     console.log(response.user);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    if (!passwordsMatch) {
      alert("Vui lòng xác nhận lại mật khẩu");
    } else {
      if (captchaValue === "") {
        alert("Vui lòng nhập CAPTCHA");
      } else {
        axios
          .post("https://localhost:7242/api/v1/auth/create/", user)
          .then((response) => {
            const data = response.data;
            if (data.status === false) {
              alert(
                "Username hoặc PhoneNumber hoặc Email đã trùng, vui lòng thay đổi để hợp lệ"
              );
            } else {
              alert("ĐÃ ĐĂNG KÝ THÀNH CÔNG");
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="container mt-5 flex-signup">
      <div>
        <img
          className="signup"
          src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
          alt="A beautiful image"
        />
      </div>
      <div>
        <div className="form-wrapper">
          <label for="Name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="Name"
            name="Name"
            value={Name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        {/* <div className="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            pattern="^(?=.*[a-zA-Z]{5,})(?=.*[0-9]{3,})[a-zA-Z0-9]{5,10}$"
            title="Ít nhất 5 chữ và 3 số, tối đa 15 chữ số"
            maxLength={15}
            required
          />
        </div> */}
        <div className="form-wrapper">
          <label for="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-wrapper">
          <label for="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            title="Yêu cầu nhập ít nhất 8 kí tự"
            required
          />
        </div>
        <div className="form-wrapper">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            style={{ borderColor: passwordsMatch ? "inherit" : "red" }}
            required
          />
        </div>
        {!passwordsMatch && (
          <p style={{ color: "red" }}>Passwords do not match</p>
        )}
        <div className="form-wrapper">
          <label for="gender">Gender:</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <option value="" disabled>
              Please select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-wrapper">
          <label for="homeTown">Hometown:</label>
          <input
            type="text"
            className="form-control"
            id="homeTown"
            name="homeTown"
            value={homeTown}
            onChange={(event) => {
              const value = event.target.value;
              const regex = /^[a-zA-Z\s]*$/; // Chỉ cho phép nhập chữ và khoảng trắng
              if (regex.test(value)) {
                sethomeTown(value);
              }
            }}
          />
        </div>
        <div className="form-wrapper">
          <label for="phoneNumber">PhoneNumber:</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(event) => setphoneNumber(event.target.value)}
            pattern="0\d{9}"
            title="Vui lòng nhập đúng số điện thoại"
            required
          />
        </div>
        {/* <p>macapchane</p> */}
        <ReCAPTCHA
          sitekey="6Lfg5BAlAAAAAI2nw7BPq1-eI3Tg7WYIzaQEbwmW"
          onChange={handleCaptchaChange}
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
      <h1></h1>
    </form>
  );
}

export default SignUp;
