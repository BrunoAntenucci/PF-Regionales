import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postProducts } from '../actions';
import { useDispatch } from 'react-redux';

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
    //if(!input.category){
    //    errors.category = 'Se requiere una categoria';
    //}
    if(!input.quantity){
        errors.quantity = 'Se requiere una cantidad';
    }
    if(!input.image){
        errors.image = 'Se requiere una imagen';
    }
    return errors
}

export default function ProductCreation(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [ errors, setErrors ] = useState({});

    const [ input, setInput ] = useState({
        name: '',
        description: '',
        price: '',
        //category:'',
        quantity: '',
        image: '',
    });

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
        if(!errors.name) {
        e.preventDefault();
        dispatch(postProducts(input));
        alert('Product created');
        setInput({
            name: '',
            description: '',
            price: '',
            //category:'',
            quantity: '',
            image: '',
        })
        history.push('/')
        }else{
        e.preventDefault();
        alert('Form incomplete');
        }
    }

    return(
        <div>
            <h1>Crear Un Nuevo Producto</h1>
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
                        <label>Precio</label>
                        <input
                        type='text'
                        value={input.price}
                        name='price'
                        onChange={handleChange}
                        />
                        {errors.price && (
                            <p>{errors.price}</p>
                        )}
                    </div>
                    {/*<div>
                        <label>Category</label>
                        <input
                        type='text'
                        value={input.category}
                        name='category'
                        onChange={handleChange}
                        />
                        {errors.category && (
                            <p>{errors.category}</p>
                        )}
                    </div>*/}
                    <div>
                        <label>Cantidad</label>
                        <input
                        type='number'
                        value={input.quantity}
                        name='quantity'
                        onChange={handleChange}
                        />
                        {errors.quantity && (
                            <p>{errors.quantity}</p>
                        )}

                    </div>
                    <div>
                        <label>Imagen</label>
                        <input
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={handleChange}
                        />
                        {errors.image && (
                            <p>{errors.image}</p>
                        )}
                    </div>
                    <button type='submit'>Crear Producto</button>
                </form>
                <Link to='/'>
                    <button>Volver</button>
                </Link>
        </div>
    ) 
}