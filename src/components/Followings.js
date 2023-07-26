import React from "react";
import { useState, useEffect } from "react";
import Followingg from './Following'
import {  useNavigate } from 'react-router-dom'
const Following = () => {
    const [followings, setFollowings] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{
      let output = localStorage.getItem("auth-token")
    if(!output){
      navigate("/login")
    }
    else{
      getFollowings(output)
    }
    },[])
    
  const getFollowings = async (output) => {
    try {
      const response = await fetch(
        "/api/profile/following",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": output
          },
        }
      );

      const result = await response.json();
      setFollowings(result.following);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUserDetails = async (id) => {
    try {
      const data = {};
      data.id = id;
      const response = await fetch(
        "/api/auth/getposterdetail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className='container mt-3'>
      {Array.isArray(followings) && followings.map((followee,index)=>{
         const userPromise = getUserDetails(followee);
        return <Followingg key={index} followee={followee} userPromise={userPromise}/>
      })}
    </div>
  );
};

export default Following;
