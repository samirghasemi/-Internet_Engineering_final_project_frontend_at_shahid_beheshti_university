import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
const shopReducer = (
  state = { clicked: false, item: {}, signin: false, signintoken: "" },
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
    default:
      return state;
  }
};
const store = createStore(shopReducer, composeWithDevTools());
export default store;
