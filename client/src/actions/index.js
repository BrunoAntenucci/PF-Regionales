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

