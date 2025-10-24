import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from "./context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "./context/UserContext";
import { toast } from 'react-toastify';
import Loading from '../component/Loading';


const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  let {getCurrentUser} = useContext(userDataContext)
     let [loading,setLoading] = useState(false)

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

       console.log(result.data)
            setLoading(false)
            getCurrentUser()
            navigate("/")
            toast.success("User Login Successful")
            
    } catch (error) {
      console.log(error)
            toast.error("User Login Failed")
    }
  };

const googleLogin = async () => {
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
  
  } catch (error) {
    console.log(error);
   
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
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">Welcome to OneCart, place your order</span>
      </div>

      {/* Form Box */}
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-[90%] h-[90%] flex flex-col items-center gap-[20px]"
        >
          {/* Google Login */}
          <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer">
            <img src={google} alt="Google" className="w-[20px]" onClick={googleLogin} />
            <span>Login with Google</span>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
          />

          {/* Password Input */}
          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold pr-[40px]"
            />
            <span
              className="absolute right-4 top-3 cursor-pointer text-white"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <IoEye /> : <IoEyeOutline />}
            </span>
          </div>

          <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
          {loading? <Loading/> : "Login"}  Login
          </button>

          <p className="flex gap-[10px] text-[15px]">
            Don't have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-[#5555f6cf] font-semibold cursor-pointer"
            >
              Create New Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
