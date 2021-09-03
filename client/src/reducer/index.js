import axios from 'react'

const initialState = {
    products : [],
    categories: [],
    user: {},
    //categories: [],
    prodDetail: [],
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
        case 'SIGNUP':
                return {
                    ...state,
                    user: action.payload,
                };
        case 'SIGNIN':
                return{
                    ...state, 
                    user: action.payload
                }   
        case 'LOG_OUT':
                return{
                    ...state, 
                    user:{}
                }
        case 'GET_PRODUCT_DETAIL':
            return {
                ...state,
                prodDetail: action.payload
            }
        default: return state;
        }
}

export default rootReducer;