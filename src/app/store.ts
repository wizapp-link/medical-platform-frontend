import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import doctorReducer from "../features/doctor/doctorSlice";
import userRegisterReducer from "../features/auth/userRegisterSlice"
import userLogInReducer from '../features/auth/userLogInSlice';
import personnelListReducer from "../features/manager/personnelsSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    doctor: doctorReducer,
    userRegister: userRegisterReducer,
    userLogIn: userLogInReducer,
    personnelList: personnelListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
