import { useForm } from "react-hook-form";
import { useTask } from "../hooks/useTask";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const TaskFormPage = () => {
    const { register, handleSubmit, setValue } = useForm();
    const {onAddTask, onUpdateTask} =useTask();
    const navigate = useNavigate();
    const { tasks } = useSelector((state)=>state.task)
    const {id} =useParams();

    const onsubmit= handleSubmit((data)=>{
        if (!id) {
            onAddTask(data);
            navigate("/tasks")
            return
        }
        onUpdateTask({id,...data})
        navigate("/tasks")
    })

    useEffect(() => {
        if (!id) {
            return
        }
        const tarea = tasks.filter((t)=>t._id === id)
        setValue('title', tarea[0].title);
        setValue('description', tarea[0].description);
    }, [])
    
        
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form onSubmit={ onsubmit }>
                <input
                    name="title"
                    type="text"
                    placeholder="title"
                    {...register("title")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <textarea placeholder="description" name="description" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" {...register("description")}></textarea>
                <button type="submit">
                    Save
                    </button>
            </form>
        </div>
    );
};
