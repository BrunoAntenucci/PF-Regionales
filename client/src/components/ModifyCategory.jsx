import React from 'react';
// import { Link } from 'react-router-dom';
import { getCategoryToModify, modifyCategory } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Notification from './Notification';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root:{
        margin:"30px auto",
        width:"fit-content",
    },
    card:{
        // display:"flex",
        margin:"30px auto",
        width:"600px",
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
    button:{
        margin:"40x 0px 0px 0"
    },
    buttonsDiv:{
        display:"flex",
        flexDirection:"row",
        justifyContent: "flex-end"
    },      
      }));

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre';
    }
    
    return errors
}

export default function ModifyCategory(props){

    console.log('PROPS', props)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const dispatch = useDispatch();

    const classes = useStyles();

    const [ errors, setErrors ] = useState({});

    useEffect(() => {
        //dispatch(getCategories());
        dispatch(getCategoryToModify(props.match.params.id));
    }, [dispatch, props.match.params.id])

    const detail = useSelector((state) => state.catDetail);
    //const categories = useSelector((state) => state.categories)


    //console.log('CATEGORIES', categories)
    console.log('DETAIL', detail)

    const [ input, setInput ] = useState({
        _id: detail?.category[0]?._id,
        name: detail?.category[0]?.name
    });

    console.log('INPUT', input)

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

    function handleSubmit(e){
        if(errors.name) {
            e.preventDefault();
            setNotify({
                isOpen: true,
                message: 'Formulario incompleto',
                type: 'error'
            })
        }else{
            e.preventDefault();   
            dispatch(modifyCategory(input._id, input));
            setNotify({
                isOpen: true,
                message: 'Categoría modificada',
                type: 'success'
            })       
            setInput({
                name: ''
            })
        }
    }

    console.log(input)
    // return(
    //     <div>
    //         <h1>Modifica una Categoria</h1>
    //             <form onSubmit={(e) => handleSubmit(e)}>
    //                 <div>
    //                     <label>Nombre</label>
    //                     <input 
    //                      type='text'
    //                      value={input.name}
    //                      name='name'
    //                      onChange={handleChange}
    //                     />
    //                     {errors.name && (
    //                         <p>{errors.name}</p>
    //                     )} 
    //                 </div>
    //                 <button type='submit'>Modificar categoria</button>
    //             </form>
    //             <Link to='/products'>
    //                 <button>Volver</button>
    //             </Link>
    //     </div>)

    return(
        <div className={classes.root}>
        <div className={classes.card}>
            <Typography variant="h6" gutterBottom >
                Modificar una categoria
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={8}>
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
                </Grid>
                    <div className={classes.buttonsDiv}>        
                        <Button  variant="contained" className={classes.button} 
                        color="secondary" type='submit'>Modificar categoria</Button>
                    </div> 
            </form>
        </div>     
        <Notification
            notify={notify}
            setNotify={setNotify}
        />
        </div>
        
        )
}