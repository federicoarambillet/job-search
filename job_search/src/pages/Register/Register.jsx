import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from '../../api/index.js';
import './Register.css'

//Components
import Input from '../../commons/components/Input/Input.jsx';
import { authContext } from '../../Context/AuthProvider';

function Register() {

    //Authentication
    const context = useContext(authContext);

    //Registration data form
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const phone = useRef();

    //Radiobutton selection Rol
    const [rol, setRol] = useState("Applicant");

    const selectionRol = (e) => {
        setRol(e.target.value);
    }

    //Redirect
    const navigate = useNavigate();

    //Registration user
    async function singUp(event) {
        event.preventDefault();
        //Data user
        let user = {
            "name": name.current.value,
            "email": email.current.value,
            "password": password.current.value,
            "role": rol
        }
        post("/api/auth/signup", user)
            .then(({ data }) => {
                if (data.error) {
                    console.log("Error in registration");
                    console.log(data);
                } else {
                    //Stored the token
                    localStorage.setItem("token", data.token);
                    //Storing user data
                    context.setAuth({
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        role: data.user.role,
                        logged: true
                    });
                    //Redirect to home
                    navigate("/", {
                        replace: true
                    });
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <section className="mt-5 mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-4">
                            <h3>Register your data here</h3>
                            <p className="text-justify">If you don't have an account yet, please fill out the registration form,
                                we will ask you for the necessary information to speed up the selection process.</p>
                        </div>
                        <div className="col-md-6 mt-4">
                            <div className="row">
                                <form onSubmit={singUp}>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Input attribute={{
                                                id: 'name',
                                                name: 'name',
                                                type: 'text',
                                                placeholder: 'Name: ',
                                                className: 'form-control mb-2',
                                                ref: name,
                                                required: true
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Input attribute={{
                                                id: 'email',
                                                name: 'email',
                                                type: 'email',
                                                placeholder: 'Email: ',
                                                className: 'form-control mb-2',
                                                ref: email,
                                                required: true
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Input attribute={{
                                                id: 'password',
                                                name: 'password',
                                                type: 'password',
                                                placeholder: 'Password: ',
                                                className: 'form-control mb-2',
                                                ref: password,
                                                required: true
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Input attribute={{
                                                id: 'phone',
                                                name: 'phone',
                                                type: 'text',
                                                placeholder: 'Phone: ',
                                                className: 'form-control mb-2',
                                                ref: phone,
                                                required: false
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-center">
                                        <div className="m-2  d-flex justify-content-center align-items-center">
                                            <Input attribute={{
                                                id: 'applicant',
                                                name: 'rule',
                                                type: 'radio',
                                                placeholder: '',
                                                className: 'm-2',
                                                required: false,
                                                value: "applicant",
                                            }} checked={rol === "applicant" ? true : false} onChange={selectionRol} />Applicant
                                        </div>
                                        <div className="m-2 d-flex justify-content-center align-items-center">
                                            <Input attribute={{
                                                id: 'employer',
                                                name: 'rule',
                                                type: 'radio',
                                                placeholder: '',
                                                className: 'm-2',
                                                required: false,
                                                value: "employer"
                                            }} checked={rol === "employer" ? true : false} onChange={selectionRol} />Employer
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-md-6 registro">
                                            <button className="text-decoration-none full-width btn-send w-100">Register</button>
                                        </div>
                                        <div className="col-md-6">
                                            <Link to="/login" className="btn-volver-registro text-decoration-none full-width btn-send w-100">Back to</Link>
                                        </div>

                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;