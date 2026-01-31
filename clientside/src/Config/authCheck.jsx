import axios from "axios"
export const checkLogin = async()=>{
            await axios.get('http://localhost:3400/user/protected',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                });
            return true
    };
        
