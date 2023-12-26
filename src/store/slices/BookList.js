import { createSlice } from "@reduxjs/toolkit";
import fetchAllBooks from "../reducer/BookListCreated";

const initialState = {
    books: [],
    isLoading: false,
    booksError: '',
    bookListStatus: 'pending',
};

const bookListSlice = createSlice({
    name: 'Books',
    initialState,
    reducers: {
        setBooksError: (state, action) =>{
            state.booksError = action.payload;
            state.isLoading = false;
        },
    },

    extraReducers: (builder) =>{
        builder.addCase(fetchAllBooks.pending, (state, action) =>{
            state.books = [];
            state.booksError = '';
            state.isLoading = true;
            state.bookListStatus = 'pending';
        });

        builder.addCase(fetchAllBooks.fulfilled, (state, action) =>{
            state.books = action.payload;
            state.isLoading = false;
            state.bookListStatus = 'fulfilled';
        });

        builder.addCase(fetchAllBooks.rejected, (state, action) =>{
            state.booksError = action.payload;
            state.isLoading = false;
            state.bookListStatus = 'rejected';
        });
    },
});

const bookListReducer = bookListSlice.reducer;

export const { setBooksError } = bookListSlice.actions;
export default bookListReducer;