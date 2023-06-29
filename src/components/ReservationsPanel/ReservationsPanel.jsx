import { Box, Flex, Skeleton, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase';
import destructureDatas from '../../utils/destructureDatas';
import ReservationLine from '../ReservationLine/ReservationLine';

export default function ReservationsPanel() {
    const [userId, ,] = useOutletContext()
    const [reservations, setReservations] = useState([])

    const getReservations = async () => {
        const querySnapshot = await getDocs(query(collection(db, "Reservations"), where("userId", "==", userId)));
        if (querySnapshot) {
            const reservation = destructureDatas(querySnapshot, 'dateCreation')
            setReservations(reservation)
        }
    }

    useEffect(() => {
        getReservations()
    }, [userId])

    return <Box height={'100%'}>
        <Flex height={'15%'} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={'28px'} fontWeight={600}>
                RESERVATIONS
            </Text>
        </Flex>
        <Box height={'85%'}>
            {reservations.length > 0 ? <TableContainer height={'100%'} overflowY={"auto"}>
                <Table variant='simple' size={"sm"}>
                    <Thead>
                        <Tr>
                            <Th>Leçon</Th>
                            <Th>Professeur</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {reservations.map((reservation) => <ReservationLine key={reservation.id} reservation={reservation} />)}
                    </Tbody>
                </Table>
            </TableContainer> :
                <Text fontSize={'12px'} fontStyle={'italic'} marginTop={'25px'}>Vous n'avez aucune réservation de cours 🙁</Text>}
        </Box>
    </Box>
}