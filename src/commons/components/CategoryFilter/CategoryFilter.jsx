import React, { useEffect, useState } from 'react';
import './CategoryFilter.css';

import { Dropdown, Option } from "../Dropdown/Dropdown.jsx";
import Banner from '../../components/Banner/Banner.jsx';
import Job from '../../components/Jobs/Job.jsx';

import { postWithToken, getWithToken } from '../../../api';

function CategoryFilter() {
    const [optionValueFilter, setOptionValueFilter] = useState("");
    const [optionValueSubFilter, setOptionValueSubFilter] = useState("");

    const [categoryFilter, setValueCategoryFilter] = useState([]);
    const [locationFilter, setValuelocationFilter] = useState([]);
    const [valueSubFilter, setValueSubFilter] = useState([]);
    const [jobs, setJobs] = useState([]);

    //Get jobs
    const getJobsApi = () => {
        getWithToken('/api/jobs')
            .then(({ data }) => {
                setJobs(data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    //Get All Category
    const getCategoryApi = () => {
        getWithToken('/api/jobs')
            .then(({ data }) => {
                getCategory(data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    //Get All Location
    const getLocationApi = () => {
        getWithToken('/api/jobs')
            .then(({ data }) => {
                getLocation(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    //All the jobs and filters are loaded
    useEffect(() => {
        getJobsApi();
        getCategoryApi();
        getLocationApi();
    }, []);

    //Get because it is going to be leaked.
    const handleSelectFilter = (e) => {
        setOptionValueFilter(e.target.value);
        switch (e.target.value) {
            case "category":
                setValueSubFilter(categoryFilter);
                break;
            case "country":
                setValueSubFilter(locationFilter);
                break;
        }
    };

    const handleSelectSubFilter = (e) => {
        setOptionValueSubFilter(e.target.value);
    };

    const handleSelectAll = (e) => {
        getJobsApi();
    };

    const getCategory = (data) => {
        const categories = new Set();
        data?.map(job => {
            job.category.map(category => {
                categories.add(category);
            })
        })
        setValueCategoryFilter(Array.from(categories));
    }

    const getLocation = (data) => {
        const countries = new Set();
        data?.map(job => {
            countries.add(job.location.country)
        })
        setValuelocationFilter(Array.from(countries));
    }

    //Filtered
    const sendFilter = (event) => {
        event.preventDefault();
        if (optionValueSubFilter !== "" && optionValueFilter !== "" && optionValueFilter !== "no-select" && optionValueSubFilter !== "no-select") {
            let data = filterAssembly(optionValueFilter, optionValueSubFilter);
            postWithToken(`/api/jobs/${data.url}`, data)
                .then(answer => {
                    setJobs(answer.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    //Data assembly
    const filterAssembly = (keyJson, value) => {
        let data = {}
        switch (keyJson) {
            case "country":
                data = {
                    "country": value,
                    "url": "/location"
                }
                break;
            case "category":
                data = {
                    "category": [value],
                    "url": "/category"
                }
                break;
        }
        return data;
    }

    return (
        <>
            <div className='banner'>
                <div className="col-12 conteiner-select">
                    <form onSubmit={sendFilter}>
                        <div className="conteiner-button border-radius-right">
                            <button onClick={handleSelectAll} className="border-radius-left" type='submit'>All</button>
                        </div>
                        <div className="selectdiv">
                            <Dropdown
                                className={""}
                                onChange={handleSelectFilter}
                            >
                                <Option selected value="Click to see options">Click to see options</Option>
                                <Option value="category">Category</Option>
                                <Option value="country">Location</Option>
                            </Dropdown>
                        </div>
                        <div className="selectdiv">
                            <Dropdown
                                onChange={handleSelectSubFilter}
                            >
                                <Option selected value="no-select">Click to see options</Option>
                                {
                                    valueSubFilter?.map((item, index) => <Option key={index} value={item} >{item} </Option>)
                                }
                            </Dropdown>
                        </div>
                        <div className="conteiner-button border-radius-right">
                            <button className="border-radius-right" type='submit'>Filter</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='bg-section'>
                <Banner />
                <div className='container mt-3'>
                    <div className='grid'>
                        {jobs?.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryFilter;
