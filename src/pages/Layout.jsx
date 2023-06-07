import { Box } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Layout() {
    const [userId, setUserId] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUserId(user.uid)
            let docRef = doc(db, "users", user.uid);
            const querySnapshot = await getDoc(docRef);
            if (querySnapshot) {
                setIsAdmin(querySnapshot._document.data.value.mapValue.fields.role.stringValue == 'admin' ? true : false)
            }
        }
    });

    return <Box height='100%'>
        <Navbar userId={userId} setUserId={setUserId} />
        <Outlet context={[userId, setUserId, isAdmin]} />
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