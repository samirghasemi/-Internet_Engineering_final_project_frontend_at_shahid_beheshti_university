import ProductCard from "./ProductsCard";
import { useEffect, useState } from "react";

import "./AllProducts.css";
import NestedList from "./list";
function AllProducts() {
  const [products, productsSet] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/browse/products")
      .then((res) => res.json())
      .then((items) => productsSet(items));
  }, []);
  return products === [] ? (
    <div></div>
  ) : (
    <div className="ProductsCard__checklist">
      <div className="ProductsCard__container">
        {products.map((product) => {
          return (
            <div>
              <ProductCard key={product.id} detail={product} />
            </div>
          );
        })}
      </div>
      <div className="brand__search">
        <NestedList></NestedList>
      </div>
    </div>
  );
}
export default AllProducts;
