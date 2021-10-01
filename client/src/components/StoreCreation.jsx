import React from 'react';
import { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { getProducts, postStore } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Notification from './Notification';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root:{
        margin:"30px auto",
        width:"fit-content",
    },
    card:{
        // display:"flex",
        margin:"30px auto",
        width:"800px",
        padding: "40px",
        borderRadius: "8px",
        boxShadow:"3px 3px 3px #0003",
background: "linear-gradient(120deg, #ffffff 0%, "+theme.palette.secondary.light+" 75%, rgba(255,253,253,1) 75%,  rgba(255,253,253,1) 76%, "+theme.palette.secondary.light+" 76%, "+theme.palette.secondary.light+ " 78%, rgba(255,253,253,1) 78%)",

    },
    error:{
        width: "fit-content",
        borderRadius: "10px",
        padding:"10px 30px",
        background:theme.palette.error.light,
        color:theme.palette.error.main
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        bottom: "7px",
        right: "7px"
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      button:{
          margin:"40px 0px 0px 0"
      },
      ul:{
        display:'flex', 
        flexDirection:'row',
        flexWrap:"wrap",
        background: "linear-gradient(120deg, #ffffff 0%, "+theme.palette.secondary.light+" 75%, rgba(255,253,253,1) 75%,  rgba(255,253,253,1) 76%, "+theme.palette.secondary.light+" 76%, "+theme.palette.secondary.light+ " 78%, rgba(255,253,253,1) 78%)",
        maxWidth:"fit-content",
        borderRadius:"20px",
        boxShadow:" inset 2px 1px 2px #000000"
      },
      categoryDiv:{
       display:'flex', 
       flexDirection:'row',
        width:"fit-content",
        alignItems:"center",
        background:theme.palette.primary.main,
        borderRadius:"10px",
        padding:"10px",
        margin:" 10px"
      },
      categoryName:{
          color:"white",
          padding:"10px",
          margin:"0",
          backgroundColor:"#0001"
      },
      categoryButton:{
          border: "none",
          padding:"0 15px",
          //height:"max-content",
          borderRadius:"10px",
          fontSize:"1.3em",
        color:"white",
        background:theme.palette.primary.dark,
      },
      buttonsDiv:{
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-between"
      },
      cateroriesSelect:{
        
      },
      
      }));

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre';
    }
    if(!input.description){
        errors.description = 'Se requiere una descripcion';
    }
    if(!input.city){
        errors.city = 'Se requiere una ciudad';
    }
    if(!input.products){
        errors.products = 'Se requiere un producto';
    }
    if(!input.address){
        errors.address = 'Se requiere una direccion';
    }
    if(!input.img){
        errors.img = 'Se requiere una imagen';
    }
    // if(!input.reputation){
    //     errors.reputation = 'Se requiere una reputacion';
    // }
    return errors
}

export default function StoreCreation(){
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const dispatch = useDispatch();
    //const history = useHistory();
    const [ errors, setErrors ] = useState({});

    const [ input, setInput ] = useState({
        name: '',
        description: '',
        city: '',
        products: [],
        address: '',
        img: ''
        //reputation: 0,
    });

  const classes = useStyles();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const products = useSelector((state) => state.products)
    const user = useSelector((state) => state.user)

    function handleProducts(e){
        if (input.products.includes(e.target.value)) {
          setNotify({
            isOpen: true,
            message: 'Producto repetido, prueba con otro!',
            type: 'warning'
        })                  
          
      }else{
        setInput({
            ...input,
            products: [...input.products, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
  
      }
      } 

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
          })
          setErrors(validate({
              ...input,
              [e.target.name]: e.target.value,
          }))
        console.log(input)

    }

    function handleClose(e){
        setInput({
            ...input,
            products: input.products.filter(pro => pro !== e)
        })
    }

    function handleSubmit(e){
        console.log(e)
        if(errors.name || errors.description || errors.city || errors.products || errors.address || errors.img ){
            e.preventDefault();
            setNotify({
                isOpen: true,
                message: 'Formulario incompleto',
                type: 'error'
            })
        }else{
            e.preventDefault();   
            dispatch(postStore(input));
            setNotify({
                isOpen: true,
                message: 'Petición para crear tienda enviada',
                type: 'success'
            })   
            setInput({
                name: '',
                description: '',
                city: '',
                products: [],
                address: '',
                img:''
                //reputation: 0,
            })
        }
    }
    console.log(input)

    return(
        <>
        {/* <div>
            <h1>Crear Una Nueva Tienda</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Nombre</label>
                        <input 
                         type='text'
                         value={input.name}
                         name='name'
                         onChange={handleChange}
                        />
                        {errors.name && (
                            <p>{errors.name}</p>
                        )} 
                    </div>
                    <div>
                        <label>Descripcion</label>
                        <input
                        type='text'
                        value={input.description}
                        name='description'
                        onChange={handleChange}
                        />
                        {errors.description && (
                            <p>{errors.description}</p>
                        )} 
                    </div>
                    <div>
                        <label>Ciudad</label>
                        <input
                        type='text'
                        value={input.city}
                        name='city'
                        onChange={handleChange}
                        />
                        {errors.city && (
                            <p>{errors.city}</p>
                        )}
                    </div>

                    <div>
                        <select onChange={handleProducts} required>
                            {
                                products.map((e) => 
                                <option value={e._id}>{e.name}</option>
                                )
                            }
                        </select>
                        {errors.product && (
                            <p>{errors.product}</p>
                        )}

                    </div>

                    <div>
                        <label>Direccion</label>
                        <input
                        type='text'
                        value={input.address}
                        name='address'
                        onChange={handleChange}
                        />
                        {errors.address && (
                            <p>{errors.address}</p>
                        )}
                    </div>

                    
    //                 <div>
    //                     <label>Imagen</label>
    //                     <input
    //                     type='text'
    //                     value={input.img}
    //                     name='img'
    //                     onChange={handleChange}
    //                     />
    //                     {errors.reputation && (
    //                         <p>{errors.img}</p>
    //                     )}

    //                 </div>

    //                 <button type='submit'>Crear Tienda</button>
    //             </form>
    //                     <ul >{input.products.map(e => {
    //                         const aux = products.find(i => i._id === e)
    //                         return <div style={{display:'flex', flexDirection:'row'}}>
    //                                     <p>{aux.name}</p>
    //                                     <button onClick={() => handleClose(e)}>x</button>
    //                                </div>
    //                     })}</ul>
                       

    //             <Link to='/'>
    //                 <button>Volver</button>
    //             </Link>
    //     </div>)

                <Link to='/'>
                    <button>Volver</button>
                </Link> 
        </div>*/}

            <div className={classes.root}>
            <div className={classes.card}>
        <Typography variant="h6" gutterBottom >
        Crear una tienda
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              
              value={input.name}
              name='name'
             label="Nombre"
             onChange={handleChange}
              fullWidth
              autoComplete="given-name"
            />
            {errors.name && (
                             <p className={classes.error}>{errors.name}</p>
                        )} 
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              
          
              value={input.description}
                 name='description'
                onChange={handleChange}
                label="description"
              fullWidth
              autoComplete="family-name"
            />
            {errors.description && (
                             <p className={classes.error}>{errors.description}</p>
                             )} 
          </Grid>
          <Grid item xs={12} sm={3}>
          <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">productos</InputLabel>
        <Select
        className={classes.cateroriesSelect}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          required
          onChange={handleProducts}
        >
             {
                                products.map((e, i) => e.user === user._id ?
                               <MenuItem key={i} value={e._id}>{e.name}</MenuItem>
                                 : null)
             }
        </Select>
      </FormControl>
      {errors.categories && (
                          <p className={classes.error} >{errors.categories}</p>
                    )}
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              
            value={input.city}
              name='city'
             onChange={handleChange}
              label="Ciudad "
              fullWidth
              
            />{errors.city && (
                <p className={classes.error} >{errors.city}</p>
          )}
         
          </Grid>
          <Grid item xs={12}  sm={6}>
            <TextField
              
              
              label="dirección"
              value={input.address}
               name='address'
             onChange={handleChange}
              fullWidth
             
            />
             {errors.address && (
                            <p className={classes.error}>{errors.address}</p>
                     )}
          </Grid>
        
          <Grid item xs={12}  sm={12}>
            <TextField
              
              type='text'
              label="imagen URL"
              value={input.img}
              name='img'
             onChange={handleChange}
              fullWidth
             
            />
             {errors.img && (
                            <p className={classes.error}>{errors.img}</p>
                     )}
          </Grid>
          
        </Grid>
        <div className={classes.buttonsDiv}>
        
             
                    <Button  variant="contained" className={classes.button} 
                  color="secondary" type='submit'>Crear Tienda</Button>
           </div>
        </form>
        
                  
        </div>
        <ul 
        className={classes.ul} >{input.products.map(e => {
                            const aux = products.find(i => i._id === e)
                            return <div className={classes.categoryDiv}
                             style={{display:'flex', flexDirection:'row'}}>
                                        <p  className={classes.categoryName}
                                        >{aux.name}</p>
                                        <button className={classes.categoryButton} 
                                        onClick={() => handleClose(e)}>x</button>
                                   </div>
                        })}</ul>
                       
                       </div>

        <Notification
            notify={notify}
            setNotify={setNotify}
        />

        </>
        )

    }




    