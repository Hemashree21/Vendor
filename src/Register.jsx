import React, { useEffect } from "react";
import { database, provider } from "./FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './App.css';

function RegisterAndLogin() {
    const history = useNavigate();

    const handleClick = () => {
        signInWithPopup(database, provider)
            .then((data) => {
                localStorage.setItem("email", data.user.email);
                history("/home");
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('email')) {
            history("/home");
        }
    }, [history]);

    return (
        <div className="signin">
            <button className="btn" onClick={handleClick}>SignIn With Google</button>
        </div>
    );
}

export default RegisterAndLogin;
