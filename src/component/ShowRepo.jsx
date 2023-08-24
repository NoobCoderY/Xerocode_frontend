import React, { useState, useRef } from "react";
import logo from "../assests/logo 5.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ShowRepo = () => {
  const [checkdeployOption, setcheckdeployOption] = useState();
  const navigate = useNavigate();

  const { error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const getUserType = async () => {
    if (user?._id !== undefined) {
      try {
        console.log(user?._id, "id");
        const { data } = await axios.post(
          "https://xerocode-3fc9.onrender.com/api/v1/usertype/getUserType",
          { id: user?._id },
          { withCredentials: true }
        );
        setcheckdeployOption(data);
        console.log(data);
        fetechGitHubRepo();
      } catch (error) {
        toast.error(error.response.data.err);
      }
    }
  };
  const fetechGitHubRepo = async () => {
    console.log("hi");
    if (checkdeployOption?.userType?.hostingOption==="GitHub") {
      let checkGithubLogin = Object.keys(user);
      let bool = false;
      for (let i = 0; i < checkGithubLogin.length; i++) {
        if (checkGithubLogin[i] === "email") {
          bool = true;
        }
      }
      if (bool === false) {
        const { data } = await axios.get(
          "https://xerocode-3fc9.onrender.com/api/v1/gitrepo",
          { username: user?._name },
          { withCredentials: true }
        );
        console.log(data, "git");
      }
    }
  };
  useEffect(() => {
    getUserType();
  }, [user]);

  return (
    <div
      style={{
        background: "rgba(194, 218, 251, 0.90)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "80%",
          background: "white",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "1rem 0rem 4rem 0rem",
          borderRadius: "2.1875rem ",
        }}
      >
        <div style={{ margin: "auto" }}>
          <img src={logo} alt="logo" />
        </div>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <h2>{user?.name}</h2>
        </div>
        <div
          style={{
            color: "rgba(0, 0, 34, 0.5)",
            textAlign: "center",
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          <div
            style={{
              width: "10%",
              height: "2px",
              background:
                "linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), rgba(170, 178, 200, 0.45)",
            }}
          ></div>
          <h3>Choose from the following Deployment options</h3>
          <div
            style={{
              width: "10%",
              height: "2px",
              background:
                "linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), rgba(170, 178, 200, 0.45)",
            }}
          ></div>
        </div>
        <div
          style={{
            color: "rgba(0, 0, 34, 0.5)",
            textAlign: "center",
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <h3>Choose Github in Deploye section to show users repo </h3>
        </div>
        {checkdeployOption?.userType?.hostingOption === "GitHub" && (
          <div
            style={{
              display: "flex",
              marginTop: "2.5rem",
              width: "80%",
              height: "150px",
              margin: "2.5rem auto auto auto",
              borderRadius: " 0.3125rem",
              border: " 1px solid #C0C0C0",
              padding: "0.5rem 1rem 0.5rem 1rem",
              overflowY: "scroll",
              flexDirection:"column"
            }}
          >
            <p style={{ fontWeight: "600" }}>Github Repository usernamename</p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowRepo;
