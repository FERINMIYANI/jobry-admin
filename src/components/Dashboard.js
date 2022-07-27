// import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios';

export const Dashboard = (props) => {

    const [recruiters, setRecruiters] = useState()
    const [seeker, setSeeker] = useState()
    const [jobs, setJobs] = useState()

    useEffect(() => {
        Axios.get(`http://localhost:3000/allrecruiter`).then((Res) => {
            setRecruiters(Res.data.details);
        }).catch((e) => {
            console.log(e);
        })

        Axios.get(`http://localhost:3000/allseeker`).then((Res) => {
            setSeeker(Res.data.details);
        }).catch((e) => {
            console.log(e);
        })

        Axios.get(`http://localhost:3000/alljobs`).then((Res) => {
            setJobs(Res.data.details);
        }).catch((e) => {
            console.log(e);
        })
    }, [])


    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-4">
                <div className='led'>
                    <div className="card mb-0 dasboard-card">
                        <div className="flex justify-content-between mb-5">
                            <div>
                                <span className="block text-500 font-medium mb-3">Active Job Seekers</span>
                                {
                                    seeker && seeker.length ?
                                        <div className="text-500 font-medium text-xl">{seeker.length}</div>
                                        : null
                                }
                            </div>
                            <div className="" style={{ width: '3rem', height: '3rem' }}>
                                <img className='stu' src='assets/layout/images/student.png' alt="logo" />
                                <div className='mt-5 butn'>
                                    <Link to='/seeker'><button >View</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
                <div className='led'>
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-5   ">
                            <div>
                                <span className="block text-500 font-medium mb-3" style={{color: 'red'}}>Active Recruiters</span>
                                {
                                    recruiters && recruiters.length ?
                                        <div className="text-500 font-medium text-xl">{recruiters.length}</div>
                                        : null
                                }
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '3rem', height: '3rem' }}>
                                <img className='stu' src='assets/layout/images/vv.png' alt="logo" />
                                <div className='mt-5 butn'>
                                    <Link to='/recruiter'><button >View</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
                <div className='led'>
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-5">
                            <div>
                                <span className="block text-500 font-medium mb-3">Total Jobs</span>
                                {
                                    jobs && jobs.length ?
                                        <div className="text-500 font-medium text-xl">{jobs.length}</div>
                                        : null
                                }
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '3rem', height: '3rem' }}>
                                <img className='stu' src='assets/layout/images/attendance.png' alt="logo" />
                                <div className='mt-5 butn'>
                                    <Link to='/jobs'><button >View</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}