import "./components/Navbar/Navbar";
import "./Main.css";
import { Fragment, useEffect, useState } from "react";
import { ReactComponent as ReactLogo } from "./torob_logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Main() {
  const [models, modelsSet] = useState([]);
  useEffect(() => {
    fetch("http://193.141.126.85:4000/api/models")
      .then(async (res) => await res.json())
      .then((items) => modelsSet(items));
  }, []);
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
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const [search, searchSet] = useState([]);

  const searchclicked = () => {
    Dispatch({ type: "search", payload: { searched: search } });
    navigate("/search");
  };
  return (
    <Fragment>
      <div className="Main__false"></div>
      <div className="Main__container">
        <div className="Main__logo__p__container">
          <div className="Main__logo">
            <ReactLogo width={"85px"} height={"85px"} margin={"4px"} />
          </div>
          <div className="Main__p__container">
            <h1 className="Main__h1">ترب</h1>
            <p className="Main__p1">موتور جستجوی هوشمند خرید</p>
          </div>
        </div>
        <form className="Main__search">
          <button
            type="button"
            className="search-button"
            onClick={searchclicked}
          >
            <img
              src="https://img.icons8.com/external-thin-kawalan-studio/24/000000/external-magnifier-shipping-delivery-thin-kawalan-studio.png"
              alt="search_button"
            />
          </button>
          <input
            type="text"
            className="Main__input"
            placeholder="نام کالا را وارد کنید"
            style={{ fontFamily: "iranyekan" }}
            onChange={(e) => changeHandler(e.target.value)}
          ></input>
        </form>
      </div>
    </Fragment>
  );
}
export default Main;
