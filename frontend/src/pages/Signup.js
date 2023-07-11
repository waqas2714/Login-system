import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const initialState = {
  email:"",
  password:""
}
const Signup = () => {
  const [formValues, setFormValues] = useState(initialState);
  const {email, password} = formValues;
  const navigate = useNavigate();
  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setFormValues({...formValues, [name] : value})
}
const signup = async(e)=>{
  e.preventDefault();
  // console.log(formValues);
  try {
    const response = await axios.post("http://192.168.0.100:5000/api/signup",formValues);
    if (response) {
      console.log(response);
      toast.success("Signup Successful.");
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/home");
    }
  } catch (error) {
    console.log(error.response.data.error);
    toast.error(error.response.data.error)
  }
}
  return (
    <div className="card" style={{
    height: "50vh",
    width: "fit-content",
    position: "absolute",
    top: "27vh",
    left: "41vw"}}>
        <div className="card-body">
          <h5 className="card-title" style={{textAlign: "center", fontWeight: "600"}}>Signup</h5>
          <form onSubmit={signup}>
            <h5 style={{marginTop: "30px"}}>Email:</h5>
            <input type="email" placeholder="Email" style={{ marginTop: "5px"}} name='email' value={email} onChange={handleInputChange} />
            <h5 style={{marginTop: "30px"}}>Password:</h5>
            <input type="password" placeholder="Password" style={{marginBottom: "10px", marginTop: "5px"}} name='password' value={password} onChange={handleInputChange} />
            <br />
            <button className="btn btn-primary" style={{position: "relative",
            left: "19px",
            top: "10px"}} type='submit'>Create Account</button>
          </form>
        </div>
          <Link to="/" style={{marginTop:"10px", textDecoration: "none", color:"black", marginTop: "19px",
    marginLeft: "13px"}}>Already have an account?</Link>
    </div>
  )
}

export default Signup