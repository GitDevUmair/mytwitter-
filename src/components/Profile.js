import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userdetails, setUserDetails] = useState({});
  const [updatedetails, setUpdatedetails] = useState({
    username: "",
    profileimage: "",
    status: "",
    contact: "",
  });
  const navigate = useNavigate();
  const [showForm, setShowform] = useState(false);
  useEffect(() => {
    let output = localStorage.getItem("auth-token");
    if (!output) {
      navigate("/login");
    } else {
      getuserdetails(output);
    }
  }, []);
  const getToken = () => {
    let token = localStorage.getItem("auth-token");
    return token;
  };
  const getuserdetails = async (output) => {
    try {
      const response = await fetch("/api/auth/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": output,
        },
      });

      const result = await response.json();
      setUserDetails(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = (e) => {
    setUpdatedetails({ ...updatedetails, [e.target.name]: e.target.value });
    console.log(updatedetails);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: updatedetails.username,
      profileimage: updatedetails.profileimage,
      contact: updatedetails.contact,
      status: updatedetails.status,
    };
    const token = getToken();
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      getuserdetails();
    } catch (error) {
      console.error("Error:", error);
    }
    setShowform(false);
    setUpdatedetails({
      username: "",
      profileimage: "",
      status: "",
      contact: "",
    });
    toast.success("Profile Updated Successfully!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container mt-4 d-flex ">
        <h2 className="mt-4">{userdetails.username}</h2>
        <img
          src={userdetails.profileimage}
          alt="profilepic"
          height={100}
          width={100}
          className="rounded-circle mx-4"
        />
      </div>
      <div className="container mt-4">
        <p style={{ fontSize: "20px" }}>
          <b>Status : </b>
          {userdetails.status}
        </p>
        <p style={{ fontSize: "20px" }}>
          {" "}
          <b>Contact : </b>
          {userdetails.contact}
        </p>
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            setShowform(!showForm);
          }}
        >
          {showForm === false ? "Edit Profile Details" : "Cancel"}
        </button>
      </div>
      <form
        className={`container mt-5 border mb-2 py-2 px-3 shadow ${
          showForm === false ? "d-none" : "d-block"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="form-group my-2">
          <label htmlFor="username">Full Name</label>
          <input
            value={updatedetails.username}
            type="text"
            className="form-control mt-2"
            name="username"
            id="username"
            placeholder="Enter your full name"
            onChange={handleChange}
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="profileimage">Profile Image URL</label>
          <input
            type="text"
            value={updatedetails.profileimage}
            className="form-control mt-2"
            name="profileimage"
            id="profileimage"
            placeholder="Enter the URL of your profile image"
            onChange={handleChange}
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            value={updatedetails.contact}
            className="form-control mt-2"
            name="contact"
            id="contact"
            placeholder="Enter your contact details"
            onChange={handleChange}
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            value={updatedetails.status}
            className="form-control mt-2"
            name="status"
            id="status"
            placeholder="Enter your status"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Change Updates
        </button>
      </form>
    </div>
  );
};

export default Profile;
