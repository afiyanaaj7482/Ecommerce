import React, { useState } from "react";
import logo from "../assets/logo.png";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { authDataContext } from '../context/AuthContext';
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let { adminData, getAdmin } = useContext(adminDataContext);
  const [loading,setLoading] = useState(false)
  let navigate = useNavigate();

  const handleLogin = async (e) => {
      setLoading(true)
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminlogin",
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
     toast.success("AdminLogin Successfully")
              getAdmin()
              navigate("/")
              setLoading(false)
    } catch (error) {
      console.log(error)
              toast.error("AdminLogin Failed")
              setLoading(false)
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer">
        <img className="w-[40px]" src={logo} alt="" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>

      <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">
          Welcome to OneCart, Apply to Admin Login
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="text"
              className="w-full h-[50px] border-2 border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type={show ? "text" : "password"}
              className="w-full h-[50px] border-2 border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show ? (
              <IoEyeOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]"
                onClick={() => setShow(true)}
              />
            ) : (
              <IoEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]"
                onClick={() => setShow(false)}
              />
            )}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
