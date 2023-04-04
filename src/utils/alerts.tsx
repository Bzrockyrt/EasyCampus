import React, { useEffect, useState } from 'react';
import {
    Alert as AlertChakra,
    AlertIcon,
} from '@chakra-ui/react'

type AlertProps = {
    successMessage?: string;
    errorMessage?: string;
}

export default function Alert({ successMessage, errorMessage }: AlertProps) {
    const [timerId, setTimerId] = useState(undefined)

    useEffect(() => {
        if (!successMessage && !errorMessage) return;
        if (timerId) {
            clearTimeout(timerId)
        }
        const id = setTimeout(() => {
            setTimerId(undefined)
        }, 3000)
        setTimerId(id)
    }, [successMessage, errorMessage])

    if (!timerId) return null;

    return <div style={{ width: "100%", position: "absolute", top: "75px", display: "flex", justifyContent: "center" }}>
        <AlertChakra maxWidth={"500px"} borderRadius={"15px"} status={successMessage ? 'success' : 'error'}>
            <AlertIcon />
            {successMessage || errorMessage}
        </AlertChakra>
    </div>

}