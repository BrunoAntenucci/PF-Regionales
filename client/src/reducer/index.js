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
    // user: false,
    guest: {},
    wishlist: {},
    cart: {},
    reviews: false
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
        case "GET_FAV":
            return {
                ...state,
                wishlist: action.payload
            }
        // case "ADD_FAV":
        //     const addProd = state.wishlist.find((e)=>
        //          e.product._id === action.payload)
        //     return{
        //         ...state, 
        //         wishlist: state.wishlist.concat(addProd)
        //     }          
        // case "ADD_FAV":
        //     const findProd = state.products.find(
        //         (e) => e.product._id === action.payload);
        //     const addFav = findProd && state.wishlist.concat(findProd);
        //     // findProd && setWishListLocalStorage(addFav)
        //     return {
        //         ...state, 
        //         wishlist: addFav
        //     }
        case "DELETE_FAV":
            const deleteFav = state.products.filter(
                (e) => e.product._id !== action.payload);
                // setWishListLocalStorage(deleteFav)
            return {
                ...state, 
                wishlist: deleteFav
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
        case "ALL_REV": {
            return {
                ...state,
                reviews: action.payload,
            }
        }
        default: return state;
        }
}

export default rootReducer;
// export const productReviewCreateReducer = (state = {}, action) => {
//     switch (action.type) {
//       case PRODUCT_CREATE_REVIEW_REQUEST:
//         return { loading: true }
//       case PRODUCT_CREATE_REVIEW_SUCCESS:
//         return { loading: false, success: true }
//       case PRODUCT_CREATE_REVIEW_FAIL:
//         return { loading: false, error: action.payload }
//       case PRODUCT_CREATE_REVIEW_RESET:
//         return {}
//       default:
//         return state
//     }
//   }