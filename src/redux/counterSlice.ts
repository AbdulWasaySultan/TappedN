import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  name: string;
  email: string;
  password: string;
  address: string;
  contactNo: string;
  profileImage: string;
  isLoggedIn: boolean;
  newPassword: string;
};

const initialState : UserState ={
  name: '',
  email: '',
  password: '',
  address: '',
  contactNo: '',
  profileImage: '',
  newPassword: '',
  isLoggedIn: false
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   registerUser : (state, action : PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
const {name, email, contactNo, password, address, profileImage} = action.payload;

    state.name = name,
    state.email = email,
    state.contactNo = contactNo,
    state.password = password,
    state.address = address,
    state.profileImage = profileImage,
    state.isLoggedIn = true
  },

  loginUser : (state, action : PayloadAction<{email : string, password : string}>) => {
state.email = action.payload.email,
state.password = action.payload.password
state.isLoggedIn = true
  },

  logoutUser : (state) => {
    state.isLoggedIn = false
    Object.assign(state, initialState)
  },

  updateProfile : (state, action : PayloadAction<{name : string, contactNo : string, address : string, profileImage : string}>) => {

    state.name = action.payload.name,
    state.contactNo = action.payload.contactNo,
    state.address = action.payload.address,
    state.profileImage = action.payload.profileImage  
  }, 
}
})

export const {loginUser,registerUser, logoutUser,updateProfile } = userSlice.actions;

export default userSlice.reducer;
