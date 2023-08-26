import React, { useState, useRef } from "react";
import logo from "../assests/logo 5.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ShowRepo = () => {
  const [checkdeployOption, setcheckdeployOption] = useState();
  const [showGitHubRepo, setshowGitHubRepo] = useState();

  const { error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const getUserType = async () => {
    if (user?._id !== undefined) {
      // try {
      const data = await axios
        .post(
          "https://xerocode-3fc9.onrender.com/api/v1/usertype/getUserType",
          { id: user?._id },
          { withCredentials: true }
        )
        .then(({ data }) => {
          fetechGitHubRepo(data);
          setcheckdeployOption(data);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.err);
        });
    }
  };
  const fetechGitHubRepo = async (data) => {
    if (data?.userType?.hostingOption === "GitHub") {
      let checkGithubLogin = Object.keys(user);
      let bool = false;
      for (let i = 0; i < checkGithubLogin.length; i++) {
        if (checkGithubLogin[i] === "email") {
          bool = true;
        }
      }
      if (bool === false) {
        console.log(user.name);
        const gitrepo = await axios
          .post(
            "https://xerocode-3fc9.onrender.com/api/v1/gitrepo",
            { username: user?.name },
            { withCredentials: true }
          )
          .then(({ data }) => {
            setshowGitHubRepo(data);
            console.log(data);
          })
          .catch((err) => {
            //  return toast.error("Please wait some time and refresh for show repo");
          });
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
              flexWrap:"wrap",
              gap: "0.7rem",
            }}
          >
           
            {showGitHubRepo?.map((gitrepo, index) => {
              return (
                <div
                  key={`${gitrepo}${index}`}
                  style={{
                    // border: "2px solid #C0C0C0",
                    borderRadius: "6px",
                    padding: "1rem",
                    boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                    width:"32%",
                    
                  }}
                >
                  <div
                    style={{ display: "flex", gap: "1.4rem", padding: "0.3rem" }}
                  >
                    <h5 style={{ color: "#218bff" }}>{ gitrepo?.name}</h5>
                    <div
                      style={{
                        border: "1px solid #C0C0C0",
                        fontSize: "0.8rem",
                        padding: "0.2rem 0.4rem",
                        fontWeight: "500",
                        borderRadius: "10px",
                        color: "#C0C0C0",
                      }}
                    >
                      { gitrepo?.visibility}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "0.2rem",
                      display: "flex",
                      gap: "1.5rem",
                      marginTop: "5px",
                    }}
                  >
                    <h5 style={{ color: "#218bff" }}>{ gitrepo?.language}</h5>
                    <div style={{ cursor: "pointer" }}>
                     <a href={""}>  <button
                        style={{
                          padding: "0.5rem 0.5rem",
                          cursor: "pointer",
                          background: "#218bff",
                          color: "white",
                          border: "#218bff",
                          borderRadius: "5px",
                        }}
                      >
                        Click to redirect
                      </button></a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ShowRepo;
