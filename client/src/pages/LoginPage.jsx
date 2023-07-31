import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { startLogin } = useAuth();
    const { messageError } = useSelector((state) => state.auth);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (status === 'authenticated') {
    //         navigate("/tasks");
    //     }
    // });

    const onSubmit = handleSubmit((data) => {
        startLogin(data);
    });

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10">
                {messageError !== "" ? (
                    <div className="bg-red-500 p-2 text-white">
                        {messageError}
                    </div>
                ) : (
                    <div className=""></div>
                )}

                <h1 className="text-2xl font-bold">Login</h1>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        {...register("username", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Username"
                    />
                    {errors.username && (
                        <p className="text-red-500">Username is required</p>
                    )}
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="text-red-500">Password is required</p>
                    )}
                    <button className="text-white py-2 mb-2 px-4 bg-slate-400" type="submit">
                        Login
                    </button>
                </form>
                <p >
                    Dont have an account?
                    <Link className="font-bold" to="/register">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};
