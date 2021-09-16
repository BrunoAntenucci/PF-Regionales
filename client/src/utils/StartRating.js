import React, { useState } from 'react';
import {FaStar} from 'react-icons/fa';

const StartRating = () =>{
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    
    return(
        <div>
            <h2>start</h2>
            
            {/* {[...Array(5).map((start, i) => {
                const ratingValue = i + 1
                return(
                    <div>
                        <input type="radio" 
                        name="rating" 
                        value={ratingValue}
                        onClick={()=>setRating(ratingValue)}
                        />
                        <FaStar 
                        
                        color={ratingValue < (hover || rating) ? "#ffc107" : "e4e5e9"}
                        onMouseEnter={()=> setHover(ratingValue)}
                        onMouseLeave={()=> setHover(null)}/>    
                        {start}
                    </div>
                    
                )
            })]} */}
        </div>
    )
}

export default StartRating;