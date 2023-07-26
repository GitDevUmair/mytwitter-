import React from 'react'
import { useState,useEffect } from 'react'
 const Following = ({userPromise}) => {
   
    const [following,setFollowing] = useState(null)
    useEffect(() => {
        // Fetch the user details once the promise is resolved
        userPromise.then((followerDetails) => {
            setFollowing(followerDetails);
        });
      }, [userPromise]);
      if (!following) {
        return <div>Loading...</div>;
      }
    
   return (
    <div>
      <div className="listitem shadow p-2 d-flex flex-wrap justify-content-between" style={{width:"40rem" , margin : "0px auto" }}>
          <h2>{following?.username}</h2>
          <img src={following?.profileimage} alt="profilepic"
          height={50}
          width={50}
          className='rounded-circle'
          />
        </div>
    </div>
  )
}

export default Following
