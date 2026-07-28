import { authInstance } from '../../services/firebase/firebaseConfig';
import { clearUser } from '../../redux/slices/userSlice';
// updating the state of the app when the user logs out

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
