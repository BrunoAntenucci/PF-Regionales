import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavCard from "./FavCard";

const Favourites = () => {
  const wishlist = useSelector((state) => state.wishlist);
  return (
   <div>
      <h1>Favoritos</h1>
      <div>
        {wishlist.length ? (
          wishlist.map(({product: {name, price, image, _id, description}, i}) => (
            <FavCard
                key={i}
                image={image}
                name={name}
                price={price}
                _id={_id}
                description={description}
                />
          ))
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