import Modal from "../Modal/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import "./Report.css";
import { useState, useRef } from "react";

function Report(props) {
  const usernameInputRef = useRef("");
  const [options, setOption] = useState(0);
  const optionHandler = (item) => {
    setOption(item);
    console.log(item);
  };
  return (
    <Modal onClose={props.onclick}>
      <div>
        <div>
          <div className="product__container">
            <img
              className="product__img"
              src={props.product[0].img}
              alt="Product_Photo"
            />
            <button className="Modal__close__button" onClick={props.onclick}>
              <img
                className="Modal__close__button__img"
                src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
                alt="close"
              ></img>
            </button>
            <div className="product__name__price">
              <h2> {props.product[1][0][1]} </h2>
              <p className="p1__details">{props.product[0].name}</p>
              <p className="product__price"> {props.product[1][1][1]} تومان</p>
            </div>
          </div>
          <div className="report__product__name">{props.product.name}</div>
        </div>
        <div className="report__input__container">
          <h2>به چه مشکلی برخوردید؟</h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label className="report__label">
              <input
                style={{ color: "black" }}
                type="radio"
                value="wrongvalue"
                checked={options === 1}
                onChange={() => optionHandler(1)}
              />
              این کالا مربوط به این صفحه نیست
            </label>
            <label className="report__label">
              <input
                style={{ color: "black" }}
                type="radio"
                value="price"
                checked={options === 2}
                onChange={() => optionHandler(2)}
              />
              قیمت صحیح نیست
            </label>
            {options !== 0 && (
              <textarea
                type="text"
                ref={usernameInputRef}
                onChange={() => {
                  console.log(usernameInputRef.current.value);
                }}
                className="report__input"
                placeholder="با توضیحات بیشتر ما را در پیگیری بهتر کمک کنید"
              ></textarea>
            )}
            <button className="report__button__send" type="button">
              ثبت گزارش
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
export default Report;
