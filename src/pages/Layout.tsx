import React, { createContext, useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Alert from '../utils/Alerts';
import AlertContext from './AlertContext';

export default function Layout() {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    return <AlertContext.Provider value={{ setErrorMessage, setSuccessMessage }}>
        <Navbar />
        <Alert errorMessage={errorMessage} successMessage={successMessage} />
    </AlertContext.Provider>
}