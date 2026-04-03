import axiosInstance from "../Utility/axiosInstance.js";
export const checkLogin = async()=>{
           try {
            let res = await axiosInstance.get(`/user/protected`);
            // console.log(res.data);
            
            return res.data.LoggedIn === true
           } catch (error) {
                console.log("Error",error);
                return false
           }
    };