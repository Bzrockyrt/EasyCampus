import { Text } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';
import destructureData from '../../utils/destructureData';

export default function MatiereName({ matiereId }) {
    const [matiereName, setMatiereName] = useState('')

    async function getMatiereName(matiereId) {
        if (matiereId) {
            const querySnapshot = await getDoc(doc(db, "Matieres", matiereId))
            if (querySnapshot) {
                const { nom } = destructureData(querySnapshot)
                setMatiereName(nom)
            }
        }
    }

    useEffect(() => {
        getMatiereName(matiereId)
    }, [matiereId])

    return <Text>
        {matiereName}
    </Text>
}