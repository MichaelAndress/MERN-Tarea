import { useDispatch } from "react-redux";
import { onTask, deleteTask, addTask } from "../store/auth/taskSlice";
import { useSelector } from "react-redux";
import calendarApi from "../api/auth";

export const useTask = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth);
    
    

    const getTask = async () => {
        try {
            const { data } = await calendarApi.get("/task",{id: user.id});
            dispatch(onTask(data))
        } catch (error) {
            console.log(error);
        }
    };

    const onAddTask=async(task)=>{
        try {
            await calendarApi.post("/task",{title:task.title, description:task.description});
            dispatch(addTask(task))
        } catch (error) {
            console.log(error)
        }
    }
    const onDeleteTask =async(id)=>{
        try {
            await calendarApi.delete(`/task/${id}`);
            dispatch(deleteTask(id));
        } catch (error) {
            console.log({error})
        }
    }

    return {
        getTask,
        onDeleteTask,
        onAddTask
    };
};
