import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        status:'cheking',
        user:{},
        messageError:''
    },
    reducers:{
        onLogin:(state, {payload})=>{
            state.status = 'authenticated';
            state.user = payload;
        },
        messageE:(state,{payload})=>{
            state.messageError = payload
        },
        clearMessage:(state)=>{
            state.messageError=''
        },
        onLogout:(state)=>{
            state.status='cheking';
            state.user={};
            state.messageError='';
        }

    }
});

export const { onLogin, messageE, clearMessage, onLogout } = authSlice.actions;
