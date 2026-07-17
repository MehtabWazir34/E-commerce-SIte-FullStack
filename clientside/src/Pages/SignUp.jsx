import { useEffect, useState } from "react";
import { InPut, LaBel } from "../Inputs/InPuts.jsx";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../Utility/axiosInstance.js'
import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "../Utility/THEUser.jsx";
import { useAuth } from "../Config/AuthProvider.jsx";

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
  const { getUser } = useUser();
  const {setLoggedIn} = useAuth()
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
      if(res.data.token){
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true);
        navigateTo("/");
      }
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
      if(res.data.token){
        localStorage.setItem("token", res.data.token);
        await getUser()
        navigateTo("/");
      }

    } catch (error) {
      console.log("Google signup failed", error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 font-sans antialiased text-gray-800 px-4 py-8">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-gray-100">

        {/* Header Block with Clean Micro-Typography Layout */}
        <div className="text-center mb-6 w-full">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">
            Create Account
          </h2>

          <p className="text-xs text-gray-400 mt-1.5 font-medium">
            Join now to start playing!
          </p>
        </div>

        {/* Input Elements Structural Global Form Element Hook Wrapper */}
        <form
          onSubmit={submitForm}
          className="space-y-4 flex flex-col justify-center w-full [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-400 [&_input]:bg-gray-50 [&_input]:border-transparent [&_input]:rounded-xl [&_input]:text-sm [&_input]:py-2.5 focus-within:[&_input]:border-purple-300 focus-within:[&_input]:bg-white"
        >

          <div className="grid gap-1">
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

          <div className="grid gap-1">
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

          <div className="grid gap-1">
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

          <div className="grid gap-1">
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

          <div className="grid gap-1">
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
            className="w-full mt-2 px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 hover:bg-purple-700 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Minimalist Visual Line Splitter Elements */}
        <div className="flex items-center py-2 my-4">
          <div className="flex-1 h-px bg-gray-100"></div>
          <p className="px-3 text-gray-400 text-[10px] font-bold tracking-wider">OR</p>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* Google Single Sign-On Alignment Frame */}
        <div className="flex justify-center w-full [&_.nsm7bb-HzN1uf-jh178d]:rounded-full">
          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => console.log("Google Login Failed")}
          />
        </div>

        <p className="text-center text-xs text-gray-400 font-medium mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-bold text-purple-600 hover:text-purple-700 transition-colors"
          >
            Login Now
          </a>
        </p>

      </div>
    </div>
  );
}

export default SignUp;