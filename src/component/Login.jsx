import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../assests/logo 5.png"
import signUpImage from "../assests/image 6.png"
import {
    FcGoogle
} from "react-icons/fc";
import { FaGithub } from "react-icons/fa"
import { Link } from 'react-router-dom';
import { server } from "../redux/store"
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Login = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const initialFormState = {
        email: '',
        password: '',
      };
    
    const [formState, setFormState] = useState(initialFormState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevFormState) => ({
          ...prevFormState,
          [name]: value,
        }));
    };
    
    const handleSubmit = async() => {
        await axios.post("https://xerocode-3fc9.onrender.com/api/v1/login", formState,{ withCredentials: true ,credentials: "include"})
            .then(async (response) => {
             
                 // Handle the response data here
                 dispatch({
                     type: "loadUserSuccess",
                     payload: response.data.user,
                   });
             toast.success("successfully logged in")
                setTimeout(() => {
                    navigate("/userType")
                 },2000)
             }
             )
            .catch(error => {
                 
                 toast.error(error.response.data.err)
             });
     }

    const googleLoginHandler = () => {
        
        window.open(`${server}/auth/google`, "_self");
    };
    
    const githubLoginHandler = () => {
        
        window.open(`${server}/auth/github`, "_self");
      };
    return (
        <div style={{ background: "rgba(194, 218, 251, 0.90)", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ width: "80%", background: "white", display: "flex", padding: "1rem 0rem 1rem 0rem", borderRadius: "2.1875rem " }} >
                <div style={{ flexBasis: "60%", padding: "0rem 1rem" }}>
                    <div style={{ margin: "auto", display: "flex", justifyContent: "center" }}>
                        <img src={logo} alt='logo' />
                    </div>
                    <div style={{ marginTop: "0.5rem", textAlign: "center" }}><h4>Hello!</h4></div>
                    <div style={{ color: "rgba(0, 0, 34, 0.5)", textAlign: "center", marginTop: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                        <div style={{ width: "20%", height: "2px", background: "linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), rgba(170, 178, 200, 0.45)" }}></div>
                        <h3>Login To Your Account</h3>
                        <div style={{ width: "20%", height: "2px", background: "linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), linear-gradient(0deg, rgba(170, 178, 200, 0.45) 0%, rgba(170, 178, 200, 0.45) 100%), rgba(170, 178, 200, 0.45)" }}></div>

                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "3.5rem", marginLeft: "4.5rem" }}>
                        <input type='email' value={formState.email} name="email"  onChange={handleInputChange} placeholder='Enter your Email' style={{ padding: "0.5rem 0.5rem 0.5rem 1rem", outline: "none", width: "85%" }} />
                        <input type='password' name="password" placeholder='Enter your Password' value={formState.password} onChange={handleInputChange} style={{ padding: "0.5rem 0.5rem 0.5rem 1rem", outline: "none", width: "85%" }} />
                        <button onClick={() => {
                            handleSubmit()
                        }} style={{ width: "85%", padding: "0.5rem", background: "#1F64FF", border: "1px solid #1F64FF", borderRadius: "0.3rem", color: "white", cursor: "pointer" }}>Login</button>
                        <div style={{ display: "flex", width: "85%", justifyContent: "space-between", alignItems: "center" ,padding:"0rem 0.6rem"}}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.7rem",
                                    color: "#00002280",
                                    padding: "0.5rem 1rem 0.5rem 1rem",
                                    borderRadius: "5px",
                                    border: "1px solid #C0C0C0",cursor:"pointer"
                                }}
                                onClick={() => {
                                    googleLoginHandler()
                                }}
                            >
                                <h5>Login with Google</h5>
                                <span style={{ position: "relative", top: "2px" }}>
                                    <FcGoogle size={19} />
                                </span>

                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.7rem",
                                    color: "#00002280",
                                    padding: "0.5rem 1rem 0.5rem 1rem",
                                    borderRadius: "5px",
                                    border: "1px solid #C0C0C0",
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    githubLoginHandler()
                                }}
                            >
                                <h5>Login with GitHub</h5>
                                <span style={{ position: "relative", top: "2px" }}>
                                    <FaGithub size={19} />
                                </span>

                            </div>
                        </div>
                        <div  style={{ color:"#00002280",display:"flex",justifyContent:"center" ,width:"85%"}}>
                        <p>don't have an Account ? <Link to="/Signup" style={{cursor:"pointer"}}>SiGN UP</Link> </p>
                        </div>
                    </div>
                </div>
                <div style={{ flexBasis: "40%", marginTop: "3rem" }}>
                    <img src={signUpImage} alt='signup image' style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
            <Toaster/>
        </div >
    )
}

export default Login;
