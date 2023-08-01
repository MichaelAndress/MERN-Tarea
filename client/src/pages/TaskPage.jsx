import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTask } from "../hooks/useTask";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";


export const TaskPage = () => {
    const { getTask, onDeleteTask } = useTask();
    const { startLogout } = useAuth();
    const { tasks } = useSelector((state) => state.task);

    useEffect(() => {
        getTask();
    }, []);

    const logout = () => {
        startLogout();
        location.reload();
    };
    const handlerDelete = (id) => {
        console.log(id);
        onDeleteTask(id);
    };

    return (
        <div>
            <div className="my-5">
                <Link
                    className="font-bold p-2 bg-red-500 rounded-md"
                    to="/add-task"
                >
                    Add Task
                </Link>
                <button
                    onClick={logout}
                    className="p-2 bg-slate-400 rounded-md"
                >
                    Logout
                </button>

                {tasks.length === 0 && (
                    <div className="flex justify-center items-center p-10">
                        <div>
                            <h1 className="text-6xl text-gray-400 m-auto my-2" />
                            <h1 />
                            <h1 className="font-bold text-xl">
                                No tasks yet, please add a new task
                            </h1>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {tasks&&tasks.map((task) => (
                    <div
                        key={task._id}
                        className="bg-zinc-800 max-w-md w-full p-10 rounded-md"
                    >
                        <header className="flex justify-between">
                            <h1 className="text-2xl font-bold">
                                {task.title.toUpperCase()}
                            </h1>
                            <div className="flex gap-x-2 items-center">
                                <button
                                    className="bg-red-500 p-2 rounded-md"
                                    onClick={() => handlerDelete(task._id)}
                                >
                                    Delete
                                </button>
                                <button className="bg-green-500 p-2 rounded-md">
                                    Edit
                                </button>
                            </div>
                        </header>
                        <p className="text-slate-300">{task.description}</p>
                        {/* format date */}
                        <p>
                            {task.date &&
                                new Date(task.date).toLocaleDateString(
                                    "es-CL",
                                    {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
