import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const [followings, setFollowings] = useState([]);
  const location = useLocation();
  const [searchitems, setSearchitems] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    let output = localStorage.getItem("auth-token");
    getFollowings(output);
  }, [show]);
  const getToken = () => {
    let token = localStorage.getItem("auth-token");
    return token;
  };
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
    setSearch("");
    toast.success("Account Logged Out!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const getFollowings = async (output) => {
    try {
      const response = await fetch(
        "/api/profile/following",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": output,
          },
        }
      );

      const result = await response.json();
      setFollowings(result.following);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const followAccount = async (id) => {
    setShow(false);
    setSearch("");
    let mytoken = getToken();
    try {
      const response = await fetch(
        `/api/relationship/follow/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": mytoken,
          },
        }
      );

      const result = await response.json();
      toast.success("followed this user now!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (result.message) {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const unfollowAccount = async (id) => {
    let mytoken = getToken();
    setShow(false);
    try {
      const response = await fetch(
        `/api/relationship/unfollow/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": mytoken,
          },
        }
      );

      const result = await response.json();
      toast.warn("unfollowed this user!", {
        position: "top-center",
        autoClose: 3000,
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

  const handleSearch = async (e) => {
    let mytoken = getToken();
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      setShow(true);
      try {
        const response = await fetch(
          `/api/searchusers?searchquery=${search}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": mytoken,
            },
          }
        );

        const result = await response.json();
        setSearchitems(result.finalSearchResults);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (e.target.value.length < 3) {
      setShow(false);
    }
  };

  return (
    <>
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
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Newsfeed
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/followers" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/followers"
                >
                  Followers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/following" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/following"
                >
                  Following
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/tweets" ? "active" : ""
                  }`}
                  to="/tweets"
                >
                  MyTweets
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Users"
                aria-label="Search"
                value={search}
                onChange={handleSearch}
                disabled={localStorage.getItem("auth-token") == null}
              />
            </form>
            {!localStorage.getItem("auth-token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
      {show === true && (
        <div
          className="listitem shadow p-1 position-absolute top-10 end-0"
          style={{ width: "30rem", zIndex: 2, backgroundColor: "white" }}
        >
          {Array.isArray(searchitems) &&
            searchitems.map((item) => {
              return (
                <div
                  key={item._id}
                  className="d-flex justify-content-between my-1"
                >
                  <div className="d-flex flex-row">
                    <img
                      src={item.profileimage}
                      alt="profilepic"
                      height={40}
                      width={40}
                      className="rounded-circle"
                    />
                    <h4 className="mx-2">{item.username}</h4>
                  </div>
                  <div className="d-flex align-items-center">
                    {followings.includes(item._id) ? (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          unfollowAccount(item._id);
                        }}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          followAccount(item._id);
                        }}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Navbar;
