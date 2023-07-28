import { useDispatch } from "react-redux";
import calendarApi from "../api/auth";
import { messageE, onLogin, clearMessage } from "../store/auth/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();

    const startRegister = async ({ username, email, password }) => {
        try {
            const { data } = await calendarApi.post("/auth/register", {
                username,
                email,
                password,
            });
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

    return {
        startRegister,
        startLogin,
    };
};
