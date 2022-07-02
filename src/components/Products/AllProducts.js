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
    fetch("http://193.141.126.85:4000/api/models")
      .then(async (res) => await res.json())
      .then((item) => {
        temp = item;
        if (params.id1) {
          temp.filter((item) => item.category.toString() === params.id1);
          if (params.id2) {
            temp.filter((item) => item.subcategory.toString() === params.id2);
            if (params.id3) {
              temp.filter((item) => item.brand.toString() === params.id3);
            }
          }
        }
        productsSet(item);
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
