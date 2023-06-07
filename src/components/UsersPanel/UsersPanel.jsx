import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Userdata from '../Userdata/UserData';

export default function UsersPanel() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userDetailId, setUserDetailId] = useState('')
    const userDataDisclosure = useDisclosure()


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
                    <Userdata userId={userDetailId} dataToDisplay={['nom', 'prenom', 'email', 'phone', 'role']} width={'400px'} />
                </ModalBody>
            </ModalContent>
        </Modal>
    </Box>
}