import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  async function TokenCheck() {
    const Token = localStorage.getItem("token");
    if (!Token) {
      navigate("/");
      toast.error("Not Authorized, please log in.");
      return;
    }
    const validToken = await axios.get(
      "http://192.168.18.34:5000/api/tokenCheck",
      {
        headers: {
          token: Token,
        },
      }
    );
    if (Token && validToken.data.authentic) {
      return;
    } else {
      localStorage.removeItem("token");
      navigate("/");
      toast.error("Session timed out, please log in again.");
      return;
    }
  }

  useEffect(() => {
    TokenCheck();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const sendMessage = async () => {
    await TokenCheck();
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      const response = await axios.get(
        "http://192.168.18.34:5000/api/getMessage",{headers:{
          'token' : token
        }}
        
      );
      console.log(response.data);
    } else {
      return;
    }
  };

  const sendToken = async () => {
    const token = localStorage.getItem("token");
    /*const response = await axios.get("http://192.168.18.34:5000/api/getToken",{headers:{
      'token' : token
    }});*/

    // axios.get("http://192.168.18.34:5000/api/getToken",{headers:{
    //   'token' : token
    // }}).then((response) =>{

    //   console.log(response.headers.token);
    //   console.log(response.data.message);
    //   console.log(response);

    // }).catch((error) => {
    //   console.error('Error:', error);
    // });

  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token ,
      'token' : token
    };
    
    const options = {
      method: 'GET',
      headers: headers
    };
    
    fetch('http://192.168.18.34:5000/api/getToken', options)
      .then(response => {response.json(); console.log(response);})
      .then(data => {
        // console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // console.log(response.data.message);
    // console.log(response);

    // const tokenRetrieved = ;
    // console.log(tokenRetrieved);


  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <p>Home</p>
      <br />
      <button
        style={{
          backgroundColor: "red",
          border: "0px",
          borderRadius: "5px",
          height: "33px",
          width: "59px",
        }}
        onClick={logout}
      >
        Logout
      </button>
      <button
        style={{
          backgroundColor: "green",
          border: "0px",
          borderRadius: "5px",
          height: "33px",
          width: "fit-content",
          marginTop: "15px",
        }}
        onClick={sendMessage}
      >
        Send Message
      </button>
      <button
        style={{
          backgroundColor: "burlywood",
          border: "0px",
          borderRadius: "5px",
          height: "33px",
          width: "fit-content",
          marginTop: "15px",
        }}
        onClick={sendToken}
      >
        Send Token in Header
      </button>
    </div>
  );
};

export default Home;
