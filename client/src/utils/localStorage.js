//FAVORITOS
//traigo los favoritos  
export function getWishListLocalStorage() {
    const data = window.localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
}
 //muestro 
export function setWishListLocalStorage(wishlist) {
    window.localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// const handleCartClick = (name, price, image, id) => {
//     let historial = [];

//       let detail ={name, price, image, _id :id}
//       console.log("data",detail)
//     if(!localStorage.getItem('history')) {
//         historial.push(detail);
//         localStorage.setItem('history', JSON.stringify(historial));
//     } else {
//         historial = JSON.parse(localStorage.getItem('history'));

//          if(!historial.some(p=> detail._id == p._id) ) {
//           historial.push(detail);
//          }

//         localStorage.setItem('history', JSON.stringify(historial));
//     }
    
//     //console.log(JSON.parse(localStorage.getItem('history')))
// }