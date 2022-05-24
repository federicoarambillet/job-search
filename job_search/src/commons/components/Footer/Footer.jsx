import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";

//Imagen
const redes = require.context('../../../assets/img/redes', true);


function Footer() {
    return (
        <footer className="fondo_dark">
            <div className="container">
                <Link to="/">Job Search</Link>
                <ul className="list-inline">
                    <li className="list-inline-item"><img src={redes('./instagram.svg')} alt="Instagram" className="img-fluid" /></li>
                    <li className="list-inline-item"><img src={redes('./twitter.svg')} alt="twitter" className="img-fluid" /></li>
                    <li className="list-inline-item"><img src={redes('./youtube.svg')} alt="youtube" className="img-fluid" /></li>
                    <li className="list-inline-item"><img src={redes('./facebook.svg')} alt="facebook" className="img-fluid" /></li>
                </ul>
                <small>©2022 All Rights Reserved. Created by Federico Arambillet</small>
            </div>
        </footer>
    );
}

export default Footer;