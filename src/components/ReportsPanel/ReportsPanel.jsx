import { SearchIcon, LockIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Button, Flex, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { collection, getDocs, query, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { addDays } from "date-fns";
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Userdata from '../Userdata/UserData';
import ReportTableLine from '../ReportTableLine/ReportTableLine';
import destructureDatas from '../../utils/destructureDatas';

export default function ReportsPanel() {
    const [reports, setReports] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userDetailId, setUserDetailId] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()


    const getReports = async () => {
        const querySnapshot = await getDocs(collection(db, "Reports"));
        if (querySnapshot) {
            const reports = destructureDatas(querySnapshot, 'dateCreation')
            setReports(reports)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getReports()
    }, [])

    return <Box height={'100%'}>
        <Flex height={'15%'} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={'28px'} fontWeight={600}>
                SIGNALEMENTS
            </Text>
        </Flex>
        <Box height={'85%'}>
            <Skeleton isLoaded={!isLoading} height={'100%'} scrollBehavior={"auto"}>
                <TableContainer height={'100%'} overflowY={"auto"}>
                    <Table variant='simple' size={"sm"}>
                        <Thead>
                            <Tr>
                                <Th>Effectué par</Th>
                                <Th>Personne signalée</Th>
                                <Th>Raison</Th>
                                <Th>Date</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {reports.map((report) => <ReportTableLine report={report} refetch={getReports} />)}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Skeleton>
        </Box>
    </Box>
}