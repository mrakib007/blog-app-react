import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <main className='max-w-[1150px] mx-auto'>
            <NavBar/>
            <Outlet/>
        </main>
    );
};

export default Layout;