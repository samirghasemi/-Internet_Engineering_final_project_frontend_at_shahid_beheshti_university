import { useRef, useState } from "react";
import Modal from "../Modal/Modal";
import "./signin.css";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SvgIcon from "@mui/material/SvgIcon";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import useInputvalidate from "./hooks/Useinput_validate";
function Signin(props) {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const usernameInputRef = useRef("");
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const [visible, visibleSet] = useState(true);
  const Visibilityhold = (e) => {
    visibleSet(!visible);
  };
  let formisValid = false;

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInputvalidate((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInputvalidate((value) => /^\S+@\S+\.\S+$/.test(value));
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInputvalidate((value) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(value)
  );
  if (!isLogin) {
    formisValid =
      enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid
        ? true
        : false;
  } else {
    formisValid = enteredNameIsValid && enteredPasswordIsValid ? true : false;
  }
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;

    if (isLogin) {
      if (!formisValid) {
        alert("مشخصات خود را وارد کنید");
        return;
      }
      setIsLoading(true);
      let url = "http://193.141.126.85:4000/api/sign_in";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        setIsLoading(false);
        if (res.ok) {
          var values = Object.values(await res.json());
          dispatch({
            type: "sign_in",
            payload: { token: values[2], admin: values[1], id: values[0] },
          });
          localStorage.setItem("token", values[2]);
          localStorage.setItem("id", values[0]);
          localStorage.setItem("admin", values[1]);
          props.onclick();
        } else {
          try {
            const data = await res.json();
            let errorMessage = "نام کاربری یا رمز عبور صحیح نیست";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          } catch (err) {
            alert(err.message);
          }
        }
      });
    } else {
      if (!formisValid) {
        alert("مشخصات خود را وارد کنید");
        return;
      }
      setIsLoading(true);
      let url = "http://193.141.126.85:4000/api/sign_up";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          user: {
            username: enteredUsername,
            email: enteredEmail,
            password: enteredPassword,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            alert("ثبت نام با موفقیت انجام شد");
            setIsLogin(true);
          } else {
            return res.json().then((data) => {
              let errorMessage = "نام کاربری قبلا ثبت شده است";
              // if (data) {
              //   errorMessage = Object.values(Object.values(data)[0])[0][0];
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
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";
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
        <label className="signin__mobile__title" htmlFor="person_id">
          نام کاربری{" "}
        </label>
        <div className={nameInputClasses}>
          <input
            type={"text"}
            id="person_id"
            ref={usernameInputRef}
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputHasError && (
            <p className="error-text">نام کاربری خالی نمیتواند باشد</p>
          )}
        </div>

        <label
          className="signin__mobile__title"
          htmlFor="person_id"
          style={isLogin ? { display: "none" } : { display: "inherit" }}
        >
          ایمیل
        </label>
        <div className={emailInputClasses}>
          <input
            type={"text"}
            ref={emailInputRef}
            style={isLogin ? { display: "none " } : { display: "inherit" }}
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && !isLogin && (
            <p
              className="error-text"
              style={isLogin ? { display: "none " } : { display: "inherit" }}
            >
              ایمیل را صحیح وارد کنید
            </p>
          )}
        </div>
        <label className="signin__mobile__title" htmlFor="person_id">
          رمز عبور
        </label>
        <div className={passwordInputClasses}>
          <div style={{ display: "flex" }}>
            <input
              id="password"
              type={visible ? "password" : "text"}
              ref={passwordInputRef}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
            />
            <button
              type="button"
              className="password__shown__button"
              onClick={Visibilityhold}
            >
              <SvgIcon
                component={!visible ? VisibilityOffIcon : VisibilityIcon}
                inheritViewBox
              />
            </button>
          </div>
          {passwordInputHasError && (
            <p className="error-text">رمز عبور را صحیح وارد کنید</p>
          )}
        </div>
        <button
          type="button"
          className="auth__change"
          onClick={switchAuthModeHandler}
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
