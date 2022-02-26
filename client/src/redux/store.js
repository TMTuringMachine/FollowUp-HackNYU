import { configureStore } from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import rootReducer from './rootReducer';

const store = configureStore({
    reducer:rootReducer,
    devTools:process.env.NODE_ENV !== "production"
})

const persistor = persistStore(store)

export {store,persistor};