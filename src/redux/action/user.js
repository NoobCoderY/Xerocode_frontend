import axios from "axios";
import { server } from "../store";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const { data } = await axios.get(`${server}/auth/google/me`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
          },
    });
    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: "logoutSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};

export const githubLoadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "loadUserRequest",
      });
  
      const { data } = await axios.get(`${server}/auth/github/me`, {
          withCredentials: true,
          headers: {
              "Content-Type": "application/json",
            },
      });
       
  
      dispatch({
        type: "loadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "loadUserFail",
        
      });
    }
  };

