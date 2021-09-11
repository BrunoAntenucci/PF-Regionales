import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FavCard from "./FavCard";
import NavBar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableContainer, TableHead} from '@material-ui/core';
import {getFav} from '../actions/index';

const useStyles = makeStyles(theme => ({}))
///FALTATÍA AGREGARLE UN LOADING MIENTRAS CARGA
const Favourites = () => {
  const classes = useStyles()
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  useEffect(  () => {
    dispatch(getFav());
  }, [dispatch])

  console.log('wish', wishlist)
  console.log('user', user)
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
          {/* <FavCard /> */}
          {wishlist.length? (<div><tr>
            <FavCard/></tr></div>) : (<div>
            <p>No tienes favoritos aún</p>
          </div>) 
          }
        </tbody>
        </Table>
      </div>
      <Link to="/products">
        Volver
      </Link>
      </div>
    </div>
  );
};

export default Favourites;