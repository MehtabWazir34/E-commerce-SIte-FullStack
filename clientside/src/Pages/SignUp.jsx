// import api from "../api/axios";
import { useState } from "react";
import { InPut, LaBel } from "../Inputs/InPuts.jsx"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNo:"",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  let navigateTo = useNavigate()

  // const (a)=> setFormData({...formData, userName: a.target.value}) = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3400/user/register', formData)
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

        {/* Form */}
        <form onSubmit={submitForm} className="space-y-2 flex flex-col justify-center w-full">
          
          <div className="grid grid-cols-1">
            <LaBel lblFor={'fullName'} lblName={'FullName'} />
            <InPut
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(a)=> setFormData({...formData, fullName: a.target.value})}
              placeholder="e.g: Wazir Khan"
              // className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={'required'}
            />
          </div>

          <div className="grid grid-cols-1">
            <LaBel lblFor={'userName'}
              lblName={'UserName'}
            />
            <InPut
              type="text"
              id="userName"
              value={formData.userName}
              onChange={(a)=> setFormData({...formData, userName: a.target.value})}
              placeholder="e.g: wazir34"
              required={'required'}
            />
          </div>

          <div className="grid grid-cols-1">
            <LaBel lblFor="email" 
              lblName={'Email'}
            />
            <InPut
            placeholder={'Enter active@gmail.com'}
              type="email"
              id="email"
              value={formData.email}
              onChange={(a)=> setFormData({...formData, email: a.target.value})}
              required={'required'}
            />
          </div>
          <div className="grid grid-cols-1">
            <LaBel lblFor="phoneNo" 
              lblName={'Phone No'}
            />
            <InPut
              type="digit"
              id="phoneNo"
              placeholder={'Enter active phone Number'}
              value={formData.phoneNo}
              onChange={(a)=> setFormData({...formData, phoneNo: a.target.value})}
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
              value={formData.password}
              onChange={(a)=> setFormData({...formData, password: a.target.value})}
              placeholder="Minimum 6 characters"
              required={'required'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-1/2 mx-auto cursor-pointer mt-4 p-2 bg-[#FFE2AF] text-[#2C3639] rounded-full hover:bg-[#F2D39A] transition-colors disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center text-amber-500 my-4">Already have an account? <a href="/login" className="underline text-[#ffe2af]">Login Now</a></p>
      </div>
    </div>
  );
}

export default SignUp;
