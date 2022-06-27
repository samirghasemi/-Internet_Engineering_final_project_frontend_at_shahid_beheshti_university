import { useEffect, useState } from "react";
import "./Navbar.css";
function Navbar() {
  const [nav, navSet] = useState([]);
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
          <div className="navbar__category__block">
            <p>{item.category}</p>
          </div>
        );
      })}
      <button className="navbar__button">ورود/ثبت نام</button>
    </div>
  );
}
export default Navbar;
