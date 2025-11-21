import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP
  const sendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(3);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Invalid OTP");
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const resetPassword = async () => {
    setLoading(true);
    try {
      if (newPassword !== conPassword) {
        setLoading(false);
        return toast.error("Passwords do not match");
      }

      const result = await axios.post(
        serverUrl + "/api/auth/resetpassword",
        { email, password: newPassword },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to reset password");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] text-white">
      {/* 🌌 Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001F3F] via-[#021B79] to-[#00ffcc] animate-gradientMove opacity-20"></div>

      {/* 💫 Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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

      {/* 🔐 Main Card */}
      <div className="relative bg-[#0b1221]/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 max-w-md w-full border border-[#00ffcc]/30 z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Forget Your Password
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Enter your email address
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-transparent border border-[#00ffcc]/40 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ffcc]"
                placeholder="you@example.com"
                required
              />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={sendOtp}
              className="relative w-full bg-gradient-to-r from-[#00ffcc] to-[#00bfff] text-black font-semibold py-2 px-4 rounded-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_#00ffcc] hover:scale-[1.02]"
            >
              <span className="relative z-10">
                {loading ? "Sending..." : "Send OTP"}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ffcc] to-[#00bfff] opacity-50 blur-lg animate-pulse"></span>
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-300"
              >
                Enter the OTP sent to your email
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-transparent border border-[#00ffcc]/40 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ffcc]"
                placeholder="Enter OTP"
                required
              />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={verifyOTP}
              className="relative w-full bg-gradient-to-r from-[#00ffcc] to-[#00bfff] text-black font-semibold py-2 px-4 rounded-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_#00ffcc] hover:scale-[1.02]"
            >
              <span className="relative z-10">
                {loading ? "Verifying..." : "Verify OTP"}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ffcc] to-[#00bfff] opacity-50 blur-lg animate-pulse"></span>
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Enter New Password
              </label>
              <input
                id="password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-transparent border border-[#00ffcc]/40 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ffcc]"
                placeholder="Enter new password"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-transparent border border-[#00ffcc]/40 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ffcc]"
                placeholder="Confirm password"
                required
              />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={resetPassword}
              className="relative w-full bg-gradient-to-r from-[#00ffcc] to-[#00bfff] text-black font-semibold py-2 px-4 rounded-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_#00ffcc] hover:scale-[1.02]"
            >
              <span className="relative z-10">
                {loading ? "Resetting..." : "Reset Password"}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ffcc] to-[#00bfff] opacity-50 blur-lg animate-pulse"></span>
            </button>
          </form>
        )}

        <div
          className="text-sm text-center mt-4 text-[#00ffcc] cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
