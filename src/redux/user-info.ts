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
  selectedProduct: IStaticsProducts | null;
}

const initialState: IUserInfo = {
  userId: '',
  username: '',
  email: '',
  stores: [],
  activeStore: null,
  selectedProduct: null
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
    changeStores(state, action) {
      const stores = state.stores.filter((store) => store.storeId !== action.payload.storeId);
      state.stores = [...stores, action.payload];
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
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    }
  }
});

export const {
  setStores,
  updateStores,
  changeStores,
  removeStore,
  setActiveStore,
  setSelectedProduct
} = UserInfo.actions;

export default UserInfo.reducer;
