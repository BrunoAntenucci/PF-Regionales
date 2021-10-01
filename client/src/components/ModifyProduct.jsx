import React from 'react';
import { useEffect } from 'react';
import { getCategories, getProductDetail, clearProDetail } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import ModifyProducts2 from "./ModifyProduct2"

export default function ModifyProduct(props){
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetail(props.match.params.id));
    dispatch(getCategories());
    return ()=>{
      document.title = "E-Market"
      dispatch(clearProDetail())
  }
  }, [dispatch, props.match.params.id])
    const detail = useSelector((state) => state.prodDetail);
    const categories = useSelector((state) => state.categories)
    
    return (
      <div>
        {detail.product ? <ModifyProducts2 details={detail} categories={categories}/> : <h1>cargando</h1>}
      </div>
    )
}