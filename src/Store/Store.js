import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
const shopReducer = (
  state = {
    clicked: false,
    item: {},
    signin: false,
    signintoken: "",
    admin: false,
    id: "",
  },
  action
) => {
  switch (action.type) {
    case "Clicked":
      return {
        ...state,
        clicked: !state.clicked,
        item: action.payload,
      };
    case "delete":
      return { ...state, clicked: false };
    case "link":
      return { ...state, clicked: false };
    case "sign_in":
      return {
        ...state,
        signin: true,
        signintoken: action.payload.token,
        id: action.payload.id,
        admin: action.payload.admin,
      };
    case "sign_out":
      return { ...state, signin: false, signintoken: "" };
    default:
      return state;
  }
};
const store = createStore(shopReducer, composeWithDevTools());
export default store;
