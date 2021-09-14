import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, postStore } from '../actions';
import { useDispatch, useSelector } from 'react-redux';


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

export default function ProductCreation(){
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



    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const products = useSelector((state) => state.products)


    function handleProducts(e){
        if (input.products.includes(e.target.value)) {
          alert("Producto repetido, prueba con otro!");                
          
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
        if(errors.name || errors.description || errors.city) {
            e.preventDefault();
            alert('Form incomplete');
        }else{
            e.preventDefault();   
            dispatch(postStore(input));
            alert('Store created');     
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
        <div>
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
                    
                    <div>
                        <label>Imagen</label>
                        <input
                        type='text'
                        value={input.img}
                        name='img'
                        onChange={handleChange}
                        />
                        {errors.reputation && (
                            <p>{errors.img}</p>
                        )}

                    </div>

                    <button type='submit'>Crear Tienda</button>
                </form>
                        <ul >{input.products.map(e => {
                            const aux = products.find(i => i._id === e)
                            return <div style={{display:'flex', flexDirection:'row'}}>
                                        <p>{aux.name}</p>
                                        <button onClick={() => handleClose(e)}>x</button>
                                   </div>
                        })}</ul>
                       
                <Link to='/'>
                    <button>Volver</button>
                </Link>
        </div>)
    }




    