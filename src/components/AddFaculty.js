import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import '../App.scss';

export const AddFaculty = () => {


  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };


  return (

    <div >
      <div className='card'>
        <span><Link to="/super-admin/Facultys">Faculty</Link> / Add faculty</span>

      </div>
      <div className="grid">


        <div className="col-8">
          <div className="card">
            <h5>Faculty Details</h5>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-7">
                <label htmlFor="firstname2">Faculty Name</label>
                <InputText id="firstname2" type="text" />
              </div>

              <div className="field col-12 md:col-6">
                <label htmlFor="lastname2">Faculty Mobile no.</label>
                <InputText id="lastname2" type="number" />
              </div>
              <div className="field col-12 md:col-7">
                <label htmlFor="lastname2">Faculty Email</label>
                <InputText id="lastname2" type="email" />
              </div>

            </div>
          </div>
        </div>

        <div className='col-4'>
          <div className='card card-user'>
            <div>
              <label htmlFor="upload-button">
                {image.preview ? (
                  <img className="profilepic" src={image.preview} alt="dummy" />
                ) : (
                  <>
                    <span className="fa-stack fa-2x mt-3 mb-2">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fas fa-store fa-stack-1x fa-inverse" />
                    </span>
                    <h5 className="text-center choose  pi pi-plus" >   Choose Image</h5>
                  </>
                )}
              </label>
              <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <br />
              {/* <button onClick={handleUpload}>Upload</button> */}
            </div>
            <div className='backbtn'>
              <Link to="/super-admin/Facultys"><Button className="submitbtn" label="Back" icon="pi pi-arrow-left" /></Link>
              <Link to="/super-admin/Facultys"><Button className="btn" label="Submit" icon="pi pi-check" /></Link>
            </div>


          </div>

        </div>
      </div>

    </div>
  )
}
