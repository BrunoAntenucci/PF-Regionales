// mport React, {useState} from 'react';
// import { Revs } from './ReviewsStyles';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { getUserDataStorage } from '../../reducer/reducer';

// export default function Reviews () {
//     const [review, setReview] = useState({review: null});

//     let bookings = useSelector(state => state.bookings);

//     const flag = bookings.filter(booking => booking.status === "approved");

//     function handleChange(e) {
//         e.preventDefault();

//         setReview(rev => ({
//             ...rev,
//             review: e.target.value
//         }));
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         const user = getUserDataStorage();
//         const feedback = {author: user.username, text: review.review};
//         console.log(feedback)

//         await axios.post('http://localhost:3001/feedbacks', feedback);
//         alert(`${user.username} thank you very much for your feedback!`);
//     }

//     return (
//         <Revs>
//             <h3 className="tit">Write us a review!</h3>
//             {flag.length > 0 ? 
//             <form onSubmit={(e) => handleSubmit(e)}>
//                 <textarea id="esc" value={review.review} onChange={(e) => handleChange(e)} />
//                 <button id="send" type="submit">Enviar</button>
//             </form>
//              : null}
//         </Revs>
//     )
// }