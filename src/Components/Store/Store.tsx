import { combineSlices, configureStore } from "@reduxjs/toolkit";
import UserSlice from './UserSlice';


const Store = configureStore({
  reducer: combineSlices(UserSlice),
});
export type RootStore = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;