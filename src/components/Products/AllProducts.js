import ProductCard from "./ProductsCard";
import { useEffect, useState } from "react";

import "./AllProducts.css";
import NestedList from "./list";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
function AllProducts() {
  const params = useParams();
  const location = useLocation();
  const [products, productsSet] = useState(false);
  useEffect(() => {
    var temp = [];
    console.log(params.id1);
    console.log(params.id2);
    console.log(params.id3);
    let min_price = -10
    let max_price =10000
    fetch("http://193.141.126.85:4000/api/models")
      .then(async (res) => await res.json())
      .then((item) => {
        temp = item;
        let res;
        if (params.id1) {
          res = temp.filter(({category}) => category == params.id1);
        }
        if (params.id2) {
          res = res.filter(({subcategory}) => subcategory == params.id2);
        }
        if (params.id3) {
          res = res.filter(({brand}) => brand == params.id3);
        }
        if (min_price) {
          res = res.filter(({price}) => price >= min_price);
        }
        if (max_price) {
          res = res.filter(({price}) => price <= max_price);
        }

        console.log(res);
        
        productsSet(res);
      });
  }, []);
  return products === false ? (
    <div></div>
  ) : (
    <div className="ProductsCard__checklist">
      <div className="ProductsCard__container">
        {products.map((product) => {
          return <ProductCard key={product.id} detail={product} />;
        })}
      </div>
      <div className="brand__search">
        <NestedList></NestedList>
      </div>
    </div>
  );
}
export default AllProducts;
