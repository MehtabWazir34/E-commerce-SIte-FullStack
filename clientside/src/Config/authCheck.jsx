import axiosInstance from "../Utility/axiosInstance";
export const checkLogin = async()=>{
           try {
            let res = await axiosInstance.get(`/user/protected`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            // console.log(res.data);
            
            return res.data.LoggedIn === true
           } catch (error) {
                console.log("Error",error);
                return false
           }
    };