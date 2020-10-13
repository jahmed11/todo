import * as actionTypes from "../actions/actions";

const initialState = {
  userName: "",
  userId: null,
  token: null,
  redirect: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_DATA:
      return {
        ...state,
        userName: action.userName,
        userId: action.userId,
        token: action.token,
      };
    case actionTypes.REDIRECT:
      return {
        ...state,
        redirect: !state.redirect,
      };
    default:
      return state;
  }
};

export default reducer;
