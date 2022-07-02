import { useEffect, useState } from "react";
import ProductCard from "../Products/ProductsCard";
import "./Profile.css";
function Profile() {
  const [likedproducts, likedproductsSet] = useState(false);
  const [lastseenproducts, lastseenproductsSet] = useState(false);
  useEffect(() => {
    fetch("http://193.141.126.85:4000/api/users/1")
      .then((res) => res.json())
      .then((items) => likedproductsSet(items.data.likes));
  }, []);

  return (
    <div>
      <h2 className="likedproduct__h"> لیست کالاهای مورد علاقه </h2>

      {likedproducts !== false && (
        <div className="likedproduct__container">
          {likedproducts.map((product) => {
            return (
              <div>
                <ProductCard
                  key={product.id}
                  detail={product.model}
                  like="true"
                />
              </div>
            );
          })}
        </div>
      )}
      {likedproducts === false && (
        <h3 className="likedproduct__h">کالایی برای نمایش وجود ندارد</h3>
      )}
      <h2 className="likedproduct__h">کالاهای اخیرا بازدید شده</h2>
      {<div className="likedproduct__container"></div> &&
        lastseenproducts !== false}
      {lastseenproducts === false && (
        <h3 className="likedproduct__h">کالایی برای نمایش وجود ندارد</h3>
      )}
    </div>
  );
}
export default Profile;
