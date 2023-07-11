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
      return
    }
    const validToken = await axios.post(
      "http://192.168.0.100:5000/api/tokenCheck",
      { token: Token }
    );
    if (Token && validToken.data.authentic) {
      return
    } else {
      localStorage.removeItem("token");
      navigate("/");
      toast.error("Session timed out, please log in again.");
      return
    }
  }
  
  useEffect(() => {
    TokenCheck();
  }, []);
  const logout=()=>{
    localStorage.removeItem("token");
    navigate("/");
  }
  const sendMessage = async ()=>{
    await TokenCheck();
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const response = await axios.post("http://192.168.0.100:5000/api/getMessage",{token});
      console.log(response.data.message);  
    }else{
      return
    }
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        color: "white",
        display: "flex",
        flexDirection:"column",
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
          marginTop: "15px"
        }}
        onClick={sendMessage}
        type="submit"
      >
        Send Message
      </button>
    </div>
  );
};

export default Home;
