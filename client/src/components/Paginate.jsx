import React from 'react'

function Paginate({ prodPerPage, allProducts, paginate}) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allProducts/prodPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            <ul>
                    {
                        pageNumbers && pageNumbers.map(num => {
                            return(
                                <li key={num}>
                                    <button onClick={() => paginate(num)}>{num}</button>
                                </li>
                            );
                        })
                    }
                </ul>
        </div>
    )
}

export default Paginate
