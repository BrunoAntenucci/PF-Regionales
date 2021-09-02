import axios from 'axios';

export function getProducts() {
    return async function (dispatch) {
        try {
            const prod = await axios.get('https://fakestoreapi.com/products/');
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
            const prodsByName = await axios.get('https://fakestoreapi.com/products?name=' + payload);
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
        dispatch({ type: SIGNUP, payload: response.data});
        return "Account created";
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error.response.data.message);
          return error.response.data.message;
        }
      }
    };
  }
export const loginUser = (user) => {
	return {
		type: 'LOGIN_USER',
		payload: user
	};
};