import React, { useState } from 'react';
import logo from '../assets/icon.svg';
import google from '../assets/google.jpg';
import { IoEye, IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

const SignUp = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + '/api/auth/signup',
        { name, password, email, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate('/');
      toast.success('Signup Successful');
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      // Send user info to your backend for signup/login
      const result = await axios.post(
        serverUrl + '/api/auth/googleauth',
        { name, email, role },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      navigate('/');
      toast.success('Signup Successful');
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.message ||
        'Google sign-up failed. Please try again.';
      toast.error(message);
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-[#020617] text-white">
      {/* 🌌 Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001F3F] via-[#021B79] to-[#00ffcc] animate-gradientMove opacity-20"></div>

      {/* 💫 Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute block w-1 h-1 bg-[#00ffcc] rounded-full opacity-40 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          ></span>
        ))}
      </div>

      {/* 🧩 Main Form */}
      <form
        className="relative z-10 w-[98%] md:w-[800px] h-[600px] bg-white shadow-xl rounded-2xl flex overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Left Side */}
        <div className="md:w-1/2 w-full h-full flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">Let's get started</h1>
            <h2 className="text-[#999797] text-[18px]">Create your account</h2>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold text-black">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] text-black placeholder-gray-500"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold text-black">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] text-black placeholder-gray-500"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold text-black">
              Password
            </label>
            <input
              id="password"
              type={show ? 'text' : 'password'}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] text-black placeholder-gray-500"
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show ? (
              <IoEyeOutline
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          {/* Role Selection */}
          <div className="flex md:w-[50%] w-[70%] items-center justify-between gap-4">
            <span
              className={`px-[20px] py-[6px] rounded-2xl cursor-pointer transition-all duration-300 text-[14px] font-medium
                ${
                  role === 'student'
                    ? 'border-2 border-[#00ffcc] text-[#00ffcc] shadow-[0_0_15px_#00ffcc] bg-[#00ffcc]/10'
                    : 'border-2 border-[#999] text-[#555] hover:border-[#00bfff] hover:text-[#00bfff] hover:shadow-[0_0_10px_#00bfff]'
                }`}
              onClick={() => setRole('student')}
            >
              Student
            </span>

            <span
              className={`px-[20px] py-[6px] rounded-2xl cursor-pointer transition-all duration-300 text-[14px] font-medium
                ${
                  role === 'educator'
                    ? 'border-2 border-[#00ffcc] text-[#00ffcc] shadow-[0_0_15px_#00ffcc] bg-[#00ffcc]/10'
                    : 'border-2 border-[#999] text-[#555] hover:border-[#00bfff] hover:text-[#00bfff] hover:shadow-[0_0_10px_#00bfff]'
                }`}
              onClick={() => setRole('educator')}
            >
              Educator
            </span>
          </div>

          {/* ✨ Glowing Signup Button */}
          <button
            className="relative w-[80%] h-[40px] bg-gradient-to-r from-[#00ffcc] to-[#00bfff] text-black font-semibold rounded-[5px] overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_#00ffcc] hover:scale-[1.02] flex items-center justify-center"
            onClick={handleSignup}
            disabled={loading}
          >
            <span className="relative z-10">
              {loading ? <ClipLoader size={30} color="white" /> : 'SignUp'}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#00ffcc] to-[#00bfff] opacity-50 blur-lg animate-pulse"></span>
          </button>

          {/* Divider */}
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or Continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>

          {/* Google Login */}
          <div
            className="w-[80%] h-[40px] border-1 border-[black] rounded-[5PX] flex items-center justify-center cursor-pointer"
            onClick={googleSignUp}
          >
            <img src={google} className="w-[25px]" alt="google" />
            <span className="text-[18px]">oogle</span>
          </div>

          {/* Already have account */}
          <div className="text-[#6f6f6f]">
            Already have an account{' '}
            <span
              className="underline underline-offset-1 text-[black] cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex md:w-1/2 h-full bg-black rounded-r-2xl flex-col items-center justify-center">
          <img src={logo} alt="logo" className="w-[120px] shadow-2xl" />
          <span className="text-2xl text-white mt-4">EVERHACK</span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
