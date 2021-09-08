//MIS COMPRAS
export function getCartLocalStorage() {
    const data = window.localStorage.getItem("cart");
    return data ? JSON.parse(data) : []; //parse para pasarlo a objeto
}
  
export function setCartLocalStorage(product) {
    window.localStorage.setItem("cart", JSON.stringify(product));
}

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