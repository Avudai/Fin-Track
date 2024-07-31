import React, { useEffect } from 'react';
import "./style.css";
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Pages/firebase";

function Header() {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate("/");
        } else {
          navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        try {
            const auth = getAuth();
            signOut(auth).then(() => {
                toast.success("logged out");
                //navigate("/");
            }).catch((error) => {
                // An error happened.
                toast.error(error.message);
            });
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className='nav'>
            <p className='logo' style={{'fontSize': 'x-large'}}>Fin-Track</p>
            {user ? <p className='logo link logout' onClick={handleLogout}>LOG OUT</p> : ''}
        </div>
    )
}

export default Header