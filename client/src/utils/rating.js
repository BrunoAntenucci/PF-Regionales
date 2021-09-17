import React from 'react'

import { useSelector } from 'react-redux';

const Rating = ({reviews}) => {
  // store = [
  //   {id, 
  //   city, 
  //   reviews: [
  //     {nombre, rating},
  //     {}]},
  //   {},
  //   {}
  // ]
//  hago un for in buscando la propiedad y después se la paso a stars

  // let stars = [];
  // for (let i = 0; i <= rating; i++) {
  //   stars.push(i);
  // }
 
  const stores = useSelector(state => state.stores);
  const store = stores.map((el) => {
    return el.reviews
  })
  const numberRating = store.map(el => {
    return el.rating
  })
  console.log(numberRating)
  
  // console.log(stars, 'stars')
  // console.log(rating, 'repuu')

  return (
    <div>
      {stores.map(store => {
                    return(
                        <>
                        {store.reviews.map(review => {
                            return(
                                <div>
                                  <p>{review.rating}</p>
                                </div>
                            )
                        })}
                        </>
             ) } )           
        }                
    </div>
  )
}

export default Rating;
  
