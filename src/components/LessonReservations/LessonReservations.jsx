import { Flex, HStack, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase';
import destructureDatas from '../../utils/destructureDatas';
import ReservationTableLine from '../ReservationTableLine/ReservationTableLine';

export default function LessonReservations({ lesson, isOpen, onClose }) {
    const [reservations, setReservations] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function getReservations() {
        if (lesson?.id) {
            const q = query(collection(db, "Reservations"), where("lessonId", "==", lesson.id));
            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                const reservations = destructureDatas(querySnapshot)
                setReservations(reservations)
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        getReservations()
    }, [lesson])

    return <>
        <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text>Demande de réservations</Text>
                </ModalHeader>
                <ModalBody justifyContent={'center'} marginBottom={'15px'}>
                    <Skeleton isLoaded={!isLoading} height={'100%'} scrollBehavior={"auto"}>
                        {reservations.length != 0 ? <TableContainer height={'100%'} overflowY={"auto"}>
                            <Table variant='simple' size={"sm"}>
                                <Thead>
                                    <Tr>
                                        <Th>Nom</Th>
                                        <Th>Prénom</Th>
                                        <Th>Date</Th>
                                        <Th>Status</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {reservations.map((reservation) => <ReservationTableLine key={reservation.id} lessonUserId={lesson?.userId} reservation={reservation} refetch={() => getReservations()} />)}
                                </Tbody>
                            </Table>
                        </TableContainer> :
                            <Text fontStyle={'italic'}>Il n'y a pas de réservation pour ce cours 🙁</Text>}
                    </Skeleton>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}