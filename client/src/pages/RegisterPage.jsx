import {useForm} from "react-hook-form";
import {useAuth} from "../hooks/useAuth";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const RegisterPage = () => {
    const {register, handleSubmit} = useForm();
    const {startRegister} = useAuth();
    const {status} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'authenticated') {
            navigate("/tasks");
        }
    });

    const onSubmit = handleSubmit(async (values) => {
        startRegister(values);
    });

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    {...register("username", {required: true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Username"
                />
                <input
                    type="email"
                    {...register("email", {required: true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Email"
                />
                <input
                    type="password"
                    {...register("password", {required: true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
