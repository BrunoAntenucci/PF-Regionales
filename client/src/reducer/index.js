import axios from 'react'

const initialState = {
    products : [],
    categories: [],
    prodDetail: [],
    log: false,
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
                log: false
            }
        case 'GET_USER':
            return {
                ...state,
                log: true,
              user:{}
            }


        case 'POST_PRODUCT':            
                return {
                    ...state,
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
         default: return state;
        }
}

export default rootReducer;