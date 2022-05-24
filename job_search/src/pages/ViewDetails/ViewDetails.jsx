import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

//API
import { getWithToken, putWithToken } from '../../api/index.js';

//CSS
import './ViewDetails.css';

//Components
import Hipervinculo from "../../commons/components/Hipervinculo/Hipervinculo";


function ViewDetails() {
    //Use the parameter
    const params = useParams();

    //Job for id
    const [job, setJob] = useState({});
    //Applications
    const [applied, setApplied] = useState(false);

    //Get by id job
    useEffect(() => {
        getWithToken(`/api/jobs/${params?.id}`)
            .then(({ data }) => {
                setJob(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [applied]);

    //Apply to job
    const applyUnapply = (e) => {
        putWithToken(`/api/jobs/${e.target.id}/${params?.id}`)
            .then(result => {
                setApplied(!applied);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="main-container">
            <header className="header col-12">
                <div className="container">
                    <section className="header-content">
                        <h1>{job.title}</h1>
                        <div className="mt-4">
                            <span className="d-flex align-items-center">
                                <ion-icon name="wifi-outline"></ion-icon>
                                Remote
                                ({job.location?.country})
                            </span>
                            <span className="d-flex align-items-center">
                                <span>Salary:</span>
                                <strong className="m-2">
                                    $ {job.salary} USD/Annual
                                </strong>
                            </span>
                        </div>
                        <p>{job.description}</p>
                        <div className="mt-1">
                            <div className="d-flex align-items-center mb-1">
                                <ion-icon name="person-circle-outline"></ion-icon>
                                {job.applicants?.length} applications
                            </div>
                            <div className="d-flex align-items-center">
                                <ion-icon name="alarm-outline"></ion-icon>
                                {(job.creationDate)?.substring(0, 10)}
                            </div>
                            <div className="flex flex-v-centered">
                                <div className="mt-2">
                                    <div className="d-flex">
                                        
                                        {applied === false ?
                                            <Hipervinculo
                                                attribute={{
                                                    id: "apply",
                                                    className: 'w-25 text-decoration-none btn-primary button-general'
                                                }}
                                                text={"Apply now"} onClick={applyUnapply} />
                                            : <Hipervinculo
                                                attribute={{
                                                    id: "unapply",
                                                    className: 'w-25 text-decoration-none btn-primary button-general'
                                                }}
                                                text={"Unapply now"} onClick={applyUnapply} />}
                                       

                                        <Link to={`/search`} className='w-25 button-general text-decoration-none'>Back</Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>
                </div>
                <div className="geometric-bg"></div>
            </header>
        </div>

    );
}

export default ViewDetails;