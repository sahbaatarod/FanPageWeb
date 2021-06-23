import { CALL, LOGIN, LOGOUT, ADMIN, NO_ADMIN, MSG } from "./type";

const initialState = {
  name: "max",
  loggedIn: false,
  admin: false,
  message: "old",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CALL:
      console.log("action called");
      return state;
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    case ADMIN:
      return {
        ...state,
        admin: true,
      };
    case NO_ADMIN:
      return {
        ...state,
        admin: false,
      };
    case MSG:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
