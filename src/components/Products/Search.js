import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductCard from "./ProductsCard";
import "./AllProducts.css";
export default function Search() {
  const click = useSelector((state) => state.clicked);
  const params = useParams();
  const search = useSelector((state) => state.search);
  const sign_in = useSelector((state) => state.signin);
  const id = useSelector((state) => state.id);
  const [products, productsSet] = useState(false);
  const [likes, likesSet] = useState(false);
  return (
    <div>
      <div className="ProductsCard__checklist">
        <div className="ProductsCard__container">
          {search.map((product) => {
            return (
              <ProductCard key={product.id} detail={product} like={likes} />
            );
          })}
        </div>
      </div>
      );
    </div>
  );
}
