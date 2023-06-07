import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack, Skeleton, Td, Tr } from '@chakra-ui/react';
import { getAdditionalUserInfo } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { throwError, throwSuccess } from '../../utils/alerts';

export default function ReservationTableLine({ reservation, refetch }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    async function getUser(id) {
        if (id) {
            let docRef = doc(db, "users", id);
            const querySnapshot = await getDoc(docRef);
            if (querySnapshot) {
                let user = {}
                let object = querySnapshot._document.data.value.mapValue.fields
                let keys = Object.keys(object)
                keys.forEach((key) => user[key] = object[key].stringValue)
                user.id = querySnapshot.id
                setUser(user)
                setIsLoading(false)
            }
        }
    }

    async function editReservation(value) {
        try {
            const ref = doc(db, 'Reservations', reservation.id)
            let toUpdate = {
                status: value ? "Accepté" : 'Refusé',
            }
            await updateDoc(ref, toUpdate)
            throwSuccess("Cette réservation a été acceptée")
            refetch()
        } catch (e) {
            console.log("Error editReservations", e)
            throwError("Une erreur est survenue lors de l'action")
        }
    }

    useEffect(() => {
        getUser(reservation.userId)
    }, [reservation])

    return <Tr key={reservation.id}>
        <Td><Skeleton isLoaded={!isLoading}>{user?.nom}</Skeleton></Td>
        <Td><Skeleton isLoaded={!isLoading}>{user?.prenom}</Skeleton></Td>
        <Td>{reservation.date}</Td>
        <Td>{reservation.status}</Td>
        <Td>
            {reservation.status == "En attente" && <HStack height={'100%'} textAlign={'right'}>
                <CheckIcon onClick={() => editReservation(true)} cursor={'pointer'} />
                <CloseIcon onClick={() => editReservation(false)} cursor={'pointer'} />
            </HStack>}
        </Td>
    </Tr>
}