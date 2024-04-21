import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { authContext } from '../../../Context/AuthProvider';

//Components
import Hipervinculo from '../Hipervinculo/Hipervinculo';

function LogOut() {
    //Redirect
    const navigate = useNavigate();

    //Authentication
    const context = useContext(authContext);

    // Clear token
    const logOut = () => {
        //Clear token
        localStorage.removeItem("token");
        //Set Authentication  
        context.setAuth({
            id: "",
            name: "",
            email: "",
            role: "",
            logged: false
        })
        //Redirect to home
        navigate('/', {
            replace: true
        });
    }

    return (
        <>
            <Hipervinculo
                attribute={{
                    href: '',
                    className: 'nav-link login'
                }}
                onClick={logOut}
                text={<ion-icon name="log-out-outline"></ion-icon>} />
        </>
    )
}

export default LogOut;