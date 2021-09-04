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

export function logOut() {
    return function (dispatch) {
      dispatch({ type: 'LOG_OUT' });
    };
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

export function page (payload) {
    return {
        type: 'PAGE',
        payload
    }
}