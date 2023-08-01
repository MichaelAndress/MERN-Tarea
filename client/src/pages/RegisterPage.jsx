import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
    const { register, handleSubmit } = useForm();
    const { startRegister } = useAuth();
    const { messageError } = useSelector((state) => state.auth);

    const onSubmit = handleSubmit(async (values) => {
        startRegister(values);
    });

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                {messageError !== "" ? (
                    <div className="bg-red-500 p-2 text-white">
                        {messageError}
                    </div>
                ) : (
                    <div className=""></div>
                )}
                <h1 className="text-2xl font-bold">Register</h1>

                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        {...register("username", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className="text-white py-2 mb-2 px-4 bg-slate-400"
                    >
                        Register
                    </button>
                </form>
                <p>
                    Do you already have an account?
                    <Link className="font-bold" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};
