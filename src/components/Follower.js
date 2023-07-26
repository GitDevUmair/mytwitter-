import React from 'react'
import { useState,useEffect } from 'react';
const Follower = ({userPromise}) => {
    const [follower,setFollower] = useState(null)
    useEffect(() => {
        // Fetch the user details once the promise is resolved
        userPromise.then((followerDetails) => {
          setFollower(followerDetails);
        });
      }, [userPromise]);
      if (!follower) {
        return <div>Loading...</div>;
      }
    
  return (
    <div>
      <div className="listitem shadow p-2 d-flex flex-wrap justify-content-between" style={{width:"40rem" , margin : "0px auto" }}>
          <h2>{follower?.username}</h2>
          <img src={follower?.profileimage} alt="profilepic"
          height={50}
          width={50}
          className='rounded-circle'
          />
        </div>
    </div>
  )
}

export default Follower
