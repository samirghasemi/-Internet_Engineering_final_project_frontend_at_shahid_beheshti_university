import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
const shopReducer = (state = { clicked: false, item: {} }, action) => {
  switch (action.type) {
    case "Clicked":
      return {
        clicked: !state.clicked,
        item: state.clicked ? {} : action.payload,
      };
    case "delete":
      return { ...action, clicked: false };
    case "link":
      return { ...state, clicked: false };
    default:
      return state;
  }
};
const store = createStore(shopReducer, composeWithDevTools());
export default store;
