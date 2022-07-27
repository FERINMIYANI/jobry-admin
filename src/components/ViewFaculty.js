import React from 'react';
import { Link } from 'react-router-dom';
import '../App.scss';

export const ViewFaculty = () => {


  return (

    <div >
      <div className='card'>
        <span><Link to="/super-admin/Facultys">Faculty</Link> / View Faculty</span>

      </div>
      <div className="grid">

        <div className="col-8">
          <div className="card">
            <h4>Faculty Details Details</h4>
            <div className="p-fluid formgrid grid data">
              <div className="field col-12 md:col-7">
                <label htmlFor="lastname2">Name</label>
                <h5>Abc</h5>
              </div>


              <div className="field col-12 md:col-6">
                <label htmlFor="lastname2">Mobile No</label>
                <h5>24/11/2021</h5>
              </div>
              <div className="field col-12 md:col-7">
                <label htmlFor="lastname2">Email</label>
                <h5>24/06/2022</h5>
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
