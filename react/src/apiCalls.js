
import axios from 'axios';

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    return res.data; // Ensure this returns data on success
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    throw err; // Ensure this throws an error to be caught in the component
  }
};
