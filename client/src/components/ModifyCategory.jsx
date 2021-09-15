import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getCategoryToModify, modifyCategory } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre';
    }
    
    return errors
}

export default function ModifyCategory(props){

    console.log('PROPS', props)

    const dispatch = useDispatch();

    const [ errors, setErrors ] = useState({});

    useEffect(() => {
        //dispatch(getCategories());
        dispatch(getCategoryToModify(props.match.params.id));
    }, [])

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
            alert('Form incomplete');
        }else{
            e.preventDefault();   
            dispatch(modifyCategory(input._id, input));
            alert('Category modified');     
            setInput({
                name: ''
            })
        }
    }

    console.log(input)
    return(
        <div>
            <h1>Modifica una Categoria</h1>
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
                    <button type='submit'>Modificar categoria</button>
                </form>
                <Link to='/products'>
                    <button>Volver</button>
                </Link>
        </div>)
}