const initialState = {
    products : [],
    categories: [],
    prodDetail: [],
    page: 1,
    user: false,
    guest: {}
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

        // case 'SIGNUP':
        //     return {
        //         ...state,
        //         user: action.payload,
        //     };
        // case 'SIGNIN':
        //     return{
        //         ...state, 
        //         user: action.payload
        //     }   
        // case 'LOG_OUT':
        //     return{
        //         ...state, 
        //         log: false
        //     }
        // case 'GET_USER':
        //     return {
        //         ...state,
        //       user:action.payload
        //     }
        // case 'USER_CHECK':
        //     return{
        //         ...state, 
        //         user: action.payload
        //     }

        case "SIGN_IN": 
            return {
                ...state,
                user: action.payload
            }
        case "SIGN_UP":
            return {
                ...state,
            }
        case "LOG_OUT":
            return {
                ...state
            }
        case "CHECK_USER":
            return {
                ...state,
                user: action.payload
            }

        default: return state;
        }
}

export default rootReducer;