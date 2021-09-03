import axios from 'react'

const initialState = {
    products : [],
    categories: []
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
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }

        case 'POST_PRODUCT':            
                return {
                    ...state,
            }
            
        default: return state;
        }

    }



export default rootReducer;