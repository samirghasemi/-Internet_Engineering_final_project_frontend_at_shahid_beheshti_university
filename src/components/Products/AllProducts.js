import ProductCard from "./ProductsCard";
import { useEffect, useState } from "react";

import "./AllProducts.css";
import NestedList from "./list";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function AllProducts() {
  const click = useSelector((state) => state.clicked);
  const params = useParams();
  const sign_in = useSelector((state) => state.signin);
  const id = useSelector((state) => state.id);
  const [products, productsSet] = useState(false);
  const [likes, likesSet] = useState(false);
  useEffect(() => {
    var temp = [];
    let min_price = -1;
    let max_price = 1000000000000;
    fetch("http://193.141.126.85:4000/api/models")
      .then(async (res) => await res.json())
      .then((item) => {
        temp = item;
        let res;
        if (params.id1) {
          res = temp.filter(({ category }) => category == params.id1);
        }
        if (params.id2) {
          res = res.filter(({ subcategory }) => subcategory == params.id2);
        }
        if (params.id3) {
          res = res.filter(({ brand }) => brand == params.id3);
        }
        if (min_price) {
          res = res.filter(({ price }) => price >= min_price);
        }
        if (max_price) {
          res = res.filter(({ price }) => price <= max_price);
        }

        productsSet(res);
      });
    if (sign_in) {
      fetch("http://193.141.126.85:4000/api/users/" + id)
        .then(async (res) => await res.json())
        .then((items) => likesSet(items.data.likes));
    }
  }, [click]);
  return products === false ? (
    <div></div>
  ) : (
    <div className="ProductsCard__checklist">
      <div className="ProductsCard__container">
        {products.map((product) => {
          return <ProductCard key={product.id} detail={product} like={likes} />;
        })}
      </div>
      <div className="brand__search">
        <NestedList></NestedList>
      </div>
    </div>
  );
}
export default AllProducts;
