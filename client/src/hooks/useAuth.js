import { useDispatch } from "react-redux";
import calendarApi from "../api/auth";
import { messageE, onLogin, clearMessage, onLogout } from "../store/auth/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();

    const startRegister = async ({ username, email, password }) => {
        try {
            const { data } = await calendarApi.post("/auth/register", {
                username,
                email,
                password,
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ id: data.id, username: data.username }));
        } catch (error) {
            console.log(error);
        }
    };
    const startLogin = async ({ username, password }) => {
        try {
            const { data } = await calendarApi.post("/auth/login", {
                username,
                password,
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ id: data.id, username: data.username }));
        } catch (error) {
            const err = [error.response.data?.message]
            err.map((e)=>{
                dispatch(messageE(e));

            })
            setTimeout(() => {
                dispatch(clearMessage());
            }, 3000);
        }
    };
    const startVerify =async()=>{
        const token = localStorage.getItem('token');
        if (!token) {
          return console.log('no hay token');
        }
        try {
          const { data } = await calendarApi.get('/auth/verify');
          localStorage.setItem('token', data.token);
          localStorage.setItem('token-init-date', new Date().getTime());
          dispatch(onLogin({ id: data.id, username: data.username }));
    
        } catch (error) {
          localStorage.clear();
          dispatch(onLogout());
        }
    }
    const startLogout=()=>{
        localStorage.clear();
    }

    return {
        startRegister,
        startLogin,
        startVerify,
        startLogout
    };
};
