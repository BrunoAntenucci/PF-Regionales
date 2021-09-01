import React from 'react';
import Header from './Header';
import { getProducts } from '../actions/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';

 

  
function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])


    return (
      
        <div>
            <Header />
            <div>
            {
                allProducts?.map(p => { return(
                  <Card                    
                  title= {p.title}
                  price={p.price}
                  category={p.category}
                  image={p.image}
              />
                   
                )})
            }
            </div>
        </div>
       
    )
}

export default Home
