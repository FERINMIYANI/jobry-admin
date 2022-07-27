import React, { useState } from 'react';
import '../App.scss';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const Subcourses = () => {
  const [input, setInput] = useState('');
  const [h1Tag, setH1Tag] = useState([]);
  const AddHandler = () => {
    let copyArray = [...h1Tag];
    copyArray.push(input)
    setH1Tag(copyArray);
    setInput('')
  }
  const deleteH1Handler = (index) => {
    console.log(index);
    let copyArray = [...h1Tag];
    copyArray.splice(index, 1);
    setH1Tag(copyArray)
  }
  return (
    <div>

      <div className="card">

        <h4>Sub-Courses Page</h4>
      </div>
      <div className='card'>

        <div className="p-fluid formgrid grid">
          <div className="field col-12 md:col-4">
            <div className='course'>
              <label className='label' htmlFor="course">Course</label>
              <InputText id="maincourse" placeholder="Main Course" type="text" />
            </div>
            <label htmlFor="subcourses">Sub Course</label>
            <InputText id="subcourses" placeholder="Sub Courses" type="text" />
            {
              h1Tag.map((el, i) => {

                return <div className="text">  <InputText id="firstname2" placeholder="Add student" type="text" /></div>

              })
            }
          </div>
          <div className="field col-12 md:col-2 mr">
            <Button label="Add" icon='pi pi-plus' onClick={AddHandler} />
          </div>
          <div className="field col-12 md:col-2 mr1">
            <Button label="Delete" icon='pi pi-trash' onClick={deleteH1Handler} />



          </div>
          <div className="field col-12 md:col-2 mb">
            <Link><Button label="Submit" icon='pi pi-check' /></Link>
          </div>


        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default Subcourses;
