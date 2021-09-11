import { getWishListLocalStorage, setWishListLocalStorage } from '../utils/localStorage';

const initialState = {
    products : [],
    categories: [],
    prodDetail: [],
    page: 1,

    user: {},
    categ: [],
    allProducts: [],
    mercData:{},
    user: false,
    guest: {},
    wishlist: getWishListLocalStorage(),
    cart: {},
    stores: []

}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload,

                allProducts: action.payload,
                // page: 1
                

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
            case 'GET_STORES':
            return {
                ...state,
                stores: action.payload
            }
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
     

        case "CHECK_USER":
            return {
                ...state,
                user: action.payload
            }
        
        case "GET_CART_BY_USER":
            return {
                ...state,
                cart: action.payload
            }
            case "POST_ORDER":
                const obj = {
                    preference_id: action.payload.body.id,
                    client_id: action.payload.body.client_id,
                    collector_id: action.payload.body.collector_id,
                    init_point: action.payload.body.init_point
                }
                return {
                    ...state,
                    mercData: obj
                }
        default: return state;

        }
}


export default rootReducer;


