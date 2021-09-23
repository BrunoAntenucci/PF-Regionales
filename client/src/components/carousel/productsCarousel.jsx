import React, { Fragment }  from 'react';
// import Header from './Header';
import { getProducts, getCategories } from '../../actions/index';
import { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card';
import { makeStyles,Typography ,Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
// import NoHistory from '../img/no-history.svg';
// import Rating from '../utils/rating';
import {FaStar} from 'react-icons/fa';
// import { getStore } from '../actions';
// import stores from '../img/stores.svg';
import Grid from '@material-ui/core/Grid';
// import Footer from './Footer';
import styled from 'styled-components'
import Box from '@material-ui/core/Box';
import Slider from "react-slick";
import ArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

const ImageContainer = styled.image`
z-index:9000;
margin: 0.5rem;
`



export default function ProductSlider() {
     const dispatch = useDispatch();
    // const userData = useSelector(state => state.user.userData);
    const products = useSelector(state => state.products);
    const categories = useSelector((state) => state.categories);
    useEffect(() => {
        dispatch(getProducts());
        // dispatch(getStore());
    }, [dispatch])

    const filterProductsByCat = () => {
        var arr = []
        for (let i = 0; i < 10; i++) {
          
            arr.push(products[i])
          
          
        }
        return arr
    }

const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <ArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <ArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    // infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    dots: true,
    centerMode: true,
    centerPadding: '0px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };


  var historyProducts = JSON.parse(localStorage.getItem("historyProducts"))
  if(historyProducts){
      
      historyProducts = historyProducts.reverse()

  }
  console.log('hisotry!!'+historyProducts)
  const HandleHistoryOnClick=(name,price,category,image,id,quantity)=>{
   var historyArray= [];
   
   
  // var historyArraySTringify = JSON.stringify(historyArray)
   if(!localStorage.getItem("historyProducts")){
       historyArray.push({name,price,category,image,id,quantity })
       localStorage.setItem("historyProducts", JSON.stringify(historyArray))
   }else{
       historyArray = JSON.parse(localStorage.getItem("historyProducts"))
       if(historyArray.some(e => e.id === id)) {
           historyArray = historyArray.filter(e => e.id!==id)
       }
       historyArray.push({name,price,category,image,id, quantity })
       
       localStorage.setItem("historyProducts", JSON.stringify(historyArray))
   }
  
 
   
   console.log( JSON.parse(localStorage.getItem("historyProducts")))
}    

  return (
    <div className="SliderContainer">
      <Slider {...settings}>
        {filterProductsByCat().map((p, i) =>  {
                    return (
                      
                        <Fragment key={i} >              
                                    <Grid >     
  
                                    <div 
                                    onClick={() => {HandleHistoryOnClick(
                                       
                                        p?.name,
                                        p?.price,
                                        p?.category,
                                        p?.image,
                                        p?._id,
                                        p?.quantity
                                        )}}
                                        >
                                       
  
                                            <h3>{p?.id}</h3>
                                                <Card                    
                                                    name= {p?.name}
                                                    price={p?.price}
                                                    quantity={p?.quantity}
                                                    category={p?.category?.map((e, k) => {
                                                        const aux = categories.find(i => i._id === e)
                                                        return <p key={k}>{aux?.name}</p>
                                                    })}
                                                    image={p?.image }
  
                                                    id={p?._id}
                                                    
                                                    />
                                       </div>
  
                                    </Grid>
                                
                            
                        </Fragment>
                    )}
                )}
      </Slider>
    </div>
  );
}

 