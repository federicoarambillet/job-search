import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { post } from '../../api/index.js';
import './Login.css';

//Components
import Input from '../../commons/components/Input/Input.jsx';
import Label from '../../commons/components/Label/Label.jsx';
import Hipervinculo from '../../commons/components/Hipervinculo/Hipervinculo';
import { authContext } from '../../Context/AuthProvider';

function Login() {
  //Authentication
  const context = useContext(authContext);

  //Login data
  const email = useRef();
  const password = useRef();

  //Login error message
  const [errorLoggingIn, setErrorLoggingIn] = useState(false);

  //Redirect
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    //Data user
    let user = {
      "email": email.current.value,
      "password": password.current.value
    }
    post("/api/auth/login", user)
      .then(data => {
        const { token, user } = data.data
        //Stored the token
        localStorage.setItem("token", token)
        //Storing user data
        context.setAuth({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          logged: true
        })
        //Redirect to home
        navigate("/search", {
          replace: true
        })
      })
      .catch((err) => {
        //Show an error
        setErrorLoggingIn(true);
        console.log(err);
      });
  }


  return (
    <>
      <div className="contenedor-login row g-0">
        <div className="col-lg-7 d-none d-lg-block">
          <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            </ol>
            <div className="carousel-inner">
              <div className="item min-vh-100 img-fondo active">
                <div className="carousel-caption d-none d-md-block">
                  <a className="text-decoration-none" href="/">
                    <h5 className="text-white font-weight-bold">Opportunities For You</h5>
                  </a>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="/" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only"></span>
            </a>
            <a className="carousel-control-next" href="/" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only"></span>
            </a>
          </div>
        </div>
        <div className="col-lg-5 fondo-claro d-flex flex-column align-items-end">
          <div className=" col-12 w-100 px-lg-5 py-lg-4 mt-2">
            <h1>Welcome!</h1>
          </div>
          <div className="form-row align-self-center mt-2 col-md-10">
            <form onSubmit={login}>
              <div className="mb-2">
                <Label text={"Email:"} />
                <Input attribute={{
                  id: 'email',
                  name: 'email',
                  type: 'email',
                  placeholder: 'Enter your email',
                  className: 'w-100 form-control',
                  ref: email,
                  required: true
                }} />
              </div>
              <div className="mb-2">
                <Label text={"Password:"} />
                <Input attribute={{
                  id: 'password',
                  name: 'password',
                  type: 'password',
                  placeholder: 'Enter your password',
                  className: 'w-100 form-control',
                  ref: password,
                  required: true
                }} />
              </div>
              {
                errorLoggingIn &&
                <div class="alert alert-danger" role="alert">
                  Incorrect login or password.
                </div>
              }
              <div>
                <Hipervinculo
                  attribute={{
                    href: '/',
                    className: 'bts-a text-decoration-none'
                  }}
                  text={"Forgot your password?"} />
              </div>
              <div>
                <button className="text-decoration-none w-100 btn-send" type='submit'>Sign in</button>
              </div>
            </form>
            <p className="iniciacon text-center mt-3">Or log in with...</p>
            <div className="d-flex justify-content-around">
              <button type="button" className="btn_inicio_redes flex-grow-1">
                <ion-icon name="logo-google" role="img" className="md hydrated mr-2" aria-label="logo google">
                </ion-icon>
                Google
              </button>
              <button type="button" className="btn_inicio_redes flex-grow-1">
                <ion-icon name="logo-facebook" role="img" className="md hydrated mr-2" aria-label="logo facebook">
                </ion-icon> Facebook
              </button>
            </div>
            <div className="text-center px-lg-5 pt-lg-3 mt-auto w-100">
              <Link to={'/register'} className='bts-a text-decoration-none'>Don't have an account? Sign up now!</Link>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
