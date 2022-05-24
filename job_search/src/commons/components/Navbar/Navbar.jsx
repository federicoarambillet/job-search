import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

//Components
import { authContext } from "../../../Context/AuthProvider";
import LogOut from "../LogOut/LogOut";

//Imagen
const perfiles = require.context('../../../assets/img/perfil', true);


function Navbar() {
    const context = useContext(authContext);
    return (
        <nav className="container-fluid navbar navbar-expand-lg navbar navbar-dark bg-dark">
             {!context.auth.logged && <Link to="/" className="navbar-brand">Job Search</Link>}
             {context.auth.logged && <Link to="/search" className="navbar-brand">Job Search</Link>}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav">
                    <li className="nav-item m-1">
                        {/* Si esta logueado muestro el perfil */}
                        {context.auth.logged && <div className="panel-header" id="profile">
                            <div className="perfil user">
                                <div className="contenedor-perfil">
                                    <div className="user-image">
                                        <div className="image">
                                            <img alt="Perfil" src={perfiles('./perfil_he.jpg')} />
                                        </div>
                                    </div>
                                    <div className="user-info">
                                        <div className="user-name">{context.auth.email}</div>
                                        <div className="user-role">{context.auth.role}</div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link notification"><ion-icon name="notifications-outline"></ion-icon></Link>
                    </li>
                    <li className="nav-item">
                        {/* Sino esta logueado muestro el login */}
                        {!context.auth.logged && <Link to="/login" className="nav-link login"><ion-icon name="people-outline"></ion-icon></Link>}
                        {/* Si esta logueado muestro el log out */}
                        {context.auth.logged && <LogOut/>}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;