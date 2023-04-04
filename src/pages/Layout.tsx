import { Box } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Layout() {
    const [userId, setUserId] = useState<string | null>(null)
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserId(user.uid)
        }
    });

    return <Box height='100%'>
        <Navbar userId={userId} setUserId={setUserId} />
        <Outlet context={[userId, setUserId]} />
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="colored"
        />
    </Box>
}