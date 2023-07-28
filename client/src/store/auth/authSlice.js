import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        status:false,
        user:{},
    },
    reducers:{
        onLogin:(state, {payload})=>{
            state.status = true;
            state.user = payload;
            console.log(state.user)
        }
    }
});

export const { onLogin } = authSlice.actions;
