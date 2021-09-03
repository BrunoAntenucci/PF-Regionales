import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductDetail } from '../actions/index';

function ProductDetail(props) {

    console.log(props)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProductDetail(props.match.params.id));
    },[dispatch, props.match.params.id]);
    
    const detail = useSelector((state) => state.prodDetail);
    console.log(detail)



    return (
        <div>
            {
                detail.product?.map(p => {
                    return (
                        <div>    
                            name= {p?.name}
                            description={p.description}
                            price={p.price}
                            category={p.category.name}
                            image={p.image}        
                        </div>
                    )
                })
            }
        </div>
    )
  
}

export default ProductDetail
