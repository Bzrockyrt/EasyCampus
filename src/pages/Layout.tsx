import { Box } from '@chakra-ui/react';
import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import Alert from '../utils/Alerts';
import AlertContext from './AlertContext';

export default function Layout() {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [userId, setUserId] = useState<string | null>(null)
    const dbrequest = window.indexedDB.open('firebaseLocalStorageDb', 1);
    dbrequest.onsuccess = (e) => {
        const request = dbrequest.result.transaction('firebaseLocalStorage')
            .objectStore('firebaseLocalStorage')
            .getAll();
        request.onsuccess = () => {
            setUserId(request.result[0].value.uid)
        }
    };

    return <AlertContext.Provider value={{ setErrorMessage, setSuccessMessage }}>
        <Box height='100%'>
            <Navbar userId={userId} setUserId={setUserId} />
            <Alert errorMessage={errorMessage} successMessage={successMessage} />
            <Outlet context={[userId, setUserId]} />
        </Box>
    </AlertContext.Provider>
}