import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";
const Signup = () => {
  let navigate = useNavigate();
  const [cred, setCred] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
  });
  
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name:cred.name,
      location:cred.location,
      email:cred.email,
      password:cred.password
    };
    await axios.post("http://localhost:3001/api/createusers", userData).then((response) => {
      // console.log(response.status, response.data);
      alert("User Created Successfully");
      navigate("/");

    }).catch((error)=>{
      // console.log(error.response.data);
      alert("Enter Valid Credentials")
    });

  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={cred.name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
              name="location"
              value={cred.location}
              onChange={onChange}
            />
          </div>
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
          <Link to="/Login" className="m-3 btn btn-danger">
            Already a user?
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
