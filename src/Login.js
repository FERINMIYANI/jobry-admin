import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useHistory } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

export function Login({ setUser, setUserData }) {
  const [resData, setResData] = useState({ data: { status: "", message: '' } })
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (resData.data.status === "success") {

    }
  }, [resData])

  const handleSubmit = async (e) => {
    let loginUser = {
      "email": email,
      "password": password,
    }
    console.log(loginUser);
    await axios.post('https://cdmi-student.herokuapp.com/auth/login', loginUser)
      .then(res => {
        if (res.data.message.usertype === "super admin") {

          history.push("/super-admin");
        } else if (res.data.message.usertype === "admin") {
          history.push("/admin");
        } else if (res.data.message.usertype === "student") {
          history.push("/student");
        }
        setUser(true)
        setUserData(res)
      })
      .catch(err => {
        console.log("err::", err);
      })
    console.log("submit is cliked");
  }

  return (
    <div className="margin">
      <div className="card login_div ">
        <div className='ss'>
          <h3>Login</h3>
        </div>
        {resData.data.status === "Fail" ? resData.data.message : ''}
        <div className="field grid">
          <label htmlFor="email" className="col-fixed w-6rem">E-mail</label>
          <InputText id="email" value={email} onChange={(e) => setemail(e.target.value)} required className="mr-2" />
        </div>
        <div className="field grid">
          <label htmlFor="Password" className="col-fixed w-6rem">Password</label>
          <InputText type="password" id="Password" value={password} onChange={(e) => setpassword(e.target.value)} required className=" mr-2" />
        </div>
        <div className='loginbtn'>
          <Button label="Login" icon="pi pi-check" className=" p-button-primary " onClick={handleSubmit} />
        </div>
        <div className='change_page'>
          <span>Don't have an Account?<Link to="/signup">  Register here</Link></span>

        </div>



      </div>
    </div >
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };