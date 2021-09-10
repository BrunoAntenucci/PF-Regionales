import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FavCard from "./FavCard";
import NavBar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableContainer, TableHead} from '@material-ui/core';
import {getFav} from '../actions/index';

const useStyles = makeStyles(theme => ({}))

const Favourites = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFav())
  }, [dispatch])
  return (
  <div>
    <NavBar />
   <div>
      <h1>Favoritos</h1>
      <div>
        <Table>
          <thead><tr><th>Nombre</th>
          <th>Precio</th>
          <th>Foto</th></tr></thead>
        <tbody>
        {wishlist.length ? (
          wishlist.map(({product: {name, price, image, _id}, i}) => (
            <tr>
            <FavCard
                key={i}
                image={image}
                name={name}
                price={price}
                _id={_id}
                /></tr>
          ))
        )
         : (
          <div>
            <p>No tienes favoritos aún</p>
          </div>
        )}</tbody>
        </Table>
      </div>
      <Link to="/">
        Volver
      </Link>
      </div>
    </div>
  );
};

export default Favourites;