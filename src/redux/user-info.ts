import { createSlice } from '@reduxjs/toolkit';
import { GetUserAuth } from '../utils/helpers';

interface IUserInfo {
  userId: number | string;
  username: string;
  email: string;
  stores: {
    storeId: number;
    storeType: string;
    title: string;
    apiToken: string;
  }[];
  activeStore: IStores | null;
  userAuth: boolean;
}

const initialState: IUserInfo = {
  userId: '',
  username: '',
  email: '',
  stores: [],
  activeStore: null,
  userAuth: GetUserAuth()
};

const UserInfo = createSlice({
  name: 'user-info',
  initialState,
  reducers: {
    setStores(state, action) {
      state.stores = action.payload;
    },
    updateStores(state, action) {
      state.stores = [...state.stores, action.payload];
    },
    removeStore(state, action) {
      state.stores = state.stores?.filter((store) => store.storeId !== action.payload);
    },
    setActiveStore(state, action) {
      state.activeStore = action.payload;
    },
    setUserInfo(state, action) {
      state.activeStore = action.payload;
    },
    setUserAuth(state, action) {
      state.userAuth = action.payload;
    }
  }
});

export const { setStores, updateStores, removeStore, setActiveStore, setUserAuth } =
  UserInfo.actions;

export default UserInfo.reducer;
