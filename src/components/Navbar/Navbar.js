import { useEffect, useState } from "react";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import React from "react";
import Signin from "../auth/signin";
import { useSelector } from "react-redux";
import Tabclicked from "../tabModal/Tabclicked";
function Navbar() {
  const Dispatch = useDispatch();
  const tab = useSelector((state) => state.clicked);
  const [signModal, signModalSet] = useState(false);
  const [nav, navSet] = useState([]);
  const modalOpenHandler = () => {
    signModalSet(true);
  };
  const tabClickedHandler = (item) => {
    Dispatch({ type: "Clicked", payload: item });
  };
  const modalCloseHandler = () => {
    signModalSet(false);
  };
  useEffect(() => {
    fetch("http://localhost:9000/navbar")
      .then((res) => res.json())
      .then((items) => navSet(items));
  }, []);
  return nav === [] ? (
    <div></div>
  ) : (
    <div className="navbar__category__container">
      {nav.map((item) => {
        return (
          <div>
            <button
              className="navbar__category__block "
              onClick={() => tabClickedHandler(item)}
            >
              {item.category}
            </button>
          </div>
        );
      })}
      <button onClick={modalOpenHandler} className="navbar__button">
        ورود / ثبت نام
      </button>
      {signModal && <Signin onclick={modalCloseHandler} />}
      {tab && <Tabclicked />}
    </div>
  );
}
export default Navbar;
