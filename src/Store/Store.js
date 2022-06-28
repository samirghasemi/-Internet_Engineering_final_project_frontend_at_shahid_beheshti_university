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
      return { clicked: false, item: {} };
    default:
      return state;
  }
};
const store = createStore(shopReducer, composeWithDevTools());
export default store;
