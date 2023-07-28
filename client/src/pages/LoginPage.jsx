import {useForm} from "react-hook-form";
import {useAuth} from "../hooks/useAuth";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const {startLogin} = useAuth();
    const {status} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === true) {
            navigate("/tasks");
        }
    });

    const onSubmit = handleSubmit((data) => {
        startLogin(data);
    });

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10">
                <h1 className="text-2xl font-bold">Login</h1>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        {...register("username", {required: true})}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Username"
                    />
                    {errors.username && (
                        <p className="text-red-500">Username is required</p>
                    )}
                    <input
                        type="password"
                        {...register("password", {required: true})}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="text-red-500">Password is required</p>
                    )}
                    <button className="text-white" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};
