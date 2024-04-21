import React, { useState, useRef, useEffect } from 'react';
//CSS
import './EmployerApplication.css';
import './PopUp.css';
//COMPONENTS
import Input from '../../commons/components/Input/Input';
//API
import { postWithToken, getWithToken } from '../../api/index.js';

function EmployerApplication() {
    //Show Pop-Up
    const [active, setActive] = useState(false);
    //Jobs
    const [jobs, setJobs] = useState([]);
    //Create data form
    const description = useRef();
    const title = useRef();
    const category = useRef();
    const country = useRef();
    const province = useRef();
    const city = useRef();
    const salary = useRef();

    useEffect(() => {
        postWithToken('/api/jobs/employer')
            .then(({ data }) => {
                setJobs(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [active]);

    const showPopUp = () => {
        setActive(!active);
    }

    //Create job
    async function createJob(event) {
        event.preventDefault();
        //Data job
        let job = {
            "description": description.current.value,
            "title": title.current.value,
            "category": [category.current.value],
            "location": {
                "country": country.current.value,
                "province": province.current.value,
                "city": city.current.value
            },
            "salary": salary.current.value
        }
        postWithToken("/api/jobs", job)
            .then(({ data }) => {
                if (data.error) {
                    console.log(data);
                } else {
                    setActive(!active);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }



    return (
        <>
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>My offers</h2>
                            </div>
                            <div className="col-sm-6">
                                <button onClick={showPopUp} className="btn btn-success"><ion-icon name="add-circle-outline"></ion-icon><span>Add New </span></button>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="selectAll" />
                                    </span>
                                </th>
                                <th>Title</th>
                                {/* <th>State</th> */}
                                <th>Creation</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobs.map((item) =>
                                    <tr key={item._id}>
                                        <td>
                                            <span className="custom-checkbox">
                                                <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                            </span>
                                        </td>
                                        <td>{item.title}</td>
                                        {/* <td>{item.state}</td> */}
                                        <td>{item.creationDate}</td>
                                        <td>{item.salary}</td>
                                        <td>
                                            <a className="edit" data-toggle="modal"><ion-icon name="pencil-outline"></ion-icon></a>
                                            <a className="delete" data-toggle="modal"><ion-icon name="trash-outline"></ion-icon></a>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                    <div className="clearfix">
                        <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                        <ul className="pagination">

                            <li className="page-item active"><a href="#" className="page-link">1</a></li>
                            <li className="page-item"><a href="#" className="page-link">2</a></li>
                            <li className="page-item"><a href="#" className="page-link">3</a></li>
                            <li className="page-item"><a href="#" className="page-link">4</a></li>
                            <li className="page-item"><a href="#" className="page-link">5</a></li>
                            <li className="page-item"><a href="#" className="page-link">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Pop Up */}

            {/* <div className="contenido-pop-up"> */}
            <div className={active === false ? "contenido-pop-up" : "contenido-pop-up active"}>
                <div className="contenedor-postulacion">
                    <div className="contenido-principal">
                        <h3>Create job offer</h3>
                        <button onClick={showPopUp} className="btn-salir"><ion-icon name="close-outline"></ion-icon></button>
                    </div>
                    <div className="contenido-secundario">
                        <div className="col-md-12 mt-4">
                            <div className="row">
                                <form onSubmit={createJob}>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Input attribute={{
                                                id: 'title',
                                                name: 'title',
                                                type: 'text',
                                                placeholder: 'Title: ',
                                                className: 'form-control mb-2',
                                                ref: title,
                                                required: true
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Input attribute={{
                                                id: 'category',
                                                name: 'category',
                                                type: 'text',
                                                placeholder: 'Category: ',
                                                className: 'form-control mb-2',
                                                ref: category,
                                                required: true
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-4 form-group">
                                                <Input attribute={{
                                                    id: 'country',
                                                    name: 'country',
                                                    type: 'text',
                                                    placeholder: 'Country: ',
                                                    className: 'form-control mb-2',
                                                    ref: country,
                                                    required: true
                                                }} />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <Input attribute={{
                                                    id: 'province',
                                                    name: 'province',
                                                    type: 'text',
                                                    placeholder: 'Province: ',
                                                    className: 'form-control mb-2',
                                                    ref: province,
                                                    required: true
                                                }} />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <Input attribute={{
                                                    id: 'city',
                                                    name: 'city',
                                                    type: 'text',
                                                    placeholder: 'City: ',
                                                    className: 'form-control mb-2',
                                                    ref: city,
                                                    required: true
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <Input attribute={{
                                                id: 'salary',
                                                name: 'salary',
                                                type: 'number',
                                                placeholder: 'Salary: ',
                                                className: 'form-control mb-2',
                                                ref: salary,
                                                required: true
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea ref={description} className="form-control mb-2" id="form-descripcion" rows="2"
                                                placeholder="Description: "></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-success">Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployerApplication