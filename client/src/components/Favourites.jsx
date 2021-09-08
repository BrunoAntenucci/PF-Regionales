import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Favourites = () => {
  const wishlist = useSelector((state) => state.wishlist);
  return (
   <div>
      <h1>Favoritos</h1>
      <div>
        {wishlist.length ? (
          wishlist.map(
            ({ product: { imageUrl, name, price, _id, description } }, i) => (
              <FavCard
                key={i}
                imageUrl={imageUrl}
                name={name}
                price={price}
                _id={_id}
                description={description}
              />
            )
          )
        ) : (
          <div>
            <p>No tienes favoritos aún</p>
          </div>
        )}
      </div>
      <Link to="/">
        Volver
      </Link>
      </div>
  );
};

export default Favourites;