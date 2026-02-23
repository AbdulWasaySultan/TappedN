import { authInstance } from '../Firebase/firebaseConfig';
import { clearUser } from '../redux/userSlice';
import Text from 'react-native'

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
