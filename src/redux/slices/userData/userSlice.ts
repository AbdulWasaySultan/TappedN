import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  uid: string;
  name: string;
  email: string;
  address: string;
  contactNo: string;
  profileImage: string;
  isLoggedIn: boolean;

    location?: {           // For the location feature
    latitude: number;
    longitude: number;
    updatedAt: any;
  };
}

const initialState: UserState = {
  uid: '',
  name: '',
  email: '',
  address: '',
  contactNo: '',
  profileImage: '',
  isLoggedIn: false,

    location : {           // For the location feature
    latitude: 0,
    longitude: 0,
    updatedAt: ''
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, isLoggedIn: true };
    },
    clearUser: () => initialState,
    updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, isLoggedIn: true };
    },
  },
});

export const { setUser, clearUser, updateProfile } = userSlice.actions;
export default userSlice.reducer;