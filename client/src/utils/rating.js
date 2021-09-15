import React from 'react'
import {FaStar} from 'react-icons/fa';
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
                                  {/* {review.rating.forEach((el)=>{
                                   return(
                                    <div>
                                       {el.stars.map((e) => (
                                      <FaStar
                                      color="f8e825"
                                      />))}
                                    </div> 
                                   )

                                  })} */}
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
  
// import React from 'react'
// // import PropTypes from 'prop-types'

// const Rating = ({ value, text, color }) => {
//   return (
//     <div className='rating'>
//       <span>
//         <i
//           style={{ color }}
//           className={
//             value >= 1
//               ? 'fas fa-star'
//               : value >= 0.5
//               ? 'fas fa-star-half-alt'
//               : 'far fa-star'
//           }
//         ></i>
//       </span>
//       <span>
//         <i
//           style={{ color }}
//           className={
//             value >= 2
//               ? 'fas fa-star'
//               : value >= 1.5
//               ? 'fas fa-star-half-alt'
//               : 'far fa-star'
//           }
//         ></i>
//       </span>
//       <span>
//         <i
//           style={{ color }}
//           className={
//             value >= 3
//               ? 'fas fa-star'
//               : value >= 2.5
//               ? 'fas fa-star-half-alt'
//               : 'far fa-star'
//           }
//         ></i>
//       </span>
//       <span>
//         <i
//           style={{ color }}
//           className={
//             value >= 4
//               ? 'fas fa-star'
//               : value >= 3.5
//               ? 'fas fa-star-half-alt'
//               : 'far fa-star'
//           }
//         ></i>
//       </span>
//       <span>
//         <i
//           style={{ color }}
//           className={
//             value >= 5
//               ? 'fas fa-star'
//               : value >= 4.5
//               ? 'fas fa-star-half-alt'
//               : 'far fa-star'
//           }
//         ></i>
//       </span>
 
//     </div>
//   )
// }

// Rating.defaultProps = {
//   color: '#f8e825',
// }

// // Rating.propTypes = {
// //   value: PropTypes.number.isRequired,
// //   text: PropTypes.string.isRequired,
// //   color: PropTypes.string,
// // }

// export default Rating;