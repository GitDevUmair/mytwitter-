import React from "react";
import { useEffect, useState, useRef } from "react";
import Tweet from "./Tweet";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Mytweets = () => {
  const addRef = useRef();
  const closeaddRef = useRef();
  const [tweets, setTweets] = useState();
  const navigate = useNavigate();
  const [addState, setAddstate] = useState({
    text: "",
    likes: "0",
    image: "",
    heading: "",
  });
  const getToken = () => {
    let token = localStorage.getItem("auth-token");
    return token;
  };
  useEffect(() => {
    let output = localStorage.getItem("auth-token");
    if (!output) {
      navigate("/login");
    } else {
      gettweets(output);
    }
  }, []);
  const addTweet = () => {
    addRef.current.click();
  };
  const deleteTweet = async (id) => {
    let token = getToken();
    try {
      const response = await fetch(
        `http://localhost:5000/api/tweets/deletetweet/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const result = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }

    let newTweets = tweets.filter((tweet) => {
      return tweet._id !== id;
    });
    setTweets(newTweets);
  };
  const submitTweet = async () => {
    let token = getToken();
    let data = {
      text: addState.text,
      likes: addState.likes,
      heading: addState.heading,
      image: addState.image,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/tweets/addtweet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      setTweets([...tweets, result]);
      closeaddRef.current.click();
      toast.success("Tweet Posted!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAddchange = (e) => {
    setAddstate({ ...addState, [e.target.name]: e.target.value });
  };
  const gettweets = async (output) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/tweets/gettweets",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": output,
          },
        }
      );
      const result = await response.json();
      setTweets(result);
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-2  d-flex justify-content-center flex-column">
      <ToastContainer
        position="top-center"
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
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={addRef}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Post a new tweet
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeaddRef}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="text"
                  id="text"
                  placeholder="your tweet text"
                  onChange={handleAddchange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="heading"
                  className="form-control"
                  name="heading"
                  id="heading"
                  placeholder="your tweet heading"
                  onChange={handleAddchange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  id="image"
                  placeholder="your tweet image URL"
                  onChange={handleAddchange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={submitTweet}
              >
                Add tweet
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3 pb-2">
        <button
          className="btn btn-success"
          style={{ width: "24rem", textAlign: "center" }}
          onClick={addTweet}
        >
          Post a new tweet
        </button>
      </div>
      {Array.isArray(tweets) &&
        tweets.map((tweet, index) => {
          return <Tweet key={index} tweet={tweet} deleteTweet={deleteTweet} />;
        })}
    </div>
  );
};

export default Mytweets;
