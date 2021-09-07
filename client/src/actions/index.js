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
              console.log("[ACTION]RES CHECKUSER: ", res.data)
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
