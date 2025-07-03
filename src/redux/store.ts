import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi";
import { borrowApi } from "./api/borrowApi";
import bookSlice from "./features/bookSlice";

export const store = configureStore({
    reducer:{
        book: bookSlice.reducer,
        [bookApi.reducerPath]:bookApi.reducer,
        [borrowApi.reducerPath]:borrowApi.reducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(bookApi.middleware, borrowApi.middleware)
    }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;