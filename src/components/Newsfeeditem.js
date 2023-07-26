import React from 'react'
import { useState, useEffect } from 'react';
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
const Newsfeeditem = ({image,text,userPromise}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user details once the promise is resolved
    userPromise.then((userDetails) => {
      setUser(userDetails);
    });
  }, [userPromise]);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className="newsfeed-tweet shadow mt-3" style={{ width: "25rem" }}>
        <div className="d-flex">
          <img
           // src="https://images.unsplash.com/photo-1627639679638-8485316a4b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGtpZHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
           src={user.profileimage} 
           alt="userimg"
            height={50}
            width={50}
            className="rounded-circle mx-4"
          />
          <div className="d-flex flex-column">
            <h4 className="m-0">{user.username}</h4>
            <p className="m-0">{user.username}</p>
          </div>
        </div>
        <div className="content d-flex flex-column container mx-3 mt-2">
          <p>
            {text}
          </p>
          <img
           src={image} 
           alt="tweetimg"
            height={200}
            width={200}
          />
        </div>
        <div className="icons  container mx-3 mt-2">
          <AiOutlineHeart />
          <FaRegComment style={{ marginLeft: "20px" }} />
          <AiOutlineShareAlt style={{ marginLeft: "20px" }} />
        </div>
      </div>
    </div>
  )
}

export default Newsfeeditem
