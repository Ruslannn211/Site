import {configureStore} from '@reduxjs/toolkit';
import {type TypedUseSelectorHook, useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import globalReducer from './global';

const store = configureStore({
    reducer: {
        global: globalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

// Тип для RootState
export type RootState = ReturnType<typeof store.getState>;

// Тип для AppDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useStore: TypedUseSelectorHook<RootState> = useSelector;

export default store;
