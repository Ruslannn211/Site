// /src/store/features/auth/index.ts
import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user/slice.ts';

const globalReducer = combineReducers({
    user: userReducer,
});

export default globalReducer;
