import { configureStore } from "@reduxjs/toolkit";
import bookListReducer from "./slices/BookList";
import cartReducer from "./slices/Cart";

const reducer = {
    bookList: bookListReducer,
    cartList: cartReducer,
};

const store = configureStore({ reducer });
export default store;