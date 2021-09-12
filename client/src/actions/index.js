import axios from 'axios';
import { URL } from '../utils/constants';

export function getProducts() {
    return async function (dispatch) {
        try {
            const prod = await axios.get('/product/');
            return dispatch ({
                type: 'GET_PRODUCTS',
                payload: prod.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getProductsByName(payload) {
    return async function(dispatch) {
        try {
            const prodsByName = await axios.get('/product/search/' + payload);
            console.log(prodsByName);
            return dispatch ({
                type: 'GET_PRODUCTS_BY_NAME',
                payload: prodsByName.data 
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getCategories() {
    return async function (dispatch) {
        try {
            const categories = await axios.get('/category');
            return dispatch ({
                type: 'GET_CATEGORIES',
                payload: categories.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postProducts(payload){
    return async function (dispatch){
        try{
        const aux = await axios.post('/product', payload);
        return aux
        } catch (error){
            console.log(error)
        }
        
    }
    
}

export function modifyProducts(id, payload){
    return async function (dispatch){
        try{
        const aux = await axios.patch('/product/' + id, payload);
        return aux
        } catch (error){
            console.log(error)
        }
        
    }
    
}

export function postStore(payload){
    return async function (dispatch){
        try{
        const aux = await axios.post('/store', payload);
        return aux
        } catch (error){
            console.log(error)
        }
        
    }
    
}

export function getProductDetail(id) {
    return async function(dispatch) {
        try {
            const prodDet = await axios.get('/product/' + id);
            console.log(prodDet)
            return dispatch({
                type: 'GET_PRODUCT_DETAIL',
                payload: prodDet.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getFilterProducts (payload) {
    return {
        type: 'FILTER_PRODUCTS',
        payload      
    } 
}

export function page(payload) {
    return {
        type: 'PAGE',
        payload
    }
}
//---------LOGING USER ----------------------
export function signIn(userInfo) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
              email: userInfo.email,
              password: userInfo.password
            },
            withCredentials: true,
            url: "/signin"
          })
          .then((res) => {
            console.log("[ACTION]RES SINGIN: ", res.data)
            dispatch({
                type: "SIGN_IN",
                payload: res.data
            })
          })
    }
}

export function signInGoogle() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "/google/auth"
          })
          .then((res) => {
            console.log("[ACTION]RES SINGIN: ", res.data)
            dispatch({
                type: "SIGN_IN",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function signUp(userInfo) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                email: userInfo.email,
                password: userInfo.password
            },
            withCredentials: true,
            url: "/signup"
          })
          .then((res) => {
            console.log("[ACTION]RES SINGUP: ", res.data)
            dispatch({
                type: "SIGN_UP",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function checkUser() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "/signin"
          })
          .then((res) => {
              console.log("[ACTION]RES CHECKUSER: ", res.data.first_name)
            dispatch({
                type: "CHECK_USER",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function logOut() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "/logout"
          })
          .then((res) => {
              console.log("[ACTION]RES LOGOUT: ", res)
            dispatch({
                type: "LOG_OUT",
                payload: res.data
            })
          })
    }
}
//--------CART--------
export function addProductToCart(id, value) {
    console.log("ENTRA CON: ", id, value)
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                idProduct: id,
                valueProduct: value,
            },
            withCredentials: true,
            url: "/cart/addProduct"
          })
          .then((res) => {
              console.log("ENTRO AL ACTION")
            dispatch({
                type: "ADD_PRODUCT_TO_CART",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function removeProductFromCart(id, value) {
    return function(dispatch) {
        return axios({
            method: "delete",
            data: {
                idProduct: id,
                valueProduct: value,
            },
            withCredentials: true,
            url: "/cart/removeProduct"
          })
          .then((res) => {
            console.log("REMOVE PRODUCT: ", res.data)
            dispatch({
                type: "REMOVE_PRODUCT_FROM_CART",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function getCartByUser() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "/cart"
          })
          .then((res) => {
              console.log("GET CART: ", res.data)
            dispatch({
                type: "GET_CART_BY_USER",
                payload: res.data
            })
          })
    }
}

export function guestCartToUserCart(guestCart) {
    console.log("[guestCartToUserCart] 1")
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                guestCart: guestCart
            },
            withCredentials: true,
            url: "/cart/fromGuest"
          })
          .then((res) => {
            console.log("[guestCartToUserCart] 2")
              console.log("GUEST CART TO USER: ", res.data)
            dispatch({
                type: "GUEST_CART_TO_USER_CART",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}
export  function postOrder (data){
    return async function  (dispatch){
        console.log("ENTRA CON: ", data)
        try{
            var userShip =  await axios({
            method:"post",
            url:"http://localhost:3001/order/newOrder",
            data:data,
            withCredentials: true
        }
            )
            console.log("LLEGO CON ", userShip.data)
        dispatch({
            type:"POST_ORDER",
            payload: userShip.data
        })
    }
        catch(err){
            console.log("ERROR")
            console.log(err)
        }
    }
}
//----------WISHLIST----------
export function addFav(id) {
    console.log("ENTRA CON: ", id)
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                idProduct: id
            },
            withCredentials: true,
            url: "/favourites"
          })
          .then((res) => {
              console.log("ENTRO AL ACTION", res.data)
            dispatch({
                type: "ADD_FAV",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function addFavStorage (id){
    return async (dispatch) => {
        return dispatch({
            type:"ADD_FAV_STORE", 
            payload: id
        })
    }
}


export function getFav() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "/favourites"
          })
          .then((res) => {
              console.log("GET_FAV: ", res.data)
            dispatch({
                type: "GET_FAV",
                payload: res.data
            })
          })
    }
}
export function deleteFav(id) {
    return function(dispatch) {
        return axios({
            method: "delete",
            data: {
                idProduct: id
            },
            withCredentials: true,
            url: "/favourites"
          })
          .then((res) => {
            console.log("REMOVE PRODUCT: ", res.data)
            dispatch({
                type: "DELETE_FAV",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function deleteFavStorage(id){
    return async (dispatch) => {
        return dispatch({
            type: "DELETE_FAV_STORE",
            payload: id
        })
    }
}
//------REVIEWS------
export async function getReviews(){
    const response = await axios.get('http://localhost:3001/reviews');
    return { type: GET_VISIBLES_FEEDBACKS, payload: response.data };
}
export function allowRev(flag) {
    return {type: ALL_REV, payload: flag}
  }
//   export const createProductReview = (productId, review) => async (
//     dispatch,
//     getState
//   ) => {
//     try {
//       dispatch({
//         type: PRODUCT_CREATE_REVIEW_REQUEST,
//       })
  
//       const {
//         userLogin: { userInfo },
//       } = getState()
  
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }
  
//       await axios.post(`/api/products/${productId}/reviews`, review, config)
  
//       dispatch({
//         type: PRODUCT_CREATE_REVIEW_SUCCESS,
//       })
//     } catch (error) {
//       dispatch({
//         type: PRODUCT_CREATE_REVIEW_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }