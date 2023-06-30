import { DeleteIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Text, Button, Flex, IconButton, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Skeleton, Td, Tooltip, Tr, useDisclosure } from '@chakra-ui/react';
import { addDays } from 'date-fns';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';
import { throwError, throwSuccess } from '../../utils/alerts';
import destructureData from '../../utils/destructureData';

export default function ReportTableLine({ report, refetch }) {
    const [username, setUsername] = useState('')
    const [reportedUsername, setReportedUsername] = useState('')
    const [isUserLoading, setIsUserLoading] = useState(true)
    const [isUserReportedLoading, setIsUserReportedLoading] = useState(true)
    const [blockReason, setBlockReason] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const getUsername = async () => {
        if (report.userId) {
            const querySnapshot = await getDoc(doc(db, "users", report.userId));
            const user = destructureData(querySnapshot)
            if (user) {
                setUsername(`${user.prenom} ${user.nom}`)
                setIsUserLoading(false)
            }
        }
    }
    const getReportedUsername = async () => {
        if (report.userId) {
            const querySnapshot = await getDoc(doc(db, "users", report.userReportedId));
            const user = destructureData(querySnapshot)
            if (user) {
                setReportedUsername(`${user.prenom} ${user.nom}`)
                setIsUserReportedLoading(false)
            }
        }
    }

    useEffect(() => {
        getUsername()
        getReportedUsername()
    }, [report])

    async function deleteReport(reportId) {
        try {
            await deleteDoc(doc(db, "Reports", reportId))
            throwSuccess('Le signalement a été supprimé')
            refetch()
        } catch {
            throwError('Une erreur est survenue lors de la suppression du signalement')
        }
    }

    async function blockUser(time) { // pas oublier la condition time
        try {
            const userRef = doc(db, "users", report.userReportedId); // Remplacez "lessonId" par l'ID du document existant
            const futureTimestamp = addDays(new Date(), time);
            await updateDoc(userRef, {
                blockedTime: futureTimestamp,
                blockedReason: blockReason
            });
            throwSuccess(`L'utilisateur sera restreint jusqu'au : ${futureTimestamp}`)
            deleteReport(report.id)
        } catch (e) {
            console.log("Erreur blockUser", e);
            throwError(`Une erreur est survenue`)
        }
    }

    return <Tr key={report.id}>
        <Td><Skeleton isLoaded={!isUserLoading}>{username}</Skeleton></Td>
        <Td><Skeleton isLoaded={!isUserReportedLoading}>{reportedUsername}</Skeleton></Td>
        <Td>{report.reason}</Td>
        <Td>{new Date(report.date).toLocaleDateString() + ' - ' + new Date(report.date).toLocaleTimeString()}</Td>
        <Td>
            <Tooltip label={'Supprimer le signalement'}>
                <IconButton aria-label='delete-lesson' marginRight={'5px'} height={'30px'} icon={<DeleteIcon />} onClick={() => deleteReport(report.id)} />
            </Tooltip>
            <Tooltip label={"Restreindre l'utilisateur signalé"}>
                <IconButton aria-label='details' height={'30px'} icon={<NotAllowedIcon />} onClick={() => onOpen()} />
            </Tooltip>
        </Td>

        <Modal isOpen={isOpen} onClose={() => { onClose(), setBlockReason('') }}>
            <ModalOverlay />
            <ModalContent display={'flex'}>
                <ModalHeader>{'Restriction de compte'}</ModalHeader>
                <ModalBody height={'100%'}>
                    <Flex flexDirection={'column'}>
                        <Text fontSize={'16px'} fontWeight={600}>Raison de la restriction :</Text>
                        <Input placeholder='Raison' value={blockReason} onChange={(e) => setBlockReason(e.target.value)} />
                        <Flex flexDirection={'row'} justifyContent={'space-evenly'} marginTop={'15px'}>
                            <Button colorScheme={"yellow"} onClick={() => blockUser(7)} style={{ width: "100px" }}>
                                1 semaine
                            </Button>
                            <Button colorScheme={"orange"} onClick={() => blockUser(30)} style={{ width: "80px" }}>
                                1 mois
                            </Button>
                            <Button colorScheme={"red"} onClick={() => blockUser(365)} style={{ width: "80px" }}>
                                1 an
                            </Button>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    </Tr>
}