import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import Tooltip from "@mui/material/Tooltip";
import Signin from "../auth/signin";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import "./ProductsCard.css";
import { useState } from "react";
function ProductCard(props) {
  const like = props.like ? true : false;
  const [signModal, signModalSet] = useState(false);
  const close = () => {
    signModalSet(false);
  };
  const token = useSelector((state) => state.signintoken);
  const [touched, touchedSet] = useState(like);
  const auth = useSelector((state) => state.signin);
  const likeclickHandler = () => {
    if (auth) {
      if (!touched) {
        const url = "http://193.141.126.85:4000/api/like";
        fetch(url, {
          method: "post",

          body: JSON.stringify({
            like: {
              is_like: true,
            },
            model_id: props.detail.id.toString(),
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }).then(async (res) => {
          if (res.ok) {
            console.log(await res.json());
          } else {
            try {
              const data = await res.json();
              let errorMessage = "Authentication failed!";
              // if (data && data.error && data.error.message) {
              //   errorMessage = data.error.message;
              // }
              throw new Error(errorMessage);
            } catch (err) {
              alert(err.message);
            }
          }
        });
      }
      touchedSet(!touched);
    } else {
      signModalSet(true);
    }
  };
  return (
    <div className="container">
      <Link className="card__link" to={"/products/" + props.detail.id}>
        <img className="card__img" src={props.detail.img} alt="Product_Photo" />
        <p className="p1">{props.detail.name}</p>
      </Link>
      <div className="price__size">
        <p style={{ color: "black" }}> از {props.detail.price} تومان</p>
        <Tooltip
          sx={{ fontfamily: "iranyekan", fontSize: "15px" }}
          style={{ fontfamily: "iranyekan", fontSize: "15px" }}
          title={
            touched ? (
              <p style={{ fontfamily: "iranyekan", fontSize: "15px" }}>
                حذف از مورد علاقه ها{" "}
              </p>
            ) : (
              <p style={{ fontfamily: "iranyekan", fontSize: "15px" }}>
                افزودن به مورد علاقه ها{" "}
              </p>
            )
          }
        >
          <IconButton
            className="like__button"
            onClick={likeclickHandler}
            onMouseOver={() => {
              <h1>"like"</h1>;
            }}
          >
            {!touched && <FavoriteBorderSharpIcon />}
            {touched && <FavoriteIcon sx={{ color: "#d73948" }} />}
          </IconButton>
        </Tooltip>
        {signModal && <Signin onclick={close} />}
      </div>
    </div>
  );
}
export default ProductCard;
