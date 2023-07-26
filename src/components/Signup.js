import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
    contact: "",
    status: "",
    profileimage: "",
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            fullname: credentials.fullname,
            contact: credentials.contact,
            status: credentials.status,
            email: credentials.email,
            password: credentials.password,
            profileimage: credentials.profileimage,
          }),
        }
      );
      const json = await response.json();
      if (json) {
        toast.success('Account Created Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate("/login");
      } else {
        toast.error('Some error occured!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      setCredentials({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        fullname: "",
        profileimage: "",
        contact: "",
        status: "",
      });
    } else {
      setCredentials({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        fullname: "",
        profileimage: "",
        contact: "",
        status: "",
      });
      alert("Passwords should match");
    }
  };
  return (
    <div className="container" style={{ marginTop: "70px" }}>
         <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
<ToastContainer />
      <h2 className="mb-1">Create an account to use Twitter</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            placeholder="your username"
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            name="username"
            onChange={onChange}
            value={credentials.username}
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="fullname" className="form-label">
            Fullname
          </label>
          <input
            placeholder="your fullname"
            type="text"
            className="form-control"
            id="fullname"
            aria-describedby="emailHelp"
            name="fullname"
            onChange={onChange}
            value={credentials.fullname}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="contact" className="form-label">
            Contact
          </label>
          <input
            placeholder="your contact"
            type="text"
            className="form-control"
            id="contact"
            aria-describedby="emailHelp"
            name="contact"
            onChange={onChange}
            value={credentials.contact}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <input
            placeholder="your status"
            type="text"
            className="form-control"
            id="status"
            aria-describedby="emailHelp"
            name="status"
            onChange={onChange}
            value={credentials.status}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="profileimage" className="form-label">
            Profile image
          </label>
          <input
            placeholder="your image URL"
            type="text"
            className="form-control"
            id="profileimage"
            aria-describedby="emailHelp"
            name="profileimage"
            onChange={onChange}
            value={credentials.profileimage}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            placeholder="your email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
            value={credentials.email}
            required
          />
        </div>

        <div className="mb-1">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            placeholder="Enter Password"
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            required
          />
        </div>

        <div className="mb-1">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            placeholder="Confirm Password"
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            value={credentials.cpassword}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
