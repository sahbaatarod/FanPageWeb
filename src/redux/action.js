import { CALL, LOGIN, LOGOUT, ADMIN, NO_ADMIN, MSG } from "./type";

export const callAction = () => {
  return {
    type: CALL,
  };
};

export const login = () => {
  return {
    type: LOGIN,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const admin = () => {
  return {
    type: ADMIN,
  };
};

export const notAdmin = () => {
  return {
    type: NO_ADMIN,
  };
};

export const setMessage = (value) => {
  return {
    type: MSG,
    payload: value,
  };
};
