const initialState = {
    products : [],
    categories: [],
    prodDetail: [],
    log: false,
    page: 1,
    user: {},
    categ: [],
    allProducts: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                allProducts: action.payload,
                // page: 1
                
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
              user:action.payload
            }
        case 'GUEST_CHECK':
            return{
                ...state, 
                user: action.payload
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
        case 'FILTER_PRODUCTS':
            var allProducts = state.allProducts;
            var productByCategory = []
            if( action.payload !== ''){
                for (var i=0; i<allProducts.length; i++) {
                for (var j=0; j<allProducts[i].category.length; j++) {
                    if (allProducts[i].category[j].name === action.payload) {
                    productByCategory.push(allProducts[i])
                    }
                }
                }
            }else{
                productByCategory = allProducts
            }
            return {
                ...state, 
                products: productByCategory

            }
         default: return state;
        }
}


export default rootReducer;


