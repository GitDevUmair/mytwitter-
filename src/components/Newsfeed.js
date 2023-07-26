import React from "react";
import Newsfeeditem from "./Newsfeeditem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Newsfeed = () => {
  const [feed, setFeed] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let output = localStorage.getItem("auth-token");
    setToken(output);
    if (!output) {
      navigate("/login");
    } else {
     
      getNewsfeed(output);
    }
    
  
  }, []);
  const getNewsfeed = async (output) => {
    try {
      const response = await fetch(
        "/api/newsfeed/getnewsfeed",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": output,
          },
        }
      );

      const result = await response.json();
      setFeed(result.tweets);
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
    <div className="container">
      {Array.isArray(feed) &&
        feed.map((feeditem, index) => {
          const { text, image, createdby } = feeditem;
          const userPromise = getUserDetails(createdby);

          return (
            <Newsfeeditem
              text={text}
              image={image}
              key={index}
              userPromise={userPromise}
            />
          );
        })}
    </div>
  );
};

export default Newsfeed;
