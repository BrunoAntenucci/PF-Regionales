
const initialState = {
    products : [],
    categories: [],
    prodDetail: [],
    catDetail: [],
    page: 1,
    user: {},
    categ: [],
    allProducts: [],
    mercData:{},
    // user: false,
    guest: {},
    wishlist: [],
    cart: {},
    stores: [],
    orderDetail: [],
    store:{},
    reviews: []
    
    
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload,

                allProducts: action.payload,
                // page: 1
                

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
        case 'POST_PRODUCT':            
            return {
            ...state,
            }
        case 'GET_PRODUCT_DETAIL':
            return {
                ...state,
                prodDetail: action.payload
            }
        case  'GET_CATEGORY_TO_MODIFY':
            return {
                ...state,
                catDetail: action.payload
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

            case 'GET_ORDER_DETAIL':
            return {
                ...state,
                orderDetail: action.payload
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
                 
        case "ADD_FAV":
            return {
                ...state, 
                wishlist: state.wishlist.concat(action.payload)
            }
      
        case "DELETE_FAV":
            return {
                ...state, 
                wishlist: state.wishlist.filter((w) => w.id !== action.payload)
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
        case "CREATE_REVIEW":
            
            return{
                ...state,
                //reviews: [...state.reviews, action.payload[0],]
                 reviews: action.payload
                // reviews: state.reviews.concat(action.payload)
            }
        case "GET_STORE":
            return{
                ...state, 
                store: action.payload
            }    
               
        default: return state;
        }
}

export default rootReducer;
