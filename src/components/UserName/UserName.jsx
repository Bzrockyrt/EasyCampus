import { Text } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';
import destructureData from '../../utils/destructureData';

export default function UserName({ userId }) {
    const [userName, setUserName] = useState('')

    async function getUserName(userId) {
        if (userId) {
            const querySnapshot = await getDoc(doc(db, "users", userId))
            if (querySnapshot) {
                const { nom, prenom } = destructureData(querySnapshot)
                setUserName(prenom + ' ' + nom)
            }
        }
    }

    useEffect(() => {
        getUserName(userId)
    }, [userId])

    return <Text>
        {userName}
    </Text>
}