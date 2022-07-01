import { useRef, useState } from "react";
import Modal from "../Modal/Modal";
import "./signin.css";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "./input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
  VALIDATOR_EMAIL,
} from "./validators";

import Box from "@mui/material/Box";
function Signin(props) {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const usernameInputRef = useRef("");

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    // optional: Add validation
    setIsLoading(true);
    let url;
    const formData = new FormData();
    formData.append("user", []);
    const data = {
      avatar: [],
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    for (const name in data) {
      formData.append(name, data[name]);
    }
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZhsabDexE9BhcJbGxnZ4DiRlrCN9xe24";
      fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              // if (data && data.error && data.error.message) {
              //   errorMessage = data.error.message;
              // }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      url = "http://193.141.126.85:4000/api/sign_up";
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          user: {
            avatar: "",
            username: enteredUsername,
            email: enteredEmail,
            password: enteredPassword,
          },
        }),
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              // if (data && data.error && data.error.message) {
              //   errorMessage = data.error.message;
              // }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          setIsLoading(false);
          alert(err.message);
        });
    }
  };
  return (
    <Modal onClose={props.onclick}>
      <button className="Modal__close__button" onClick={props.onclick}>
        <img
          className="Modal__close__button__img"
          src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
          alt="close"
        ></img>
      </button>
      <div>
        <hr />
        <span className="signin__title">{isLogin ? "ورود" : "ثبت نام"}</span>
      </div>
      <form className="signin__form" onSubmit={submitHandler}>
        <label
          className="signin__mobile__title"
          style={isLogin ? { display: "none" } : { display: "inherit" }}
          htmlFor="person_id"
        >
          نام کاربری{" "}
        </label>
        <Input
          type={"text"}
          id="person_id"
          shown={isLogin}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="نام کاربری وارد شده صحیح نیست"
          ref={usernameInputRef}
        ></Input>
        <label className="signin__mobile__title" htmlFor="person_id">
          ایمیل
        </label>
        <Input
          type={"text"}
          id="person_id"
          ref={emailInputRef}
          validators={[VALIDATOR_EMAIL()]}
          errorText="ایمیل وارد شده صحیح نیست"
        ></Input>
        <label className="signin__mobile__title" htmlFor="person_id">
          رمز عبور
        </label>
        <div className="password__input__shownBut">
          <Input
            password={true}
            validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(30)]}
            errorText="رمز عبور ضعیف است"
            id="person_id"
            ref={passwordInputRef}
          ></Input>
        </div>
        <button
          type="button"
          className="auth__change"
          onClick={switchAuthModeHandler}
          validators={[VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(12)]}
          errorText="username must be valid"
        >
          {isLogin ? "Create new account" : "Login with existing account"}
        </button>
        {!isLoading && (
          <input
            className="signin__submit"
            type={"submit"}
            value={"تایید"}
          ></input>
        )}
        {isLoading && (
          <Box sx={{ display: "flex", marginTop: "10px" }}>
            <CircularProgress />
          </Box>
        )}
      </form>
    </Modal>
  );
}
export default Signin;
