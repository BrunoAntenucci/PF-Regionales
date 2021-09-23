import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FavCard from "./FavCard";
import NavBar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableContainer, TableHead} from '@material-ui/core';
import {getFav} from '../actions/index';
import MaterialTable from "material-table";
import {Modal, TextField, Button} from '@material-ui/core';

const columns = [
  {title: 'Imagen', field: 'image'},
  {title: 'Nombre', field: 'name'},
  {title: 'Descripción', field: 'price'},
  {title: 'Precio', field: 'price', type: 'numeric'}
]

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}))
///FALTATÍA AGREGARLE UN LOADING MIENTRAS CARGA
const Favourites = ({id}) => {
  const classes = useStyles()
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)


  useEffect(() => {
    dispatch(getFav());
  }, [dispatch])

 

  return (
  <div>
    <NavBar />
   <div>
      <h1>Favoritos</h1>
      <div>
        {wishlist.length ?
        wishlist.map(({product: {image, name, price, _id, description}, i})=>
        <FavCard 
        key={i}
        image={image}
        name={name}
        price={price}
        _id={_id}
        description={description}
        />
        )
      :<p>No tienes favoritos aún</p>}
       
      </div>
      <Link to={`/products`}>
        Volver
      </Link>
      </div>
    </div>
  );
};

export default Favourites;