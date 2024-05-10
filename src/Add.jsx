import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './App.css'
import { firedb } from './FirebaseConfig';
import { toast } from 'react-toastify';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';

const initialState = {
    name: "",
    account: "",
    bankname: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    zipcode: "",
}

const Add = () => {
    const [state,setState] = useState(initialState);
    const [data,setData] = useState({});

    const history = useNavigate();

    const {name, account, bankname, address1, address2, city, country, zipcode} = state;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };

    const {id} = useParams();

    useEffect(() => {
        const dbRef = ref(getDatabase(), "vendor details");
        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val());
            } else {
                setData({});
            }
        });

        return () => {
            setData({});
        };
    }, [id]);

    useEffect(() => {
        if(id) {
            setState({...data[id]})
        } else {
            setState({...initialState});
        }

        return () => {
            setState({...initialState});
        };
    }, [id, data])


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!name || !account || !bankname) {
    //         toast.error("Please fill the required fields");
    //     } else {
    //         firedb.child("vendor details").push(state, (err) => {
    //             if(err) {
    //                 toast.error(err);
    //             } else {
    //                 toast.success("Vendor added successfully!");
    //             }
    //         });
    //         setTimeout(() => history("/home"), 500);
    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !account || !bankname) {
            toast.error("Please fill the required fields");
        } else {
            if (!id) {
                const vendorRef = ref(firedb, "vendor details");
            push(vendorRef, state, (err) => {
                if(err) {
                    toast.error(err.message);
                } else {
                    toast.success("Vendor details added successfully!");
                }
            });
            setTimeout(() => history("/home"), 500);
            } else {
                const vendorRef = ref(firedb, `vendor details/${id}`);
            set(vendorRef, state, (err) => {
                if(err) {
                    toast.error(err.message);
                } else {
                    toast.success("Vendor details updated successfully!");
                }
            });
            setTimeout(() => history("/home"), 500);
            }
        }
    }

  return (
    <div style={{marginTop: "1rem"}}>
        <h1 style={{textAlign: 'center'}}>Add vendor</h1>
        <div style={{width: '50%', display: 'block', margin: 'auto'}}>
        <form style={{margin: "auto", padding: "1rem", alignContent: "center"}} className='vendor' onSubmit={handleSubmit}>
            <label htmlFor="name">Vendor Name</label>
            <input type="text" id="name" name='name' placeholder='Enter Vendor Name' value={name || ""} onChange={handleInputChange} required/>
            <label htmlFor="account">Account Number</label>
            <input type="number" id="account" name='account' placeholder='Enter Account Number' value={account || ""} onChange={handleInputChange} required/>
            <label htmlFor="bankname">Bank Name</label>
            <input type="text" id="bankname" name='bankname' placeholder='Enter Bank Name' value={bankname || ""} onChange={handleInputChange} required/>
            <label htmlFor="address1">Address Line 1</label>
            <input type="text" id="address1" name='address1' placeholder='Enter Address Line 1' value={address1 || ""} onChange={handleInputChange}/>
            <label htmlFor="address2">Address Line 2</label>
            <input type="text" id="address2" name='address2' placeholder='Enter Address line 2' value={address2 || ""} onChange={handleInputChange}/>
            <label htmlFor="city">City</label>
            <input type="text" id="city" name='city' placeholder='Enter City' value={city || ""} onChange={handleInputChange}/>
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name='country' placeholder='Enter Country' value={country || ""} onChange={handleInputChange}/>
            <label htmlFor="zipcode">Bank Name</label>
            <input type="number" id="zipcode" name='zipcode' placeholder='Enter Zipcode' value={zipcode || ""} onChange={handleInputChange}/>
            <button type='submit' className='add-vendor' value={id ? "Update" : "Save"}>{id ? "Update Vendor" : "Save Vendor"}</button>
        </form>
        </div>
    </div>
  )
}

export default Add