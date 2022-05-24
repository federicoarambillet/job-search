import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { authContext } from "../../Context/AuthProvider.jsx";

//CSS
import './Home.css';

//Imagen
const code = require.context('../../assets/img/home', true);

function Home() {

    //Authentication
    const context = useContext(authContext);

    return (
        <section className="home-hero">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className='contenedor-home'>
                            <h1 className='title-home'>Code</h1>
                            <span>for everyone</span>
                        </div>
                        <div className='find-your-next-job'>
                            <h2>Find your next job</h2>
                        </div>
                        {!context.auth.logged &&
                            <div className='d-flex '>
                                <Link to={'/login'} className='w-50 text-decoration-none btn-primary button-general'>Start!</Link>
                            </div>
                        }
                    </div>
                    <div className="col-md-6 d-none d-sm-none d-md-block">
                        <div className="contenedor-img">
                            <img src={code('./code-home.png')} alt="code" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home