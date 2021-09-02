const initialState = {
    products : [],
    user: {}
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
        case 'SIGNUP':
            return {
                ...state,
                user: action.payload,
            };
        default: return state;
        }
    }



export default rootReducer;