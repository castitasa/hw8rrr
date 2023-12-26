// import React, { useEffect } from 'react';
import { BookList, Cart } from '../../Components';
// import { api } from '../../api/api';

const Main = () => {

    // useEffect(() => {
    //     api.getBook().then((res) =>{
    //         console.log(res);
    //     });
    // }, []);

    return (
        <main className='container'>
            <BookList />

            <Cart/>
        </main>
    );
}

export default Main;
