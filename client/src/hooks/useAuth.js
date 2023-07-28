import { useDispatch } from "react-redux"
import calendarApi from "../api/auth"
import { onLogin } from "../store/auth/authSlice";



export const useAuth = () => {
    const dispatch = useDispatch();

    const startRegister =async({username, email, password})=>{
        try {
            const {data} = await calendarApi.post("/auth/register",{username, email, password})
            console.log(data)
            console.log(data.email)
            dispatch(onLogin({id:data.id, username:data.username}))
        } catch (error) {
            console.log(error)
        }
    }




  return {
    startRegister,
  }
}
