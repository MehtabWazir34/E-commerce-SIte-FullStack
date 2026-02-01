import axios from "axios"
export const checkLogin = async()=>{
           try {
            let res = await axios.get("http://localhost:3400/user/protected",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }

            });
            return res.data.LoggedIn === true
           } catch (error) {
                console.log("Error",error);
                return false
                
           }
    };
        
