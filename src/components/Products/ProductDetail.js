import { useEffect, useState } from "react";
import "./ProductDetail.css";
function ProductDetail() {
  const [product, productSet] = useState(false);
  const [stores, storesSet] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/apple/promax")
      .then((res) => res.json())
      .then((items) => {
        productSet(items);
        storesSet(Object.entries(items[0].stores[0]));
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
          <p className="p1">{product[0].name}</p>
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
            {/* <h3 className="product__specification__details__h">{stores[0]}</h3> */}
            <p>{stores[1]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;
