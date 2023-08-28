import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const Login = () => {
  
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: cred.email,
      password: cred.password,
    };
    await axios
      .post("https://happyfood.onrender.com/api/loginuser", userData)
      .then((response) => {
        // console.log(response.status, response.data);
        alert("Login Successful");
        const json =  response.data;
        if(json.success){
          localStorage.setItem("userEmail",cred.email);
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("userEmail"))
          console.log(localStorage.getItem("authToken"))
        }

        navigate("/");
      })
      .catch((error) => {
        // console.log(error.response.data);
        alert("Enter Valid Credentials");
      });
  };



  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={cred.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter a Strong Password"
              name="password"
              value={cred.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/Signup" className="m-3 btn btn-danger">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
