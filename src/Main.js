import "./components/Navbar/Navbar";
import Navbar from "./components/Navbar/Navbar";
import { ReactComponent as ReactLogo } from "./torob_logo.svg";
function Main() {
  return (
    <div>
      <Navbar />
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
        <form>
          <button type="submit" className="search-button">
            <img src="https://img.icons8.com/external-thin-kawalan-studio/24/000000/external-magnifier-shipping-delivery-thin-kawalan-studio.png" />
          </button>
          <input
            type="text"
            className="Main__input"
            placeholder="نام کالا را وارد کنید"
            style={{ fontFamily: "iranyekan" }}
          ></input>
        </form>
      </div>
    </div>
  );
}
export default Main;
