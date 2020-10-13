import * as actionType from "./actions";

export const getUserData = (name, id, token) => {
  return {
    type: actionType.USER_DATA,
    userName: name,
    userId: id,
    token: token,
  };
};

export const redirect = () => {
  return {
    type: actionType.REDIRECT,
  };
};
