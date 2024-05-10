import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";

function Home() {
    const [data, setData] = useState({});
    const history = useNavigate();

    const logout = () => {
        history("/");
        localStorage.clear();
        window.location.reload();
    };

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
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Do you want to delete this field?")) {
            const contactRef = ref(getDatabase(), `vendor details/${id}`);
            remove(contactRef, (err) => {
                if (err) {
                    console.error("Error deleting vendor:", err.message);
                    toast.error("Failed to delete vendor");
                } else {
                    console.log("Vendor deleted successfully");
                    toast.success("Vendor deleted successfully");
                }
            });
        }
    };
    
    
    return (
        <div>
            <div className="header">
                <Link to="/add"><button className="btn-addvendor">Add Vendor</button></Link>
                <button className="btn-logout" onClick={logout}>
                    Logout
                </button>
            </div>
            <div style={{ marginTop: "3rem" }}>
                <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Vendor Details</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Serial Number</th>
                            <th style={{ textAlign: "center" }}>Vendor Name</th>
                            <th style={{ textAlign: "center" }}>Account Number</th>
                            <th style={{ textAlign: "center" }}>Bank Name</th>
                            <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map((id, index) => {
                            return (
                                <tr key={id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data[id].name}</td>
                                    <td>{data[id].account}</td>
                                    <td>{data[id].bankname}</td>
                                    <td>
                                        <div style={{display: 'flex', gap: "10px"}}>
                                        <Link to={`/update/${id}`}><button className="crud btn-edit">Edit</button></Link>
                                        <button className="crud btn-delete" onClick={() => handleDelete(id)}>Delete</button>
                                        <Link to={`/view/${id}`}><button className="crud btn-view">View</button></Link>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Home;
