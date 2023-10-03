import { createSlice } from '@reduxjs/toolkit';

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
}

const initialState: IUserInfo = {
  userId: '',
  username: '',
  email: '',
  stores: [],
  activeStore: null
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
    }
  }
});

export const { setStores, updateStores, removeStore, setActiveStore } = UserInfo.actions;

export default UserInfo.reducer;
