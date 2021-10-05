import axios from 'axios';

//---------PRODUCTS------------------------

export function getProducts() {
    return async function (dispatch) {
        try {
            const prod = await axios.get('/product/');
            return dispatch ({
                type: 'GET_PRODUCTS',
                payload: prod.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getProductsByName(payload) {
    return async function(dispatch) {
        try {
            const prodsByName = await axios.get('/product/search/' + payload);
            console.log(prodsByName);
            return dispatch ({
                type: 'GET_PRODUCTS_BY_NAME',
                payload: prodsByName.data 
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export function deleteProducts(id, payload){
    return function(dispatch) {
        return axios({
            method: "DELETE",
            data: payload,
            withCredentials: true,
            url: `/product/${id}`
          })
          .then((res) => {
            console.log("[ACTION]RES DELETE_PRODUCT: ", res.data)
            dispatch({
                type: "DELETE_PRODUCT",
                payload: res.data
            })
          })
    }
}

export function postProducts(dataProduct){
    
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                dataProduct: dataProduct
            },
            withCredentials: true,
            url: "/petition/newPetition/product"
          })
          .then((res) => {
            console.log("CREATE PRODUCT: ", res.data)
            dispatch({
                type: "POST_PRODUCT",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
    
}

export function modifyProducts(id, payload){
    console.log(id, payload, "holitas")
    return function(dispatch) {
        return axios({
            method: "PATCH",
            data: payload,
            withCredentials: true,
            url: `/product/${id}`
          })
          .then((res) => {
            console.log("[ACTION]RES PATCH_PRODUCT: ", res.data)
            dispatch({
                type: "PATCH_PRODUCT",
                payload: res.data
            })
          })
    }
}


export function getProductDetail(id) {
    console.log("GET PRODUCT DETAIL")
    return async function(dispatch) {
        try {
            const prodDet = await axios.get('/product/' + id);
            console.log("RETURN:", prodDet.data)
            return dispatch({
                type: 'GET_PRODUCT_DETAIL',
                payload: prodDet.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getFilterProducts (payload) {
    return {
        type: 'FILTER_PRODUCTS',
        payload      
    } 
}

//------------CATEGORIES--------------------

export function getCategories() {
    return async function (dispatch) {
        try {
            const categories = await axios.get('/category');
            return dispatch ({
                type: 'GET_CATEGORIES',
                payload: categories.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getCategoryToModify(id) {
    return async function (dispatch) {
        try {
            const categories = await axios.get('/category/filter/' + id);
            return dispatch ({
                type: 'GET_CATEGORY_TO_MODIFY',
                payload: categories.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postCategory(dataCategory){
    
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                dataCategory: dataCategory
            },
            withCredentials: true,
            url: "/petition/newPetition/category"
          })
          .then((res) => {
            console.log("CREATE CATEGORY: ", res.data)
            dispatch({
                type: "POST_CATEGORY",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
    
}

export function modifyCategory(id, payload){
    return function(dispatch) {
        return axios({
            method: "PATCH",
            data: payload,
            withCredentials: true,
            url: `/category/${id}`
          })
          .then((res) => {
            console.log("[ACTION]RES PATCH_CATEGORY: ", res.data)
            dispatch({
                type: "PATCH_CATEGORY",
                payload: res.data
            })
          })
    }
}

export function deleteCategory(id){
    return function(dispatch) {
        return axios({
            method: "DELETE",
            withCredentials: true,
            url: `/category/delete/${id}`
          })
          .then((res) => {
            console.log("[ACTION]RES DELETE_CATEGORY: ", res.data)
            dispatch({
                type: "DELETE_CATEGORY",
            })
          })
    }
}

//----------------STORES----------------------

export function postStore(dataStore){
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                dataStore: dataStore
            },
            withCredentials: true,
            url: "/petition/newPetition/store"
          })
          .then((res) => {
            console.log("CREATE STORE: ", res.data)
            dispatch({
                type: "POST_STORE",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}


export function modifyStore(id, payload){
    return function(dispatch) {
        return axios({
            method: "PATCH",
            data: payload,
            withCredentials: true,
            url: `/store/${id}`
          })
          .then((res) => {
            console.log("[ACTION]RES PATCH_STORE: ", res.data)
            dispatch({
                type: "PATCH_STORE",
                payload: res.data
            })
          })
    }
}

export function getStore(){
    return async function (dispatch) {
        try {
            const stores = await axios.get('/store/actives');
            return dispatch ({
                type: 'GET_STORES',
                payload: stores.data
            })
        } catch (error) {
            console.log(error)
        }
    }
    
}

export function getStoreAll(){
    return async function (dispatch) {
        try {
            const stores = await axios.get('/store/all');
            return dispatch ({
                type: 'GET_STORES',
                payload: stores.data
            })
        } catch (error) {
            console.log(error)
        }
    }
    
}

export function getStoreById(id){
    return async function (dispatch) {
        try {
            const stores = await axios.get(`/store/${id}`);
            return dispatch ({
                type: 'GET_STORE_BY_ID',
                payload: stores.data
            })
        } catch (error) {
            console.log(error)
        }
    }
    
}

export function deleteStore(id){
    return function(dispatch) {
        return axios({
            method: "DELETE",
            withCredentials: true,
            url: `/store/${id}`
          })
          .then((res) => {
            console.log("[ACTION]RES DELETE_STORE: ", res.data)
            dispatch({
                type: "DELETE_STORE",
            })
          })
    }
}

export function reviveStore(id){
    return function(dispatch) {
        return axios({
            method: "POST",
            withCredentials: true,
            url: `/store/revive/${id}`
          })
          .then((res) => {
            console.log("[ACTION]RES REVIVE_STORE: ", res.data)
            dispatch({
                type: "REVIVE_STORE",
            })
          })
    }
}

//-----------------ORDERS----------------------------

export function getOrderDetail() {
    return function(dispatch) {
      return axios({
              method: "GET",
              withCredentials: true,
              url: "/order/currentUser"
            })
            .then((res) => {
              console.log("[ACTION]RES GetOrder: ", res.data)
              dispatch({
                  type: "GET_ORDER_DETAIL",
                  payload: res.data
              })
            })
    }
  }

  export function getAllOrders() {
    return function(dispatch) {
      return axios({
              method: "GET",
              withCredentials: true,
              url: "/petition/asVendor"
            })
            .then((res) => {
              //console.log("[ACTION]RES GetAllOrders: ", res.data)
              dispatch({
                  type: "GET_ALL_ORDERS",
                  payload: res.data
              })
            })
    }
  }

  export function getOrderById(id) {
    return function(dispatch) {
        console.log('id',id);
        return axios({
            method: "GET",
            withCredentials: true,
            url: `/order/find/${id}`
          })
          .then((res) => {
            console.log("ORDER DETAIL: ", res.data)
            dispatch({
                type: "GET_ORDER_BY_ID",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function getOrderByStatus(payload) {
    if(payload ==="Todas"){
        return function(dispatch) {
            console.log('payload todas',payload);
            return axios({
                    method: "GET",
                    withCredentials: true,
                    url: "/petition/asVendor"
                  })
                  .then((res) => {
                    //console.log("[ACTION]RES GetAllOrders: ", res.data)
                    dispatch({
                        type: "GET_ALL_ORDERS",
                        payload: res.data
                    })
                  })
          }

    }else{
        return function(dispatch) {
            console.log('payload',payload);
            return axios({
                method: "POST",
                data: {
                    status: payload
                },
                withCredentials: true,
                url: "/petition/asVendor/filter"
              })
              .then((res) => {
                console.log("ORDER BY STATUS: ", res.data)
                dispatch({
                    type: "GET_ORDER_BY_STATUS",
                    payload: res.data
                })
              })
              .catch((err) => {
                  console.log(err)
              })
        }
    }

}

export function getUserOrdersByStatus(payload) {
    if(payload ==="Todas"){
        return function(dispatch) {
            console.log('payload todas',payload);
            return axios({
                    method: "GET",
                    withCredentials: true,
                    url: "/order/currentUser"
                  })
                  .then((res) => {
                    //console.log("[ACTION]RES GetAllOrders: ", res.data)
                    dispatch({
                        type: "GET_ORDER_DETAIL",
                        payload: res.data
                    })
                  })
          }
    }else{
        return function(dispatch) {
            console.log('payload',payload);
            return axios({
                method: "POST",
                data: {
                    orderStatus: payload
                },
                withCredentials: true,
                url: "/order/orderByStatus"
              })
              .then((res) => {
                console.log("ORDER BY STATUS: ", res.data)
                dispatch({
                    type: "GET_ORDER_DETAIL",
                    payload: res.data
                })
              })
              .catch((err) => {
                  console.log(err)
              })
        }
    }

}


export function page(payload) {
    return {
        type: 'PAGE',
        payload
    }
}

//---------LOGING USER ----------------------
export function signIn(userInfo) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
              email: userInfo.email,
              password: userInfo.password
            },
            withCredentials: true,
            url: "/signin"
          })
          .then((res) => {
            console.log("[ACTION]RES SINGIN: ", res.data)
            dispatch({
                type: "SIGN_IN",
                payload: res.data
            })
          })
    }
}

export function signInGoogle() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "/google/auth"
          })
          .then((res) => {
            console.log("[ACTION]RES SINGIN: ", res.data)
            dispatch({
                type: "SIGN_IN",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function signUp(userInfo) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                email: userInfo.email,
                password: userInfo.password
            },
            withCredentials: true,
            url: "/signup"
          })
          .then((res) => {
            console.log("[ACTION]RES SINGUP: ", res.data)
            dispatch({
                type: "SIGN_UP",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function checkUser() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "/signin"
          })
          .then((res) => {
              console.log("[ACTION]RES CHECKUSER: ", res.data.first_name)
            dispatch({
                type: "CHECK_USER",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function logOut() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "/logout"
          })
          .then((res) => {
              console.log("[ACTION]RES LOGOUT: ", res)
            dispatch({
                type: "LOG_OUT",
                payload: res.data
            })
          })
    }
}
//--------CART--------
export function addProductToCart(id, value) {
    console.log("ENTRA CON: ", id, value)
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                idProduct: id,
                valueProduct: value,
            },
            withCredentials: true,
            url: "/cart/addProduct"
          })
          .then((res) => {
              console.log("ENTRO AL ACTION")
            dispatch({
                type: "ADD_PRODUCT_TO_CART",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function removeProductFromCart(id, value) {
    return function(dispatch) {
        return axios({
            method: "delete",
            data: {
                idProduct: id,
                valueProduct: value,
            },
            withCredentials: true,
            url: "/cart/removeProduct"
          })
          .then((res) => {
            console.log("REMOVE PRODUCT: ", res.data)
            dispatch({
                type: "REMOVE_PRODUCT_FROM_CART",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function removeItemFromCart(id, value) {
    return function(dispatch) {
        return axios({
            method: "delete",
            data: {
                idProduct: id,
                valueProduct: value,
            },
            withCredentials: true,
            url: "/cart/removeItem"
          })
          .then((res) => {
            console.log("REMOVE ITEM: ", res.data)
            dispatch({
                type: "REMOVE_ITEM_FROM_CART",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function getCartByUser() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "/cart"
          })
          .then((res) => {
              console.log("GET CART: ", res.data)
            dispatch({
                type: "GET_CART_BY_USER",
                payload: res.data
            })
          })
    }
}

export function guestCartToUserCart(guestCart) {
    console.log("[guestCartToUserCart] 1")
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                guestCart: guestCart
            },
            withCredentials: true,
            url: "/cart/fromGuest"
          })
          .then((res) => {
            console.log("[guestCartToUserCart] 2")
              console.log("GUEST CART TO USER: ", res.data)
            dispatch({
                type: "GUEST_CART_TO_USER_CART",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}
export  function postOrder (data){
    return async function  (dispatch){
        console.log("ENTRA CON: ", data)
        try{
            var userShip =  await axios({
            method:"post",
            url:"http://localhost:3001/order/newOrder",
            data:data,
            withCredentials: true
        }
            )
            console.log("LLEGO CON ", userShip.data)
        dispatch({
            type:"POST_ORDER",
            payload: userShip.data
        })
    }
        catch(err){
            console.log("ERROR")
            console.log(err)
        }
    }
}
//----------WISHLIST----------
export function addFav(id) {
     console.log("ENTRA CON: ", id)
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                idProduct: id
            },
            withCredentials: true,
            url: "/favourites"
          })
          .then((res) => {
              console.log("ENTRO AL ACTION", res.data)
            dispatch({
                type: "ADD_FAV",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function getFav() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "/favourites"
          })
          .then((res) => {
              console.log("GET_FAV: ", res.data)
            dispatch({
                type: "GET_FAV",
                payload: res.data
            })
          })
    }
}
export function deleteFav(id) {
    console.log(id, 'deleteFavID')
    return function(dispatch) {
        return axios({
            method: "delete",
            data: {
                idProduct: id
            },
            withCredentials: true,
            url: "/favourites"
          })
          .then((res) => {
            console.log("REMOVE PRODUCT: ", res.data)
            dispatch({
                type: "DELETE_FAV",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err.data)
          })
    }
}


export function mailFav(payload) {
    console.log(payload, "payloadaction")
    return async function (dispatch) {
        try {
            const obj={
                id:payload
            }
            const prod = await axios.post('/favourites/mail/', obj);
            console.log(prod, "prodAction")
            return dispatch ({
                type: 'SEND_MAIL_FAVOURITES',
                payload: prod.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}



//------REVIEWS------
export const createReview = (id, review) => {
    console.log("entra con: ", id,  review)
    return function (dispatch){
        return axios({
            method: "post",
            data: {
                first_name: review.first_name,
                user: review._id,
                rating: review.rating,  
                comment: review.comment
            },
            withCredentials: true, 
            url: `/store/${id}/reviews`
        })
        .then((res)=> {
            console.log("[ACTION]RES reviews: ", res.data)
            dispatch({
                type: "CREATE_REVIEW",
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export function getStoreReview(id){
    console.log(id, 'idStore')
    return function (dispatch){
        return axios({
            method: "get",
            withCredentials: true,
            url: `/store/${id}`
            // url: `/${id}/store`
        })
        .then((res)=> {
            console.log("get store", res.data)
            dispatch({
                type: "GET_STORE",
                payload: res.data
            })
        })
    }
}

export function getAllUsers() {
    return async function (dispatch) {
        try {
            const allUsers = await axios.get('/user/');
            return dispatch ({
                type: 'GET_ALL_USERS',
                payload: allUsers.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getUsers() {
    return async function (dispatch) {
        try {
            const allUsers = await axios.get('/user/all');
            return dispatch ({
                type: 'GET_USERS',
                payload: allUsers.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteUser(id) {
    return function(dispatch) {
        return axios({
            method: "delete",
            data: {
                userId: id
            },
            withCredentials: true,
            url: "/user/delete"
          })
          .then((res) => {
            console.log("DELETE USER: ", res.data)
            dispatch({
                type: "DELETE_USER",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function reviveUser(id) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                userId: id
            },
            withCredentials: true,
            url: "/user/revive"
          })
          .then((res) => {
            console.log("REVIVE USER: ", res.data)
            dispatch({
                type: "REVIVE_USER",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}


//--------RESET PASSWORD----------//
// 1 - ENVÍA EL MAIL
export function forgotPass(email){
    console.log(email, 'email')
    return  function(dispatch){
        return axios({
            method: "post",
            data: {
                email: email
            },
            withCredentials: true,
            url: "/user/forgot"
        })
        .then((res)=> {
            console.log('action: forgot', res.data)
            dispatch({
                type: "FORGOT_PASS",
                payload: res.data
            })
        })
    }
}

export function getPass() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "user/forgot"
          })
          .then((res) => {
              console.log("GET PASS: ", res.data)
            dispatch({
                type: "GET_PASS",
                payload: res.data
            })
          })
    }
}
//2 - verifica el token --->get a /reset/:token
export function getToken(token, userInfo){
    return  function (dispatch){
        return axios ({
            method: "get",
            data: {
                userInfo
            }, 
            withCredentials: true,
            url: `/reset/${token}`
        })
        .then((res) => {
            console.log('action resetPass', res.data)
            dispatch({
                type: "GET_TOKEN", 
                payload: res.data
            })
        })
    }
}
//3 - una vez verificado, POST a /reset/:token para cambiar la contraseña
//paso contraseña por BODY, token por PARAMS
export function resetPass(password, token){
    return async function (dispatch){
        return axios ({
            method :"post",
            data: {
                password: password
            }, 
            withCredentials: true,
            url: `/user/reset/${token}`
        })
        .then((res) => {
            console.log('action resetPass', res.data)
            dispatch({
                type: "RESET_PASS", 
                payload: res.data
            })
        })
    }
}



export function getAllPetitions() {
    return async function (dispatch) {
        try {
            const allPetitions = await axios.get('/petition/all');
            return dispatch ({
                type: 'GET_ALL_PETITIONS',
                payload: allPetitions.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function acceptPetition(id) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                petitionId: id
            },
            withCredentials: true,
            url: "/petition/petitionAccepted"
          })
          .then((res) => {
            console.log("ACCEPT PETITION: ", res.data)
            dispatch({
                type: "ACCEPT_PETITION",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function denyPetition(id) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                petitionId: id
            },
            withCredentials: true,
            url: "/petition/petitionDenied"
          })
          .then((res) => {
            console.log("DENY PETITION: ", res.data)
            dispatch({
                type: "DENY_PETITION",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}


export function completeOrder(id) {
    return function(dispatch) {
        console.log('id',id);
        return axios({
            method: "post",
            withCredentials: true,
            url: `/order/complete/${id}`
          })
          .then((res) => {
            console.log("COMPLETE ORDER: ", res.data)
            dispatch({
                type: "COMPLETE_ORDER",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function cancelOrder(id) {
    return function(dispatch) {
        console.log('id',id);
        return axios({
            method: "post",
            withCredentials: true,
            url: `/order/cancel/${id}`
          })
          .then((res) => {
            console.log("CANCEL ORDER: ", res.data)
            dispatch({
                type: "CANCEL_ORDER",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function deleteOrder(id) {
    return function(dispatch) {
        console.log('id',id);
        return axios({
            method: "delete",
            withCredentials: true,
            url: `/order/remove/${id}`
          })
          .then((res) => {
            console.log("DELETE ORDER: ", res.data)
            dispatch({
                type: "DELETE_ORDER",
                payload: res.data
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }
}

export function getOffers() {
    console.log("ACTION GET OFFERS")
    return function(dispatch) {
        return axios({
            method: "GET",
            withCredentials: true,
            url: "/offers"
        })
        .then((res) => {
            dispatch({
                type: "GET_OFFERS",
                payload: res.data
            })
        })
    }
}

export function clearProDetail() {
    return function(dispatch) {
        dispatch({
            type: "CLEAR_PROD_DETAIL",
            payload: {}
        })
    }
}