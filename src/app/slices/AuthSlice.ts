import {createSlice} from '@reduxjs/toolkit'
import { string } from 'prop-types';

interface authInitialState {
   userInfo:
      | {
         uid:string;
         email:string;
         name:string;
      }
      | underfined;
      isDarkTheme:boolean;
   }


 const initialState:authInitialState={
   userInfo:undefined,
   isDarkTheme:false,
 };
 export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
      changeTheme:(state,action)=>{
         state.isDarkTheme = action.payload.isDarkTheme;
      },
      setUser:(state,action)=>{
         state.userInfo = action.payload;
      }
    },

 })
 export const {setUser,changeTheme}=authSlice.actions;