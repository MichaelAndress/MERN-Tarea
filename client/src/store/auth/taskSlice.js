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
    }
});
export const {onTask}= taskSlice.actions;