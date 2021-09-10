import axios from 'axios';

export function getProducts() {
    return async function (dispatch) {
        try {
            const prod = await axios.get('http://localhost:3001/product/');
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
            const prodsByName = await axios.get('http://localhost:3001/product/search/' + payload);
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
            const categories = await axios.get('http://localhost:3001/category');
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
        const aux = await axios.post('http://localhost:3001/product', payload);
        return aux
        } catch (error){
            console.log(error)
        }
        
    }
    
}

export function modifyProducts(id, payload){
    return async function (dispatch){
        try{
        const aux = await axios.patch('http://localhost:3001/product/' + id, payload);
        return aux
        } catch (error){
            console.log(error)
        }
        
    }
    
}

export function postStore(payload){
    return async function (dispatch){
        try{
        const aux = await axios.post('http://localhost:3001/store', payload);
        return aux
        } catch (error){
            console.log(error)
        }
        
    }
    
}

export function getProductDetail(id) {
    return async function(dispatch) {
        try {
            const prodDet = await axios.get('http://localhost:3001/product/' + id);
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

export function page(payload) {
    return {
        type: 'PAGE',
        payload
    }
}

export function signIn(userInfo) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
              email: userInfo.email,
              password: userInfo.password
            },
            withCredentials: true,
            url: "http://localhost:3001/signin"
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
            url: "http://localhost:3001/google/auth"
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
            url: "http://localhost:3001/signup"
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
            url: "http://localhost:3001/signin"
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

export function getFilterProducts (payload) {
    return {
        type: 'FILTER_PRODUCTS',
        payload      
    } 
}

export function logOut() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/logout"
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
            url: "http://localhost:3001/cart/addProduct"
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
            url: "http://localhost:3001/cart/removeProduct"
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
            url: "http://localhost:3001/cart"
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
            url: "http://localhost:3001/cart/fromGuest"
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
            url:"localhost:3001/order/newOrder",
            data:data,
            headers: { "Content-Type": "application/json" },
            
        }
            )
            console.log("LLEGO CON ", userShip)
        dispatch({
            type:"POST_ORDER",
            payload:userShip
        })
    }
        catch(err){
            console.log(err)
        }
    }
}
// localhost:3001/shipInfo/user/