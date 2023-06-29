import { Td, Tr } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';
import destructureData from '../../utils/destructureData';

export default function ReservationLine({ reservation }) {
    const [lesson, setLesson] = useState({})
    const [username, setUsername] = useState('')

    async function getLesson(lessonId) {
        const querySnapshot = await getDoc(doc(db, "Lessons", lessonId));
        if (querySnapshot) {
            const test = destructureData(querySnapshot)
            setLesson(test)
        }
    }

    async function getUsername(userId) {
        if (userId) {
            const querySnapshot = await getDoc(doc(db, "users", userId))
            if (querySnapshot) {
                const user = destructureData(querySnapshot)
                setUsername(`${user.prenom} ${user.nom}`)
            }
        }
    }

    useEffect(() => {
        getLesson(reservation.lessonId)
    }, [reservation])

    useEffect(() => {
        if (lesson) {
            getUsername(lesson?.userId)
        }
    }, [lesson])

    return <Tr key={reservation.id}>
        <Td>{lesson?.title}</Td>
        <Td>{username}</Td>
        <Td>{reservation.status}</Td>
    </Tr>
}