import { Td, Tr } from '@chakra-ui/react';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';

export default function ReservationLine({ reservation, refecth }) {
    const [lesson, setLesson] = useState({})
    const [username, setUsername] = useState('')

    async function getLesson(lessonId) {
        const querySnapshot = await getDoc(collection(db, "Lessons", lessonId));
        const test = destructureDatas(querySnapshot).length
        setLesson(test)
    }

    async function getUsername(userId) {
        const querySnapshot = await getDoc(doc(db, "users", userId))
        const user = destructureDatas(querySnapshot).length
        setUsername(`${user.prenom} ${user.nom}`)
    }

    useEffect(() => {
        getLesson(reservation.lessonId)
    }, [reservation])

    useEffect(() => {
        getUsername(lesson.userId)
    }, [lesson])

    return <Tr key={reservation.id}>
        <Td>{lesson?.title}</Td>
        <Td>{username}</Td>
        <Td>{reservation.status}</Td>
    </Tr>
}