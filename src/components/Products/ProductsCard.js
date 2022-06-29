import { Link } from "react-router-dom";
import "./ProductsCard.css";
function ProductCard(props) {
  return (
    <div className="container">
      <Link className="card__link" to={"/products/" + props.detail.id}>
        <img className="card__img" src={props.detail.img} alt="Product_Photo" />
        <p className="p1">{props.detail.name}</p>
        <div className="price__size">
          <p style={{ color: "black" }}> از {props.detail.price} تومان</p>
        </div>
      </Link>
    </div>
  );
}
export default ProductCard;
