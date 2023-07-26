import React from "react";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiFillDelete,
} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
const Tweet = (props) => {
  const { image, text, heading, _id } = props.tweet;
  const { deleteTweet } = props;
  return (
    <div className="card my-2" style={{ width: "24rem", margin: "0px auto" }}>
      <img
        src={image}
        className="card-img-top"
        alt="tweetimage"
        height={"200px"}
        width={"100px"}
      />
      <div className="card-body">
        <h5 className="card-title">{heading}</h5>
        <p className="card-text">{text}</p>
        <div className="icons d-flex">
          <AiOutlineHeart style={{ cursor: "pointer" }} />
          <FaRegComment style={{ marginLeft: "20px", cursor: "pointer" }} />
          <AiOutlineShareAlt
            style={{ marginLeft: "20px", cursor: "pointer" }}
          />
          <AiFillDelete
            style={{ marginLeft: "13rem", cursor: "pointer" }}
            onClick={() => {
              deleteTweet(_id);
            }}
          />
          <FiEdit style={{ marginLeft: "20px",cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
