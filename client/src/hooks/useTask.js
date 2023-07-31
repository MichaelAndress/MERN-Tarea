import { useDispatch } from "react-redux";
import { onTask } from "../store/auth/taskSlice";
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

    const addTask=async(task)=>{
        try {
            const {data} = await calendarApi.post("/task",{title:task.title, description:task.description});
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getTask,
        addTask
    };
};
