import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'

export default function root() {
    const [user, setUser] = useState(null)
    return (
        <div>
            <div>The header</div>
            <Outlet context={[user, setUser]} />
            <div>The footer</div>
        </div>
    )
}