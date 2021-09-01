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