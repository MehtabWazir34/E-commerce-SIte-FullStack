// import api from "../api/axios";
import { useState } from "react";
import { InPut, LaBel } from "../Inputs/InPuts.jsx"
// import LoginAccount from "./LoginAccount";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  let navigateTo = useNavigate()
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3400/user/login', {email, password})
      localStorage.setItem("token", res.data.token);
      console.log(res);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
      navigateTo('/')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-[#2C3639] px-16 py-6 rounded-xl shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-6 border-b-2 border-[#FFE2AF] pb-2">
          <h2 className="text-2xl font-semibold text-[#F2D39A]">
            Welcome back!
          </h2>
          <p className="text-sm text-[#FFE2AF] mt-1">
            Login to continue playing!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitForm} className="space-y-4 flex flex-col justify-center w-full">
          
          <div className="grid grid-cols-1">
            <LaBel lblFor="email" 
              lblName={'Email'}
            />
            <InPut
            placeholder={'Enter active@gmail.com'}
              type="email"
              id="email"
              value={email}
              onChange={(a)=> setEmail(a.target.value)}
              required={'required'}
            />
          </div>

          <div className="grid grid-cols-1">
            <LaBel lblFor="password"
              lblName={'Password'}
            />
            <InPut
              type="password"
              id="password"
              value={password}
              onChange={(a)=> setPass(a.target.value)}
              placeholder="Minimum 6 characters"
              required={'required'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mx-auto w-1/2 cursor-pointer mt-4 p-2 bg-[#FFE2AF] text-[#2c3639] font-semibold rounded-full hover:bg-[#F2D39A] transition-colors disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="text-center text-amber-500 my-4">Don't have an account? <a href="/register" className="underline text-[#FFE2AF]">Create Now</a></p>
      </div>
    </div>
  );
}

export default Login;
