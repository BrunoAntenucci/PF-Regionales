import React from 'react';
import { useState, useEffect } from 'react';
import { getCategories, postProducts } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Notification from './Notification';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root:{
        margin:"30px auto",
        width:"fit-content",
    },
    card:{
        margin:"30px auto",
        width:"800px",
        padding: "40px",
        borderRadius: "8px",
        boxShadow:"3px 3px 3px #0003",
background: "linear-gradient(120deg, #ffffff 0%, "+theme.palette.primary.light+" 75%, rgba(255,253,253,1) 75%,  rgba(255,253,253,1) 76%, "+theme.palette.primary.light+" 76%, "+theme.palette.primary.light+ " 78%, rgba(255,253,253,1) 78%)",

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
    if(!input.price){
        errors.price = 'Se requiere un precio';
    }
    if(!input.category){
        errors.category = 'Se requiere una categoria';
    }
    if(!input.quantity){
        errors.quantity = 'Se requiere una cantidad';
    }
    if(!input.image){
        errors.image = 'Se requiere una imagen';
    }
    return errors
}

export default function ProductCreation(){
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const dispatch = useDispatch();
    const classes = useStyles();
    const [ errors, setErrors ] = useState({});

    const [ input, setInput ] = useState({
        name: '',
        description: '',
        price: '',
        category: [],
        quantity: 0,
        image: '',
    });

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const categories = useSelector((state) => state.categories)

    function handleCategories(e){
      if (input.category.includes(e.target.value)) {
        alert("Categoria repetida, prueba con otra!");                
        
    }else{
      setInput({
          ...input,
          category: [...input.category, e.target.value]
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
            category: input.category.filter(cat => cat !== e)
        })
    }

    function handleSubmit(e){
        console.log(e)
        if(errors.name || errors.description || errors.price || errors.category || errors.quantity || errors.image) {
            e.preventDefault();
            setNotify({
              isOpen: true,
              message: 'Formulario incompleto',
              type: 'error'
          })
        }else{
            e.preventDefault();   
            dispatch(postProducts(input));
            setNotify({
              isOpen: true,
              message: 'Petición para crear producto enviada',
              type: 'success'
          })
            setInput({
                name: '',
                description: '',
                price: '',
                category: [],
                quantity: 0,
                image: '',
            })
        }
    }
    console.log(input)
    return(
        <React.Fragment>
            <div className={classes.root}>
            <div className={classes.card}>
        <Typography variant="h6" gutterBottom >
          Crear Un Nuevo Producto
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
              <InputLabel id="demo-simple-select-label">categorías</InputLabel>
                <Select
                  className={classes.cateroriesSelect}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleCategories}
                >
             {
                                categories.map((e, i) => 
                               <MenuItem key={i} value={e._id}>{e.name}</MenuItem>
                                 )
             }
                </Select>
              </FormControl>
                    {errors.categories && (
                          <p className={classes.error} >{errors.categories}</p>
                    )}
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField              
              value={input.quantity}
              name='quantity'
              onChange={handleChange}
              label="quantity"
              fullWidth  
            />
            {errors.quantity && (
                <p className={classes.error} >{errors.quantity}</p>
            )}
          </Grid>

          <Grid item xs={12}  sm={3}>
            <TextField                            
              label="precio"
              value={input.price}
              name='price'
              onChange={handleChange}
              fullWidth
            />
            {errors.price && (
                            <p className={classes.error}>{errors.price}</p>
            )}
          </Grid>
        
          <Grid item xs={12} sm={12}>
            <TextField  
              value={input.image}
              name='image'   
              onChange={handleChange}
              label="imagen"
              fullWidth
            />
            {errors.image && (
              <p className={classes.error} >{errors.image}</p>
            )}
          </Grid>
          
          </Grid>
            <div className={classes.buttonsDiv}>
              <Button  variant="contained" className={classes.button} 
                color="primary" type='submit'>Crear Producto</Button>
            </div>
          </form>  
                  
          </div>
            <ul className={classes.ul}>{input.category.map(e => {
              const aux = categories.find(i => i._id === e)
              return <div 
                className={classes.categoryDiv}
                    >
                    <p className={classes.categoryName}
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
      </React.Fragment>


    ) 
}