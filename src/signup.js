import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function Signup({ setUser }) {
    const history = useHistory();
    const [resData, setResData] = useState({ data: { message: '' } })
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [cPassword, setcPassword] = useState('');
    // console.log("name::", name, "email::", email, "password::", password, "cPassword::", cPassword);
    const handleSubmit = async (e) => {
        let signupUser = {
            "name": name,
            "email": email,
            "password": password,
            "cPassword": cPassword
        }
        axios.post('https://cdmi-student.herokuapp.com/auth/signup', signupUser)

            .then(res => {
                setResData(res);
                history.push("/su-admin");
                setUser(true)
            })
            .catch(err => {
                console.log("err::", err);
            })
        // setName('')
        // setEmail('')
        // setpassword('')
        // setcPassword('')
        console.log("submit is cliked");
    }
    return (
        <div className="margin">
            <div className="card login_div ">
                <div className='ss'>
                    <h3>Signup</h3>
                </div>
                {resData.data.status === "Fail" ? resData.data.message : ''}

                <div className="field grid">
                    <label htmlFor="name" className="col-fixed w-6rem">Name</label>
                    <InputText id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mr-2" />
                </div>
                <div className="field grid">
                    <label htmlFor="email" className="col-fixed w-6rem">Email</label>
                    <InputText id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required className=" mr-2" />
                </div>
                <div className="field grid">
                    <label htmlFor="password" className="col-fixed w-6rem">Password</label>
                    <InputText id="Password" type="password" value={password} onChange={(e) => setpassword(e.target.value)} required className=" mr-2" />
                </div>
                <div className="field grid">
                    <label htmlFor="cPassword" className="col-fixed w-6rem">Confirm Password</label>
                    <InputText id="cPassword" type="password" value={cPassword} onChange={(e) => setcPassword(e.target.value)} required className=" mr-2" />
                </div>
                <div className='loginbtn'>
                    <Button label="Signup" icon="pi pi-check" className=" p-button-primary " onClick={handleSubmit} />
                </div>
                <div className='change_page'>

                    <span>Already have an Account?<Link to="/login">  Login here</Link></span>

                </div>



            </div>
        </div >
    )
}
