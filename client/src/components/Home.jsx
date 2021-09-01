import React from 'react';
import Header from './Header';
import { getProducts } from '../actions/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])


    return (
        <div>
            <Header />
            {
                allProducts?.map(p => { return(
                    <div key={p.id}>
                    <p>{p.title}</p>
                    <p>Price: {p.price}</p>
                    <p>Category: {p.category}</p>
                    {p.image}
                    </div>
                )})
            }
        </div>
    )
}

export default Home
