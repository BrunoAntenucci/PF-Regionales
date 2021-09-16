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
const Favourites = ({id}) => {
  const classes = useStyles()
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  // const products = useSelector(state => state.products)
  const idProd = wishlist.map(el=>{
    return el.product._id
  })
  
  console.log(idProd, 'id')

  useEffect(() => {
    dispatch(getFav());
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
          
          {wishlist.length? (<div><tr>
            <FavCard id={idProd}/></tr></div>) : (<div>
            <p>No tienes favoritos aún</p>
          </div>) 
          }
        </tbody>
        </Table>
      </div>
      <Link to={`/products`}>
        Volver
      </Link>
      </div>
    </div>
  );
};

export default Favourites;