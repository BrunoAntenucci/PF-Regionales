import axios from 'react'

const initialState = {
    products : [],
    categories: [],
    prodDetail: [],
    page: 1,
    user: {},
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                page: 1
                
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
        case 'PAGE': 
            return {
                ...state,
                page: action.payload
            }
        case "LOG_OUT_MATI":
            return {
                ...state
            }
        case "SIGN_UP_MATI": 
            return {
                ...state
            }
        case "SIGN_IN_MATI": 
            return {
                ...state
            }
        case "GUEST_CHECK":
            return action.payload
         default: return state;
        }
}

export default rootReducer;