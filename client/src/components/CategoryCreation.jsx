import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postCategory } from '../actions';
import { useDispatch } from 'react-redux';


function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre';
    }
    
    return errors
}

export default function CategoryCreation(){

    const dispatch = useDispatch();

    const [ errors, setErrors ] = useState({});

    const [ input, setInput ] = useState({
        name: '',
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
        if(errors.name) {
            e.preventDefault();
            alert('Formulario incompleto');
        }else{
            e.preventDefault();   
            dispatch(postCategory(input));
            alert('Categoria creada');     
            setInput({
                name: ''
            })
        }
    }

    console.log(input)
    return(
        <div>
            <h1>Crear una nueva Categoria</h1>
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
                    <button type='submit'>Crear categoria</button>
                </form>
                <Link to='/'>
                    <button>Volver</button>
                </Link>
        </div>)
}

