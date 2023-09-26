import { createSlice } from '@reduxjs/toolkit';

interface IUserInfo {
  userId: number | string;
  username: string;
  email: string;
  projects: {
    imageURL: string;
  }[];
}
const initialState: IUserInfo = {
  userId: '',
  username: '',
  email: '',
  projects: [
    {
      imageURL: 's'
    }
  ]
};

const UserInfo = createSlice({
  name: 'user-info',
  initialState,
  reducers: {
    // change(state, action) {
    //   state.open = action.payload;
    // }
  }
});

export const {} = UserInfo.actions;

export default UserInfo.reducer;
