import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { setCart } from '../slices/Cart';

const fetchAllcartItems = createAsyncThunk('cart/fetchall', async (payload, thunkApi) => {
    try {
        const response = await api.getCart();
        return response.data;
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});

// export const DeleteButton = createAsyncThunk( async (payload, thunkApi) => { 
//     const { dispatch } = thunkApi;
//     const onDeleteCart = async () => {
//         try {
//             await fetchToDeleteItem(newItem);
//         } catch (err) {
//             return thunkApi.rejectWithValue(err);
//         }
//     };})
    
    // return ();

const createItem = (book, item = {}, quantity) => {
    const { title = book.title, id = book.id, count = 0, total = 0 } = item;

    return {
        title,
        id,
        count: count + quantity,
        total: total + book.price * quantity,
    };
};

export const fetchToAddItem = createAsyncThunk('cart/addItem', async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
        const { books } = thunkApi.getState().bookList;
        const { cart } = thunkApi.getState().cartList;
        const book = books.find(({ id }) => id === payload);
        const item = cart.find(({ id }) => id === payload);


        if (!item) {
            const newItem = {
                total: book.price,
                title: book.title,
                id: book.id,
                count: 1,
            }

            api.addCartItem(newItem);
            return dispatch((setCart([...cart, newItem])));
        } else {
            const newItem = {
                ...item,
                total: item.total + book.price,
                count: item.count + 1,
            };

            api.updateCartItem(newItem);
            return dispatch(setCart(cart.map((el) => (newItem.id === el.id ? newItem : el))));
        }
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});

export const fetchToRemoveItem = createAsyncThunk('cart/removeItem', async (payload, thunkApi) => {
    const { dispatch } = thunkApi
    try {
        const { books } = thunkApi.getState().bookList;
        const { cart } = thunkApi.getState().cartList;
        const book = books.find(({ id }) => id === payload);
        const item = cart.find(({ id }) => id === payload);

        const newItem = createItem(book, item, -1);

        if (item.count <= 1) {
            await api.deleteItem(payload)

            return dispatch(setCart(cart.filter(({ id }) => id !== payload)));

        } else {
            await api.updateCartItem(newItem);
            return dispatch(setCart(cart.map((el) => (newItem.id === el.id ? newItem : el))));
        }
    } catch (err) {
        return thunkApi.rejectWithValue(err)
    }
});


export const fetchToDeleteItem = createAsyncThunk('create/deleteItem', async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
        const { cart } = thunkApi.getState().cartList;

        await api.deleteItem(payload);
        return dispatch(setCart(cart.filter(({ id }) => id !== payload)))
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

        export default fetchAllcartItems;

// export const fetchToDeleteItem = createAsyncThunk('cart/deleteItem', async (payload, thunkApi) => {
//     const { dispatch } = thunkApi; 
//         try {
//         const { cart } = thunkApi.getState().cartList; 
//         const item = cart.find(({ id }) => id === payload);

//         if (item) {
//             api.deleteCartItem(item);
//             return dispatch(setCart(cart.filter((el) => el.id !== payload)));
//         }
//     } catch (err) {
//         return thunkApi.rejectWithValue(err);
//     }});

// if(item.count <= 1){
//             await api.deleteItem(payload)

//             return dispatch (setCart (cart.filter(({id}) => id !== payload)));

//         }else{
//             await api.updateCartItem(deleteItem);
//             return dispatch (setCart (cart.map((el) => (deleteItem.id === el.id ? deleteItem : el))));
//         }
//     }catch (err) {
//         return thunkApi.rejectWithValue(err)
//     }
// });

// if(item.count <= 1){
//     await api.deleteItem(payload)

//     return dispatch (setCart (cart.filter(({id}) => id !== payload)));

// }else{
//     const newItem = {
//         ...item,
//         total: item.total * 0,
//         count: item.count * 0,
//     };
//     await api.updateCartItem(newItem);
//     return dispatch (setCart (cart.map((el) => (newItem.id === el.id ? newItem : el))));
// // }