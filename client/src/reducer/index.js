
const initialState = {
    products : [],
    prodDetail: [],
    allProducts: [],
    
    categories: [],
    catDetail: [],
    categ: [],
    
    storeDetail: [],
    stores: [],
    store:{},
    
    // page: 1,
    
    user: {},
    users: [],
    
    orderDetail: [],
    orders: [],
    orderId: [],

    mercData:{},
    // user: false,
    guest: {},
    wishlist: [],
    cart: {},
    reviews: [],
    petitions: [],
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
        case 'POST_CATEGORY':            
            return {
            ...state,
            }
        case 'POST_STORE':            
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
           
        case 'GET_STORE_BY_ID':
            return {
                ...state,
                storeDetail: action.payload
            }
        case 'GET_ORDER_DETAIL':
            return {
                ...state,
                orderDetail: action.payload
            }
        case 'GET_ORDER_BY_ID':
            return {
                ...state,
                orderId: action.payload
            }
        case "SIGN_IN": 
            return {
                ...state
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
            case "GET_ALL_ORDERS":
            return {
                ...state,
                orders: action.payload
            } 
            case "GET_ORDER_BY_STATUS":
            return {
                ...state,
                orders: action.payload
            } 
        case "CREATE_REVIEW":
            
            return{
                ...state,                                                                                                       
                 reviews: action.payload
            }

        case "GET_STORE":
            return{
                ...state, 
                store: action.payload
            }    

        case 'GET_ALL_USERS':
            return {
                ...state,
                users: action.payload
            }
            case 'GET_USERS':
                return {
                    ...state,
                    users: action.payload
                }
            case 'GET_ALL_PETITIONS':
            return {
                ...state,
                petitions: action.payload
            }
        case "CLEAR_PROD_DETAIL": 
            return {
                ...state,
                prodDetail: action.payload
            }
               
        default: return state;
        }
}

export default rootReducer;
