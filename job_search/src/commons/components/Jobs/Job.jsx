import React from "react";
import { Link } from "react-router-dom";
import './Job.css';

function Job({ job }) {
    return (
        <div key={job._id}>
            <div className="ancho-contenido open-position-container">
                <div className="position-card-header">
                    <div className="conteiner-cliente-logo mt-2 mb-4">
                        <div className="client-logo">
                            <ion-icon name="rocket-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className="position-card-middle">
                    <div className="details-section">
                        <div className="detail-text">
                            <span className="text-no-wrap">
                                <label className="label-bold">{(job.title).substring(0, 26)}</label>
                            </span>
                        </div>
                        <div className="detail-text">
                            <label className="label-bold">Creation date</label><span className="text-no-wrap">{(job.creationDate).substring(0, 10)}</span>
                        </div>
                        <div className="detail-text location">
                            <ion-icon name="location-outline"></ion-icon>
                            <div className="">
                                <span className="text-no-wrap"><label className="no-space">{job.location.country}</label>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="detail-text category">
                    <h6 className="label-bold">Category</h6>
                    <ul>
                        {job.category.map((category, index) => <li key={index}>{category}</li>)}
                    </ul>
                </div>
                <div className="position-card-footer">
                    <Link to={`/view/${job._id}`} className='bts-a text-decoration-none'>VIEW DETAILS</Link>
                </div>
            </div>
        </div >

    );
}

export default Job;