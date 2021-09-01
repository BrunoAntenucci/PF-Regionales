import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/index';
import Card from './Card';

function Products() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return (
        <div>
            {
                allProducts?.map(p => {
                    return (
                        <div>     
                            <Card                    
                                name= {p.title}
                                price={p.price}
                                category={p.category}
                                image={p.image}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Products
