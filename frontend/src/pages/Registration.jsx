import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { authDataContext } from "./context/authContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "./context/UserContext";
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

const Registration = () => {
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
   let {getCurrentUser} = useContext(userDataContext)
    let [loading,setLoading] = useState(false)
   

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault();
    
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/registration",
        { name, email, password },
        { withCredentials: true }
      );
      getCurrentUser()
      navigate("/")
        toast.success("User Registration Successful")
      console.log(result.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
        toast.error("User Registration Failed")
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googleLogin",
        { name, email },
        { withCredentials: true }
      );
       console.log(result.data);
        getCurrentUser()
      navigate("/");
      toast.success("User Registration Successful")
     
    } catch (error) {
      console.log(error);
        toast.error("User Registration Failed")
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
      {/* Navbar */}
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="Logo" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>

      {/* Heading */}
      <div className="w-full h-[100px] flex flex-col items-center justify-center gap-[10px]">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px]">
          Welcome to OneCart, Place your order
        </span>
      </div>

      {/* Form Box */}
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          action=""
          onSubmit={handleSignup}
          className="w-[90%] h-[90%] flex flex-col items-center gap-[20px]"
        >
          {/* Google Registration */}
          <div
            className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center 
          justify-center gap-[10px] cursor-pointer"
            onClick={googleSignup}
          >
            <img src={google} alt="Google" className="w-[20px]" />
            <span>Registration with Google</span>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Input Fields */}
          <div className="w-[90%] flex flex-col items-center gap-[15px]">
            <input
              type="text"
              placeholder="UserName"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
            />

            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
            />

            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold pr-[45px]" // right padding for icon
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? (
                  <IoEye className="text-xl" />
                ) : (
                  <IoEyeOutline className="text-xl" />
                )}
              </span>
            </div>

            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] 
            text-[17px] font-semibold">
             {loading? <Loading/> :"Create Account"}
            </button>

            <p className="flex gap-[10px] text-[15px]">
              You have any account?
              <span
                onClick={() => navigate("/login")}
                className="text-[#5555f6cf] font-semibold cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
