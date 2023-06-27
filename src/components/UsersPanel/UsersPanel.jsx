import { SearchIcon, LockIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { collection, getDocs, query, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { addDays } from "date-fns";
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Userdata from '../Userdata/UserData';

export default function UsersPanel() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userDetailId, setUserDetailId] = useState('')
    const userDataDisclosure = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure()


    async function getUsers() {
        const querySnapshot = await getDocs(collection(db, "users"));
        if (querySnapshot) {
            const users = []
            querySnapshot.docs.forEach((userDoc, index) => {
                let user = {}
                let object = userDoc._document.data.value.mapValue.fields
                let keys = Object.keys(object)
                keys.forEach((key) => user[key] = object[key].stringValue)
                user.id = userDoc.id
                users.push(user)
            });
            setUsers(users)
            setIsLoading(false)
        }
    }

    async function blockUser(time) { // pas oublier la condition time
        try {
            const userRef = doc(db, "users", userDetailId); // Remplacez "lessonId" par l'ID du document existant
            const currentTimestamp = serverTimestamp();
            const futureTimestamp = addDays(new Date(), time);

            await updateDoc(userRef, {
                blockedTime: futureTimestamp
            });

            handleOnClose();
            throwSuccess("L'utilisateur a été bloquée !");
        } catch (e) {
            console.log("Erreur blockUser", e);
            throwError("Une erreur est survenue lors du blocage de l'utilisateur.");
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
                                <Th>Détails</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user) => <Tr key={user.id}>
                                <Td>{user.nom}</Td>
                                <Td>{user.prenom}</Td>
                                <Td><IconButton aria-label='details' height={'30px'} icon={<SearchIcon />} onClick={() => { userDataDisclosure.onOpen(), setUserDetailId(user.id) }} /></Td>
                                <Td><IconButton aria-label='details' height={'30px'} icon={<LockIcon />} onClick={() => { onOpen(), setUserDetailId(user.id) }} /></Td>
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
                    <Button onClick={() => handleClose()}>
                        Annuler
                    </Button>
                    <Button colorScheme={"yellow"} onClick={() => blockUser(7).handleClose()}>
                        1 semaine
                    </Button>
                    <Button colorScheme={"orange"} onClick={() => blockUser(30).handleClose()}>
                        1 mois
                    </Button>
                    <Button colorScheme={"red"} onClick={() => blockUser(365).handleClose()}>
                        1 an
                    </Button>
                </ModalBody>
                {/* <ModalFooter justifyContent={'space-evenly'}>
                    <Button onClick={() => handleClose()}>
                        Annuler
                    </Button>
                    <Button colorScheme={"red"} onClick={() => handleClose()}>
                        Valider
                    </Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
    </Box>
}