// import React from 'react';
// import useUser from 'hooks/useUser';
// import {useLocation} from 'wouter';
// import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';

// export default function Fav ({id}) {
//     const {isLogged} = useUser();
//     const [,navigate] = useLocation();

//     const handleFavClick = () => {
//         if(!isLogged) return navigate('/signin');
//         alert(id)
//     }

//     return (
//         <div>
//             <AiFillHeart onClick={handleFavClick} />
//         </div>
//     )
// }