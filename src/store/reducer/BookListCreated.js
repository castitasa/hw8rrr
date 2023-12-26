import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

const fetchAllBooks = createAsyncThunk('Booklist/fetchall', async (payload, thunkApi) =>{
    try {
        const response = await api.getBook();

        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error?.response || error.message);
    }
});

export default fetchAllBooks;