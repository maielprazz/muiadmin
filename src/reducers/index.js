import { combineReducers } from 'redux';
import { userLoginReducer } from './userReducers';

// const initialState = {};

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest };
//     default:
//       return state;
//   }
// };

export const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  // sidebarShow: changeState,
});
