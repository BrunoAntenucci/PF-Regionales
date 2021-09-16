import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


const Petitions = () => {

    const allPetitions = useSelector(state => state.petitions);

    let arr = [];
    allPetitions.forEach(petition => {
        arr.push({
            name: petition.dataStore?.name, 
            about: petition.about, 
            id: petition._id, 
            status: petition.status});
    });
    console.log(arr);

    let arr2 = arr.filter(p => p.about === 'STORE');
    console.log(arr2)


    return (
        <div>
            <h1>Petitions</h1>
        </div>
    )
}

export default Petitions
