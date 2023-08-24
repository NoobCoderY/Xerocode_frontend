import React from "react";
import {
  AiOutlineLock,
  AiOutlineGoogle,
  AiFillGithub,
  AiOutlineMail,
} from "react-icons/ai";

const HomePage = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "7rem" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.7rem",
          }}
        >
          <span style={{ position: "relative", top: "3px" }}>
            <AiOutlineLock size={22} color="blue" />
          </span>
          <h2 style={{ color: "blue" }}>Authentication</h2>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            color: "white",
            backgroundColor: "red",
            padding: "0.5rem 0.8rem 0.5rem 0.8rem",
            borderRadius: "5px",
          }}
        >
          <span style={{ position: "relative", top: "2px" }}>
            <AiOutlineGoogle size={20} />
          </span>
          <h4>Sign Up with Google</h4>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            color: "white",
            backgroundColor: "black",
            padding: "0.5rem 0.8rem 0.5rem 0.8rem",
            borderRadius: "5px",
          }}
        >
          <span style={{ position: "relative", top: "2px" }}>
            <AiFillGithub size={20} />
          </span>
          <h4>Sign Up with Github</h4>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            color: "white",
            backgroundColor: "orange",
            padding: "0.5rem 0.8rem 0.5rem 0.8rem",
            borderRadius: "5px",
          }}
        >
          <span style={{ position: "relative", top: "2px" }}>
            <AiOutlineMail size={20} />
          </span>
          <h4>Sign Up with Email</h4>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
