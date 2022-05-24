import React, { useContext } from "react";

//CSS
import './Banner.css';

//Components
import { authContext } from "../../../Context/AuthProvider.jsx";
import { Link } from 'react-router-dom';

function Banner() {
    const context = useContext(authContext);

    return (
        <div className='container-banner'>
            <div className='container d-flex justify-content-between p-4'>
                <div className='header-container'>
                    <span className='header-orange'></span>
                    <h2>Opportunities For You</h2>
                    {context.auth.role === "employer" &&
                        <Link to="/employer" className="btn btn-outline-secondary">Employer panel</Link>
                    }
                </div>
                <div className='puntos d-none d-sm-none d-md-block'>
                </div>
            </div>
        </div>
    );
}

export default Banner;