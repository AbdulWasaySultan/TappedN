import { authInstance } from '../screens/Firebase/firebaseConfig';
import { clearUser } from '../redux/userSlice';

export const handleGlobalLogout = async (dispatch: any) => {
  try {
    await authInstance.signOut();
    dispatch(clearUser());
    return true; // Success
  } catch (error) {
    console.error("Logout Error:", error);
    return false; // Failed
  }
};