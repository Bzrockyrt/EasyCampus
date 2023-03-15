import React, { useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from 'react-router-dom'


export default function Layout() {
    const [user, setUser] = useState(null)
    return <div>
        <Navbar />
        <Outlet context={[user, setUser]} />
    </div>
}