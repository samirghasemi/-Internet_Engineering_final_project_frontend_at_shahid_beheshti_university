import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
const shopReducer = (
  state = {
    clicked: false,
    item: {},
    signin: localStorage.getItem("token") !== null ? true : false,
    signintoken:
      localStorage.getItem("token") === null
        ? ""
        : localStorage.getItem("token"),
    admin:
      localStorage.getItem("admin") !== null
        ? localStorage.getItem("admin")
        : false,
    id: localStorage.getItem("id") === null ? "" : localStorage.getItem("id"),
    search: [],
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
      return { ...state, signin: false, signintoken: "", id: "", admin: false };
    case "search":
      return { ...state, search: action.payload.searched };
    default:
      return state;
  }
};
const store = createStore(shopReducer, composeWithDevTools());
export default store;
