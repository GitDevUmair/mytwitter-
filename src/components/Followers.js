import React from 'react'
import { useState,useEffect } from 'react'
import Follower from './Follower'
import {  useNavigate } from 'react-router-dom'

const Followers = () => {
    const [followers,setFollowers] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
      let output = localStorage.getItem("auth-token")
    if(!output){
      navigate("/login")
    }
    else{
      getFollowers(output)
    }
       
    },[])
    
 
    const getFollowers=async(output)=>{
        try {
          const response = await fetch("http://localhost:5000/api/profile/followers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
              output
          },
          });
    
          const result = await response.json();
          setFollowers(result.followers)
        } catch (error) {
          console.error("Error:", error);
        }
      }
      
      const getUserDetails=async(id)=>{
        try {
          const data = {}
          data.id=id
          const response = await fetch("http://localhost:5000/api/auth/getposterdetail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          const result = await response.json();
          return result
        } catch (error) {
          console.error("Error:", error);
        }
      }
  return (
    <div className='container mt-3'>
      {Array.isArray(followers) && followers.map((follower,index)=>{
         const userPromise = getUserDetails(follower);
        return <Follower key={index} follower={follower} userPromise={userPromise}/>
      })}
    </div>
  )
}

export default Followers
