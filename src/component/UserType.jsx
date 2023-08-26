import React, { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assests/logo 5.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import logout from "../helper/logout";

const UserType = () => {
  const dispatch = useDispatch();
  const { error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  console.log(user);
  const getUserType = async () => {
    if (user?._id !== undefined) {
      try {
        console.log(user?._id, "id");
        const { data } = await axios.post(
          "https://xerocode-3fc9.onrender.com/api/v1/usertype/getUserType",
          { id: user?._id },
          { withCredentials: true }
        );

        if (data.userType === null) {
          const { data } = await axios.post(
            "https://xerocode-3fc9.onrender.com/api/v1/usertype/register",
            { id: user?._id },
            { withCredentials: true }
          );
        }
      } catch (error) {
        toast.error(error?.response?.data.err);
      }
    }
  };

  useEffect(() => {
    getUserType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const userTypeArr = [
    {
      name: "developer",
    },
    {
      name: "oganization",
    },
    {
      name: "comapany",
    },
  ];

  const [userTypeSelect, setUserTypeSelect] = useState(-1);

  const navigate = useNavigate();
  async function handleChange(index) {
    setUserTypeSelect(index);
  }

  async function handleSubmit() {
    try {
      const { data } = await axios.put(
        "https://xerocode-3fc9.onrender.com/api/v1/usertype/update",
        {
          id: user?._id,
          newuserType: userTypeArr[userTypeSelect]?.name,
        },
        { withCredentials: true }
      );

      console.log(data);
      toast.success("sucessfullly updated");
      setTimeout(() => {
        navigate("/hostingoption");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.err);
    }
  }

  async function handleLogout() {
    await logout();
    dispatch({
      type: "logoutSuccess",
    });
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "2rem", marginBottom: "0.3rem", marginTop:"0.3rem"}}>
        <FiLogOut size={25} onClick={() => {
          handleLogout()
        }}/>
      </div>
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
            <h2>{user?.nodeId ? user?.displayName : user?.name}</h2>
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
              display: "flex",
              marginTop: "1.5rem",
              justifyContent: "space-around",
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          >
            {userTypeArr.map((userType, index) => {
              return (
                <div
                  style={{
                    flexBasis: "15%",
                    border: " 1px solid #C0C0C0",
                    borderRadius: "0.3125rem",
                    padding: "0.5rem 1rem 0.5rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    backgroundColor: index === userTypeSelect ? "#1F64FF" : "",
                    cursor: "pointer",
                    color: index === userTypeSelect ? "white" : "",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={`${userType.name}${index}`}
                  onClick={() => {
                    handleChange(index);
                  }}
                >
                  <h5> {userType.name}</h5>
                </div>
              );
            })}
          </div>
          {userTypeSelect != -1 && (
            <div
              style={{
                margin: "2.5rem auto auto auto",
                display: "flex",
                gap: "1rem",
              }}
            >
              <input
                style={{
                  outline: "none",
                  border: "1px solid #C0C0C0",
                  padding: "0.4rem .2rem 0.4rem 0.8rem",
                }}
                placeholder={` Enter ${userTypeArr[userTypeSelect].name}`}
              />
              <button
                style={{
                  background: "blue",
                  padding: "0.6rem 1rem 0.6rem 1rem",
                  border: "none",
                  color: "white",
                  borderRadius: "0.3125rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default UserType;
