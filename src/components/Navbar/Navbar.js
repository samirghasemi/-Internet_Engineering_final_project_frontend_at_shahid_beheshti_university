import { useEffect, useState } from "react";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Signin from "../auth/signin";
import SearchIcon from "@mui/icons-material/Search";
import SvgIcon from "@mui/material/SvgIcon";
import { useSelector } from "react-redux";
import Tabclicked from "../tabModal/Tabclicked";
import { Link } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../../torob_logo.svg";
import AccountAvatar from "./AccountAvatar";
function Navbar() {
  const location = useLocation();
  const Dispatch = useDispatch();
  const tab = useSelector((state) => state.clicked);
  const [signModal, signModalSet] = useState(false);
  const [nav, navSet] = useState([]);
  const [models, modelsSet] = useState([]);
  const [search, searchSet] = useState([]);
  const searchclicked = () => {
    Dispatch({ type: "search", payload: { searched: search } });
    navigate("/search");
  };
  const modalOpenHandler = () => {
    signModalSet(true);
  };
  const tabClickedHandler = (item) => {
    Dispatch({ type: "Clicked", payload: item });
  };
  const navigate = useNavigate();
  const changeHandler = (search) => {
    let temp = models;
    let res2 = [];
    if (search) {
      res2 = temp.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      res2 = [];
    }
    searchSet(res2);
  };
  const modalCloseHandler = () => {
    signModalSet(false);
  };
  const auth = useSelector((state) => state.signin);
  useEffect(() => {
    fetch("http://193.141.126.85:4000/api/category")
      .then(async (res) => await res.json())
      .then((items) => {
        navSet(items);
      });

    fetch("http://193.141.126.85:4000/api/models")
      .then(async (res) => await res.json())
      .then((items) => {
        modelsSet(items);
      });
  }, []);
  return nav === [] ? (
    <div></div>
  ) : (
    <div>
      {location.pathname !== "/" && (
        <div>
          <div className="navbar__logo">
            <Link to={"/"} className="navbar__logo">
              <ReactLogo width={"40px"} height={"40px"} />
              <h1 className="navbar__h1">ترب</h1>
            </Link>
            <form className="navbar__search">
              <input
                type="text"
                className="navbar__search__input"
                placeholder="نام کالا را وارد کنید"
                onChange={(e) => changeHandler(e.target.value)}
              ></input>

              <button
                type="button"
                className="navbar__search__button"
                onClick={searchclicked}
              >
                <SvgIcon
                  component={SearchIcon}
                  sx={{ color: "white", fontSize: "40px" }}
                  inheritViewBox
                />
              </button>
            </form>
          </div>
        </div>
      )}
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
        {!auth && (
          <button onClick={modalOpenHandler} className="navbar__button">
            ورود / ثبت نام
          </button>
        )}
        {signModal && <Signin onclick={modalCloseHandler} />}

        {auth && (
          <div className="Navbar__Avatar">
            <AccountAvatar />
          </div>
        )}

        {tab && <Tabclicked />}
      </div>
    </div>
  );
}
export default Navbar;
