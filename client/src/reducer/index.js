const initialState = {
    products : [],
    categories: [],
    prodDetail: [],
    page: 1
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