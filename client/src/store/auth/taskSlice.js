import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name:'task',
    initialState:{
        tasks:[],
        ok:false
    },
    reducers:{
        onTask:(state, {payload})=>{
            state.tasks= payload;
            state.ok= true;
        },
        addTask:(state,{payload})=>{
            state.tasks.push(payload)
        },
        deleteTask:(state, {payload})=>{
            state.tasks = state.tasks.filter((t)=>t._id !== payload)
        },
        updateTask:(state, {payload})=>{
            state.tasks = state.tasks.map((tarea)=>{
                if (tarea.id === payload.id) {
                    return payload;
                }
                return tarea;
            })
        },
        onLogoutTask:(state)=>{
            state.tasks=[];
        }
    }
});
export const {onTask, deleteTask, addTask, onLogoutTask, updateTask}= taskSlice.actions;