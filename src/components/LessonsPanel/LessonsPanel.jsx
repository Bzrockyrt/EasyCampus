import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { collection, getDocs, } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import CreateLesson from '../../pages/CreateLesson';
import destructureDatas from '../../utils/destructureDatas';
import MatiereName from '../MatiereName/MatiereName';

export default function LessonsPanel() {
    const [lessons, setLessons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedLesson, setSelectedLesson] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function getlessons() {
        const querySnapshot = await getDocs(collection(db, "Lessons"));
        if (querySnapshot) {
            const lessons = destructureDatas(querySnapshot)
            setLessons(lessons)
            setIsLoading(false)
        }
    }

    function modalOnClose() {
        onClose()
        setSelectedLesson(null)
        getlessons()
    }

    useEffect(() => {
        getlessons()
    }, [])

    return <Box height={'100%'}>
        <Flex height={'15%'} alignItems={'center'} justifyContent={'center'}>
            <Text width={"90%"} fontSize={'28px'} fontWeight={600}>
                Leçons
            </Text>
            <IconButton width={"10%"} colorScheme={'blue'} aria-label='add-matiere' icon={<AddIcon />} onClick={() => onOpen()}>Créer une nouvelle matière</IconButton>
        </Flex>
        <Box height={'85%'}>
            <Skeleton isLoaded={!isLoading} height={'100%'} scrollBehavior={"auto"}>
                <TableContainer height={'100%'} overflowY={"auto"}>
                    <Table variant='simple' size={"sm"}>
                        <Thead>
                            <Tr>
                                <Th>Titre</Th>
                                <Th>Matière</Th>
                                <Th>Durée</Th>
                                <Th>Prix</Th>
                                <Th>Note</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {lessons.map((lesson) => <Tr key={lesson?.id}>
                                <Td>{lesson?.title}</Td>
                                <Td><MatiereName matiereId={lesson?.matiereId} /></Td>
                                <Td>{lesson?.duration}</Td>
                                <Td>{lesson?.price}€</Td>
                                <Td>{lesson?.notation}€</Td>
                                <Td>
                                    <IconButton aria-label='edit-lesson' height={'30px'} icon={<EditIcon />} onClick={() => { onOpen(), setSelectedLesson(lesson) }} />
                                </Td>
                            </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Skeleton>
        </Box>

        <CreateLesson lessonId={selectedLesson?.id} isOpen={isOpen} onOpen={onOpen} onClose={() => modalOnClose()} />
    </Box>
}