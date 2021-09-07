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

export function signUp(firstname, lastname, email, password) {
    return async function (dispatch) {
      try {
        const response = await axios.post("http://localhost:3001/signup", {
          firstname,
          lastname,
          email,
          password,
        });
        dispatch({ type: 'SIGNUP', payload: response.data});
        return "Account created";
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error.response.data.message);
          return error.response.data.message;
        }
      }
    };
}

export const loginUser = (email, password) => {
	return async function (dispatch){
        try{
            const response = await axios.post("http://localhost:3001/signin",{
                email, password
            })
            if(response.data){
                await dispatch({
                    type: 'SIGNIN',
                    payload: {
                        email: response.data.email,
                        password: response.data.password
                    }
                })
                return 'Logged in succesfully'
            } else {
                return response.data.message
            }
        }
        catch(error){
            console.log(error)
        }
	};
};

export function isUser(userInfo) {
    return function (dispatch) {
        return axios.post("http://localhost:3001/signin", userInfo)
            .then((response) => {
                dispatch({
                    type: "GET_USER_INFO",
                    payload: response.data
                })
            })
    }
}; 

export function userCheck() {
    return function(dispatch) {
        return axios.get("http://localhost:3001/signin")
            .then((result) => {
                dispatch({
                    type: "USER_CHECK",
                    payload: result.data
                })
            })
    }
}

export function logOut() {
    return async function (dispatch){
        const response = await axios.get("http://localhost:3001/logout");
        dispatch({type: 'LOG_OUT', payload: response.data})
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
