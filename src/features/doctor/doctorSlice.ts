import { createSlice } from '@reduxjs/toolkit'
import { RootState } from "../../app/store";
import { bottomNavigationActionClasses } from "@mui/material";

export interface doctorState {
  id: string;
  email:string;
  password:string | null;
  role: string;
  name: string;
  address: string;
  dob: string;
  phone: string;
  registrationNo: string | null;
  status: string;
}


const initialState : doctorState =
  { id: "6400e5813cb00827c1c8bdde",
    email: "shubhankar@gmail.com",
    password: "123",
    role: "ROLE_PATIENT",
    name: "Shubhankar Kulkarni",
    address: "ch de la cote-des-neiges",
    dob: "22-03-1998",
    phone: "4379860077",
    registrationNo: null,
    status: "VERIFIED" }

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers:{
    profileUpdate(state, action){
      const {email, name, dob, phone, address, registrationNo} = action.payload
      state.email = email;
      state.name = name;
      state.dob = dob;
      state.phone = phone;
      state.address = address;
      state.registrationNo = registrationNo;
    },
    passwordUpdate(state, action){
      const psw = action.payload
      state.password = psw
    }
  }
})


export const { profileUpdate,passwordUpdate } = doctorSlice.actions
export default doctorSlice.reducer

