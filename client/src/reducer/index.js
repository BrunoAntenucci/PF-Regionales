const initialState = {
    products : [],
    user: {},
    categories: [],
    prodDetail: [],
    log: false

}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload
                
            }
        
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
        }
        
        case 'GET_PRODUCTS_BY_NAME':
            return {
                ...state,
                products: action.payload
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
                log: true
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