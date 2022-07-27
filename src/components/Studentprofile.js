import React from 'react';
import '../App.scss';

export const Studentprofile = () => {

    return (

        <div >
            <div className='card'>
                <span className="p-input-icon-right search">
                    <h4>Student Profile</h4>
                </span>
            </div>
            <div className="grid">
                <div className="col-8">
                    <div className="card">
                        <h4>Student Details</h4>
                        <div className="p-fluid formgrid grid data">
                            <div className="field col-12 md:col-4">
                                <label htmlFor="lastname2">First Name</label>
                                <h5>Abc</h5>
                            </div>
                            <div className="field col-12 md:col-4">
                                <label htmlFor="lastname2">Last Name</label>
                                <h5>Abc</h5>
                            </div>
                            <div className="field col-12 md:col-4">
                                <label htmlFor="lastname2">Fathername</label>
                                <h5>Abc</h5>
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="lastname2">Date Of Joining</label>
                                <h5>24/11/2021</h5>
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="lastname2">Date Of Course-End</label>
                                <h5>24/06/2022</h5>
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="lastname2">Student Mobile no.</label>
                                <h5>+1234567890</h5>
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="lastname2">Working Hours</label>
                                <h5>2 hours</h5>
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="email">Email id</label>
                                <h5>Abc@gmail.com</h5>
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="lastname2">Password</label>
                                <h5>Password</h5>

                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="lastname2">Course Name</label>
                                <h5>Web Desiging</h5>
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="lastname2">Faculty Name</label>
                                <h5>BCD</h5>
                            </div>
                            <div className="field col-12">
                                <label htmlFor="address">Address</label>
                                <h5>Address</h5>
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="city">City</label>
                                <h5>City</h5>
                            </div>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="state">State</label>
                                <h5>State</h5>

                            </div>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="zip">Zip Code</label>
                                <h5>Zip Code</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-4'>
                    <div className='card card-user'>
                        <div className="author">

                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                <img className='profilepic' src='assets/layout/images/emilyz.105ff23d.jpg' alt="logo" />
                            </a>
                            {/* <FileUpload className='fileupload' mode='basic' name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} /> */}
                        </div>




                    </div>

                </div>
            </div>

        </div>
    )
}
