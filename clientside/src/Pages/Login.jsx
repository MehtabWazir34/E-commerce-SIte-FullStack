// import api from "../api/axios";
import { useEffect, useState } from "react";
import { InPut, LaBel } from "../Inputs/InPuts.jsx"
// import LoginAccount from "./LoginAccount";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../Utility/axiosInstance.js'
import { useAuth } from "../Config/AuthProvider.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { useUser} from '../Utility/THEUser.jsx'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  let navigateTo = useNavigate()
  const [loading, setLoading] = useState(false);
  const {setLoggedIn} = useAuth()
  const { getUser } = useUser()
  useEffect(()=>{
    setEmail('')
    setPass('')
  },[])
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.post(`/user/login`, {email, password});
      if(res.data.token){
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true)
        navigateTo('/')
      }
      console.log(res);
      
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialRes) => {
    try {
        const res = await axiosInstance.post(`/user/google-auth`,{
          credential : credentialRes.credential
        });

        let token = res.data.token
        if(token){
          localStorage.setItem('token', token);
          await getUser()
          navigateTo('/');
        }
    } catch (error) {
      console.log("Google Auth fialed!", error);
      
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 font-sans antialiased text-gray-800 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        
        {/* Header Block with Clean Micro-Typography Layout */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">
            Welcome back!
          </h2>
          <p className="text-xs text-gray-400 mt-1.5 font-medium">
            Login to continue playing!
          </p>
        </div>

        {/* Input Elements Structural Global Form Element Hook Wrapper */}
        <form onSubmit={submitForm} autoComplete="off" className="space-y-4 flex flex-col justify-center w-full [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-400 [&_input]:bg-gray-50 [&_input]:border-transparent [&_input]:rounded-xl [&_input]:text-sm [&_input]:py-2.5 focus-within:[&_input]:border-purple-300 focus-within:[&_input]:bg-white">
          
          <div className="grid grid-cols-1 gap-1">
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

          <div className="grid grid-cols-1 gap-1">
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
            className="w-full mt-2 px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 hover:bg-purple-700 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* Minimalist Visual Line Splitter Elements */}
          <div className="flex items-center py-2">
            <div className="flex-1 h-px bg-gray-100"></div>
            <p className="px-3 text-gray-400 text-[10px] font-bold tracking-wider">OR</p>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* Google Single Sign-On Alignment Frame */}
          <div className="flex justify-center w-full [&_.nsm7bb-HzN1uf-jh178d]:rounded-full">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log("Google Login Failed")}
            />
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 font-medium mt-6">
          Don't have an account?{" "}
          <a href="/register" className="font-bold text-purple-600 hover:text-purple-700 transition-colors">
            Create Now
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;