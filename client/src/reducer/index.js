import { getWishListLocalStorage, setWishListLocalStorage } from '../utils/localStorage';

const initialState = {
    products : [],
    categories: [],
    prodDetail: [],
    page: 1,
    user: false,
    guest: {},
    wishlist: getWishListLocalStorage()
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
        case "ADD_FAV":
            const findProd = state.products.find(
                ({product: {_id}}) => _id === action.payload
            );
            const addFav = findProd && state.wishlist.concar(findProd);
            findProd && setWishListLocalStorage(addFav)
            return {
                ...state, 
                wishlist: addFav
            }
        case "DELETE_FAV":
            const deleteFav = state.products.filter(
                (e) => e.product._id !== action.payload);
                setWishListLocalStorage(deleteFav)
            return {
                ...state, 
                wishlist: deleteFav
            }    
        default: return state;
        }
}

export default rootReducer;