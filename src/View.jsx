import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { get, getDatabase, ref } from 'firebase/database';
import './App.css';

const View = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const vendorRef = ref(getDatabase(), `vendor details/${id}`);
        get(vendorRef).then((snapshot) => {
            if (snapshot.exists()) {
                setUser({ ...snapshot.val() });
            } else {
                setUser({});
            }
        }).catch((error) => {
            console.error("Error getting vendor:", error.message);
        });
    }, [id]);

    return (
        <div>
            <h1 style={{marginBottom: '2rem', textAlign: 'center'}}>View Vendor Details</h1>
            {Object.keys(user).length > 0 && (
                <div className='card'>
                    <div className='card-header'>
                        <p>Vendor Details</p>
                    </div>
                    <div className='container'>
                        <strong>ID: </strong><span>{id}</span>
                        <br/><br/>
                        {user.name && <><strong>Vendor Name: </strong><span>{user.name}</span><br/><br/></>}
                        {user.account && <><strong>Account Number: </strong><span>{user.account}</span><br/><br/></>}
                        {user.bank && <><strong>Bank Name: </strong><span>{user.bank}</span><br/><br/></>}
                        {user.address1 && <><strong>Address Line 1: </strong><span>{user.address1}</span><br/><br/></>}
                        {user.address2 && <><strong>Address Line 2: </strong><span>{user.address2}</span><br/><br/></>}
                        {user.city && <><strong>City: </strong><span>{user.city}</span><br/><br/></>}
                        {user.country && <><strong>Country: </strong><span>{user.country}</span><br/><br/></>}
                        {user.zipcode && <><strong>Zip Code: </strong><span>{user.zipcode}</span><br/><br/></>}
                        <Link to='/home'>
                            <button className='goback'>Go Back</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default View;
