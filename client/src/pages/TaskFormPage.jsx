import { useForm } from "react-hook-form";
import { useTask } from "../hooks/useTask";
import { useNavigate } from "react-router-dom";

export const TaskFormPage = () => {
    const { register, handleSubmit } = useForm();
    const {onAddTask} =useTask();
    const navigate = useNavigate();

    const onsubmit= handleSubmit((data)=>{
        onAddTask(data);
        navigate("/tasks")
    })
    
    
    
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form onSubmit={ onsubmit }>
                <input
                    type="text"
                    placeholder="title"
                    {...register("title")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <textarea placeholder="description" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" {...register("description")}></textarea>
                <button type="submit">
                    Save
                    </button>
            </form>
        </div>
    );
};
