//actually a FUNCTION
// import { SETS } from "../actions/types.js";

export const sets = (
  state = { sidebarShow: "responsive" },
  { type, ...rest }
) => {
  switch (type) {
    case "set":
      return {
        ...state,
        ...rest,
      };
    default:
      return state;
  }
};

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case "set":
//       return { ...state, ...rest };
//     default:
//       return state;
//   }
// };
