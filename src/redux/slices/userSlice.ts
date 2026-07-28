
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  uid: string;
  name: string;
  email: string;
  address: string;
  contactNo: string;
  profileImage: string;
  isLoggedIn: boolean;
  role: 'consumer' | 'provider' | null; // ✅ Add role
  location?: {
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
  role: null, // ✅ Initialize as null
  location: {
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
    setUserRole: (state, action: PayloadAction<'consumer' | 'provider'>) => {
      state.role = action.payload;
    },
    clearUser: () => initialState,
    updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, isLoggedIn: true };
    },
  },
});


export const { setUser, clearUser, updateProfile, setUserRole } = userSlice.actions;
export default userSlice.reducer;