import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getCategories, postProducts } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

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
    const dispatch = useDispatch();
    //const history = useHistory();
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
        setInput({
            ...input,
            category: [...input.category, e.target.value]
        })
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

    function handleSubmit(e){
        if(!errors.name || !errors.description || !errors.price || !errors.category || !errors.quantity || !errors.image) {
        e.preventDefault();   
        dispatch(postProducts(input));
        alert('Product created');     
        setInput({
            name: '',
            description: '',
            price: '',
            category: [],
            quantity: 0,
            image: '',
        })
        console.log(input)

        //history.push('/')
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
                    <div>
                        <select onChange={handleCategories}>
                            {
                                categories.map((e) => 
                                <option value={e._id}>{e.name}</option>
                                )
                            }
                        </select>
                        <ul>{input.category.map(e => {
                            const aux = categories.find(i => i._id === e)
                            return <p>{aux.name}</p>
                        })}</ul>
                    </div>
                    {/* <div>
                        <select onChange={handleCategories}>
                            {
                                categories.map((e) => 
                                <option value={e._id}>{e.name}</option>
                                )
                            }
                        </select>
                        <ul>{input.category.map(e => <li>{e}</li>)}</ul>
                    </div> */}
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