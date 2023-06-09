import { SearchIcon, LockIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { addDays } from "date-fns";
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Userdata from '../Userdata/UserData';
import { throwError, throwSuccess } from '../../utils/alerts';
import destructureDatas from '../../utils/destructureDatas';

export default function UsersPanel() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userDetailId, setUserDetailId] = useState('')
    const [blockReason, setBlockReason] = useState('')
    const userDataDisclosure = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure()


    async function getUsers() {
        const querySnapshot = await getDocs(collection(db, "users"));
        if (querySnapshot) {
            const users = destructureDatas(querySnapshot, 'dateCreation')
            setUsers(users)
            setIsLoading(false)
        }
    }

    async function blockUser(time) { // pas oublier la condition time
        try {
            const userRef = doc(db, "users", userDetailId); // Remplacez "lessonId" par l'ID du document existant
            const futureTimestamp = addDays(new Date(), time);
            await updateDoc(userRef, {
                blockedTime: futureTimestamp,
                blockedReason: blockReason
            });
            throwSuccess(`L'utilisateur sera restreint jusqu'au : ${futureTimestamp}`)
            getUsers()
            onClose()
        } catch (e) {
            console.log("Erreur blockUser", e);
            throwError(`Une erreur est survenue`)
            onClose()
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return <Box height={'100%'}>
        <Flex height={'15%'} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={'28px'} fontWeight={600}>
                UTILISATEURS
            </Text>
        </Flex>
        <Box height={'85%'}>
            <Skeleton isLoaded={!isLoading} height={'100%'} scrollBehavior={"auto"}>
                <TableContainer height={'100%'} overflowY={"auto"}>
                    <Table variant='simple' size={"sm"}>
                        <Thead>
                            <Tr>
                                <Th>Nom</Th>
                                <Th>Prénom</Th>
                                <Th>Actions</Th>
                                <Th>Restreint</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user) => <Tr key={user.id}>
                                <Td>{user.nom}</Td>
                                <Td>{user.prenom}</Td>
                                <Td>
                                    <IconButton aria-label='details' marginRight={'5px'} height={'30px'} icon={<SearchIcon />} onClick={() => { userDataDisclosure.onOpen(), setUserDetailId(user.id) }} />
                                    <IconButton aria-label='details' height={'30px'} icon={<NotAllowedIcon />} onClick={() => { onOpen(), setUserDetailId(user.id) }} />
                                </Td>
                                <Td>{user.blockedTime && new Date(user.blockedTime) > new Date() && <Text>{new Date(user.blockedTime).toLocaleDateString() + ' - ' + new Date(user.blockedTime).toLocaleTimeString()}</Text>}</Td>
                            </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Skeleton>
        </Box>

        <Modal size={'3xl'} isOpen={userDataDisclosure.isOpen} onClose={userDataDisclosure.onClose}>
            <ModalOverlay />
            <ModalContent minHeight={'400px'} display={'flex'}>
                <ModalBody height={'100%'}>
                    <Userdata targetedUserId={userDetailId} dataToDisplay={['nom', 'prenom', 'email', 'phone', 'role']} width={'400px'} />
                </ModalBody>
            </ModalContent>
        </Modal>

        <Modal isOpen={isOpen} onClose={onClose}>
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
    </Box>
}