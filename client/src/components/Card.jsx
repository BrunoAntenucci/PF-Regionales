import React from 'react';

function Card({title, category, price, image}) {
    return (
        <div>
            <p>{title}</p>
            <p>{price}</p>
            <p>{category}</p>
            <div>{image}</div>
        </div>
    )
}

export default Card
