import axios from 'react'

const initialState = {
    products : []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload
                
            }       
        case 'GET_PRODUCTS_BY_NAME':
            return {
                ...state,
                products: action.payload
            }
        case 'POST_PRODUCT':
            const payload = action.payload
            const response = axios.post('https://localhost:3001/product', payload);
                return {
                    ...state,
                    products: response
                }
        default: return state;
        }

    }



export default rootReducer;