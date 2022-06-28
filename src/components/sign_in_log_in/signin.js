import { useRef } from "react";
import Modal from "../Modal/Modal";
import "./signin.css";

function Signin(props) {
  const mailRef = useRef("");
  const submitHandler = (event) => {
    event.preventDefault();
  };
  async function Checkid(movie) {
    const response = await fetch("http://localhost:9000/signin/check", {
      method: "POST",
      body: JSON.stringify({ id: mailRef.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }
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
        <span className="signin__title">ورود یا ثبت نام</span>
      </div>
      <form className="signin__form" onSubmit={submitHandler}>
        <label className="signin__mobile__title" htmlFor="person_id">
          ایمیل / شماره موبایل
        </label>
        <input type={"text"} id="person_id" ref={mailRef}></input>

        <input
          className="signin__submit"
          type={"submit"}
          onClick={Checkid}
          value={"تایید"}
        ></input>
      </form>
    </Modal>
  );
}
export default Signin;
