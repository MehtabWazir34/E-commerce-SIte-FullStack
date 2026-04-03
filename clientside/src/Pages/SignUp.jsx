import { useEffect, useState } from "react";
import { InPut, LaBel } from "../Inputs/InPuts.jsx";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../Utility/axiosInstance.js'
import { GoogleLogin } from "@react-oauth/google";

function SignUp() {

  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNo: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosInstance.post(
        "/user/register",
        formData
      );

      localStorage.setItem("token", res.data.token);

      navigateTo("/");

    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {

      const res = await axiosInstance.post(
        `/user/google-auth`,
        {
          credential: credentialResponse.credential
        }
      );

      localStorage.setItem("token", res.data.token);

      navigateTo("/");

    } catch (error) {
      console.log("Google signup failed", error);
    }
  };

  useEffect(()=>{
    handleGoogleSignup();
  },[])
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md bg-[#2C3639] p-6 px-16 rounded-xl shadow-lg">

        {/* Header */}

        <div className="text-center mb-6 border-b-2 border-[#F2D39A] w-full pb-2">
          <h2 className="text-2xl font-semibold text-[#F2D39A]">
            Create Account
          </h2>

          <p className="text-sm text-[#FFE2AF] mt-1">
            Join now to start playing!
          </p>
        </div>

        <form
          onSubmit={submitForm}
          className="space-y-2 flex flex-col justify-center w-full"
        >

          <div className="grid">
            <LaBel lblFor="fullName" lblName="Full Name" />

            <InPut
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g: Wazir Khan"
              required
            />
          </div>

          <div className="grid">
            <LaBel lblFor="userName" lblName="User Name" />

            <InPut
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="e.g: wazir34"
              required
            />
          </div>

          <div className="grid">
            <LaBel lblFor="email" lblName="Email" />

            <InPut
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter active@gmail.com"
              required
            />
          </div>

          <div className="grid">
            <LaBel lblFor="phoneNo" lblName="Phone No" />

            <InPut
              type="tel"
              id="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Enter active phone number"
              required
            />
          </div>

          <div className="grid">
            <LaBel lblFor="password" lblName="Password" />

            <InPut
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-1/2 mx-auto cursor-pointer mt-4 p-2 bg-[#FFE2AF] text-[#2C3639] rounded-md hover:bg-[#F2D39A] transition-colors disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Divider */}

        <div className="flex items-center my-5">
          <div className="flex-1 h-1 bg-[#F2D39A]"></div>
          <p className="px-3 text-[#FFE2AF] text-sm">OR</p>
          <div className="flex-1 h-1 bg-[#F2D39A]"></div>
        </div>

        {/* Google Sign Up */}

        <div className="flex justify-center">

          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => console.log("Google Login Failed")}
          />

        </div>

        <p className="text-center text-amber-500 my-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="underline text-[#ffe2af]"
          >
            Login Now
          </a>
        </p>

      </div>
    </div>
  );
}

export default SignUp;