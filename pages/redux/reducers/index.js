import { combineReducers } from '@reduxjs/toolkit';
import user from './user';
// import character from './character';
// import counter from './counter';
// import auth from './user';
// import profile from './profile';

const reducer = combineReducers({
  user,
  //   berhitung: counter,
  //   character,
  //   user: auth,
  //   profile,
});

export default reducer;
