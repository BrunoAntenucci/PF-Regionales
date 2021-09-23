import React from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [suscribe, setSuscribe] = useState(true);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSuscribe = (e) => {
        setSuscribe(!suscribe)
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res
            if(!email){
                alert('El email no es correcto')
            }
            if(e.target.value === 'suscribe'){
                res = await axios.put('http://http://localhost:3000/newsletter/suscribe', {email})
            } else {
                res = await axios.put('http://http://localhost:3000/newsletter/unsuscribe', {email})
            }
            if(res.data.error){
                return res.data.message
            } else {
                return res.data.message
            }
            setEmail('')
        }
        catch(error){
            console.log(error)
        }
    }
        return (
            <div>
                <ul>
                    <span>Newsletter</span>
                    <li>
                        <input type="text" value={email} onChange={handleEmail}/>
                        <button
                            id='newsletter'
                            value={suscribe? 'suscribe' : 'unsuscribe'}
                            onClick={handleSubmit}
                        >{suscribe? 'suscribe' : 'unsuscribe'}</button>
                    </li>
                    <li>
                        <p>{suscribe? 'Ya estás suscripto?' : null}
                            <span onClick={handleSuscribe}>
                                {suscribe? 'unsuscribe' : 'suscribe'}
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
        )
   
}