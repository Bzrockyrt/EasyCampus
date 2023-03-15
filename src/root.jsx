import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'

export default function root() {
    return (
        <div>
            <div>The header</div>
            <div>The footer</div>
        </div>
    )
}