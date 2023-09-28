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
}

const initialState: IUserInfo = {
  userId: '',
  username: '',
  email: '',
  stores: []
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
    }
  }
});

export const { setStores, updateStores } = UserInfo.actions;

export default UserInfo.reducer;
