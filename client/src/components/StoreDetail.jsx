import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getStoreById, getProducts } from '../actions'
import FavCard from '../components/FavCard'
import Card from '../components/Card'
import Reviews from '../components/Reviews'


export default function StoreDetail(props){
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.storeDetail);
    console.log(detail, 'DETAIL')

    const categories = useSelector((state) => state.categories);
    const products = useSelector((state) => state.products);

    const ownProducts = products.filter(e => detail.products.includes(e._id) ? e : null);

    console.log(ownProducts, 'OWN')

    useEffect(()=> {
        dispatch(getStoreById(props.match.params.id));
        dispatch(getProducts())
    }, [dispatch, getStoreById])

    return (
        <div>
            <h1>{detail.name}</h1>
            <h2>{detail.description}</h2>
            <h3>{detail.address}</h3>
            <h3>{detail.city}</h3>
            <h3>Reputacion: {detail.reputation}</h3>
            <div>{ownProducts.map((e) => <Card
                                            name= {e?.name}
                                            price={e?.price}
                                            quantity={e?.quantity}
                                            category={e?.category?.map((el, k) => {
                                                const aux = categories.find(i => i._id === el)
                                                return <p key={k}>{aux?.name}</p>
                                                    })}
                                            image={e?.image }
                                            id={e?._id}/>
                )}
            </div>

            <div>
                <Link to={`/modifystore/${detail.id}`}>Editar tienda</Link>
            </div>
            {/* <div>
                <Link to={`/store/${detail.id}/reviews`}>Reviews</Link>
            </div> */}
        </div>
    )

}
