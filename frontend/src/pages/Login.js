import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValues, setFormValues] = useState(initialState);
  const { email, password } = formValues;
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
    // console.log(formValues);
    try {
      const response = await axios.post(
        "http://192.168.0.100:5000/api/login",
        formValues
      );
      if (response) {
        console.log(response);
        toast.success("Login Successful.");
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };
  useEffect(()=>{
    async function TokenCheck(){
        const Token = await localStorage.getItem("token");
        if (!Token) {
          return
        }
        const validToken = await axios.post("http://192.168.0.100:5000/api/tokenCheck",{token : Token});
        if (validToken.data.authentic){
           navigate("/home");
       }
    }
    TokenCheck();
  }, []);
  return (
    <div
      className="card"
      style={{
        height: "50vh",
        width: "fit-content",
        position: "absolute",
        top: "27vh",
        left: "41vw",
      }}
    >
      <div className="card-body">
        <h5
          className="card-title"
          style={{ textAlign: "center", fontWeight: "600" }}
        >
          Login
        </h5>
        <form onSubmit={login}>
          <h5 style={{ marginTop: "30px" }}>Email:</h5>
          <input
            type="email"
            placeholder="Email"
            style={{ marginTop: "5px" }}
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <h5 style={{ marginTop: "30px" }}>Password:</h5>
          <input
            type="password"
            placeholder="Password"
            style={{ marginBottom: "10px", marginTop: "5px" }}
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <br />
          <button
            className="btn btn-primary"
            style={{ position: "relative", left: "66px", top: "10px" }}
            type="submit"
          >
            Login
          </button>
          <br />
        </form>
      </div>
      <Link
        to="/signup"
        style={{
          marginTop: "10px",
          textDecoration: "none",
          color: "black",
          marginTop: "19px",
          marginLeft: "51px",
        }}
      >
        Create an account
      </Link>
    </div>
  );
};

export default Login;
