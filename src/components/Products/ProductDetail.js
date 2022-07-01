import { useEffect, useState } from "react";
import "./ProductDetail.css";
import Report from "../Report/Report";
import Signin from "../auth/signin";
import { useSelector } from "react-redux";
function ProductDetail() {
  const auth = useSelector((state) => state.signin);
  const [product, productSet] = useState(false);
  const [signModal, signModalSet] = useState(false);
  const [report, reportSet] = useState(false);
  const [store, storeSet] = useState([]);
  const clickHandler = (item) => {
    reportSet(true);
    storeSet(item);
    signModalSet(true);
  };
  const close = () => {
    reportSet(false);
    signModalSet(false);
  };
  const modalCloseHandler = () => {
    signModalSet(false);
  };
  useEffect(() => {
    fetch("http://localhost:9000/apple/promax")
      .then((res) => res.json())
      .then((items) => {
        productSet(items);
      });
  }, []);
  console.log(product);
  return product === false ? (
    <div></div>
  ) : (
    <div className="product__page">
      <div className="product__container">
        <img
          className="product__img"
          src={product[0].img}
          alt="Product_Photo"
        />
        <div className="product__name__price">
          <p className="p1__details">{product[0].name}</p>
          <p className="product__price">
            {" "}
            از {product[0].minPrice} تا {product[0].maxPrice}
          </p>
        </div>
      </div>
      <div className="product__store__specification">
        <div className="product__specification">
          <div className="product__specification__title">
            مشخصات {product[0].name}{" "}
          </div>
          <hr />

          <div className="product__specification__details__container">
            <p
              className="product__specification__title"
              style={{ fontSize: "16px !important" }}
            >
              مشخصات کلی
            </p>
            <hr />
            {Object.entries(product[0].specification[0]).map((item) => {
              return (
                <div>
                  <h3 className="product__specification__details__h">
                    {item[0]}
                  </h3>
                  <p>{item[1]}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="product__stores">
            <h2 style={{ padding: "10px" }}>فروشگاه های اینترنتی</h2>
            <hr style={{ margin: "0px" }} />
            <div>
              <h3 className="product__specification__details__h">
                {product[0].stores.map((items) => {
                  const [key, value, link] = Object.entries(items);
                  return (
                    <div className="product__stores__container">
                      <div className="store__report__container">
                        <h4 className="product__specification__details__h">
                          {key[1]}
                        </h4>
                        <button
                          onClick={() => clickHandler([key, value, link])}
                          className="report__button"
                        >
                          گزارش
                        </button>
                      </div>
                      <p>{product[0].name}</p>
                      <div
                        className="product__button__price_container"
                        style={{ fontWeight: "bold" }}
                      >
                        <p style={{ color: "#d73948" }}>{value[1]}</p>

                        <button className="product__stores__button">
                          <a
                            href={link[1]}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              padding: "16px",
                            }}
                          >
                            خرید اینترنتی
                          </a>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {!auth && signModal && <Signin onclick={close} />}
      {report && auth && (
        <Report onclick={close} product={[product[0], store]} />
      )}
    </div>
  );
}
export default ProductDetail;
