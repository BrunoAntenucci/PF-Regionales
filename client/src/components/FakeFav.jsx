// import React from 'react';
// import useUser from 'hooks/useUser';
// import {useLocation} from 'wouter';
// import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
// import {store} from 'react-notifications-component';

// export default function Fav ({id}) {
//     // const {isLogged} = useUser();
//     const user = useSelector(state = state.user)
//     const [,navigate] = useLocation();

//     const handleFavClick = () => {
//         if(!user) return navigate('/signin');
//         alert(id)
//             // store.addNotification({
//             //     title: 'You are not Login',
//             //     message: 'You have to be logged in to add Favs.',
//             //     type: 'danger',
//             //     insert: 'top',
//             //     container: 'top-center',
//             //     animationIn: [
//             //         'animate__animated',
//             //         'animate__fadeIn',
//             //     ],
//             //     animationOut: [
//             //         'animate__animated',
//             //         'animate__fadeOut',
//             //     ],
//             //     dismiss: {
//             //         duration: 3000,
//             //         onScreen: true,
//             //         pauseOnHover: true,
//             //     },
//             // })
//     }

//     return (
//         <div>
//             <AiOutlineHeart className='fav' onClick={handleFavClick}/>
//             <AiFillHeart className='fav' onClick={handleFavClick} />
//         </div>
//     )
// }
// const handleFavClick = ()=> {
//     if(!user) alert('debes loguearte')
//     if(user){
//       wish? dispatch(deleteFav(id)) : dispatch(addFav(id))
//       console.log(id)
//     }
//     const wishlist = useSelector(state => state.wishlist);
//     const wish = wishlist.some(favId => favId === id)
//     // const wish = wishlist.find(({product: {_id}}) => _id === product._id);
//     // const product = useSelector(state => state.prodDetail)
