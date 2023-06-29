import { AddIcon, DeleteIcon, EditIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, css, Flex, HStack, IconButton, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useDisclosure } from '@chakra-ui/react';
import { collection, deleteDoc, doc, getDocs, query, where, } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase';
import CreateLesson from '../../pages/CreateLesson';
import { throwError, throwSuccess } from '../../utils/alerts';
import destructureDatas from '../../utils/destructureDatas';
import LessonComments from '../LessonComments/LessonComments';
import LessonReservations from '../LessonReservations/LessonReservations';
import MatiereName from '../MatiereName/MatiereName';
import UserName from '../UserName/UserName';
import { BiCommentDots } from 'react-icons/bi'
import LessonNotationTableLine from '../LessonNotationTableLine/LessonNotationTableLine';
import ReservationIconButton from '../ReservationIconButton/ReservationIconButton';

export default function LessonsPanel() {
    const [userId, , isAdmin] = useOutletContext()
    const [lessons, setLessons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedLesson, setSelectedLesson] = useState(null)
    const lessonForm = useDisclosure()
    const reservationModal = useDisclosure()
    const commentModal = useDisclosure()

    async function getlessons() {
        const lessonsRef = collection(db, "Lessons")
        if (isAdmin) {
            const querySnapshot = await getDocs(lessonsRef);
            if (querySnapshot) {
                const lessons = destructureDatas(querySnapshot, 'creationDate')
                setLessons(lessons)
                setIsLoading(false)
            }
        } else {
            const q = query(lessonsRef, where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                const lessons = destructureDatas(querySnapshot, 'creationDate')
                setLessons(lessons)
                setIsLoading(false)
            }
        }
    }

    function lessonFormOnClose() {
        lessonForm.onClose()
        setSelectedLesson(null)
        getlessons()
    }

    function reservationModalOnClose() {
        reservationModal.onClose()
        setSelectedLesson(null)
    }

    function commentModalOnClose() {
        commentModal.onClose()
        setSelectedLesson(null)
    }

    async function deletelesson(lessonId) {
        try {
            await deleteDoc(doc(db, "Lessons", lessonId))
            throwSuccess('La leçon a été supprimée')
            getlessons()
        } catch {
            throwError('Une erreur est survenue lors de la suppression de la leçon')
        }
    }

    useEffect(() => {
        getlessons()
    }, [userId, isAdmin])

    return <Box height={'100%'}>
        <Flex height={'15%'} alignItems={'center'} justifyContent={'center'}>
            <Text width={"90%"} fontSize={'28px'} fontWeight={600}>
                LEÇONS
            </Text>
            <IconButton width={"10%"} colorScheme={'blue'} aria-label='add-matiere' icon={<AddIcon />} onClick={() => lessonForm.onOpen()}>Créer une nouvelle matière</IconButton>
        </Flex>
        <Box height={'85%'}>
            <Skeleton isLoaded={!isLoading} height={'100%'} scrollBehavior={"auto"}>
                <TableContainer height={'100%'} overflowY={"auto"}>
                    <Table variant='simple' size={"sm"}>
                        <Thead>
                            <Tr>
                                {isAdmin && <Th>Utilisateur</Th>}
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
                                {isAdmin && <Td><UserName userId={lesson?.userId} /></Td>}
                                <Td>{lesson?.title}</Td>
                                <Td><MatiereName matiereId={lesson?.matiereId} /></Td>
                                <Td>{lesson?.duration}</Td>
                                <Td>{lesson?.price}€</Td>
                                <LessonNotationTableLine lessonId={lesson.id} />
                                <Td>
                                    <HStack gap='5px'>
                                        <Tooltip label={'Voir les réservations'}>
                                            <IconButton
                                                css={css`position: relative !important;`}
                                                py={'2'}
                                                colorScheme={'gray'}
                                                aria-label='view-reservation'
                                                size={'lg'}
                                                icon={<ReservationIconButton lesson={lesson} />}
                                                height={'30px'}
                                                onClick={() => { reservationModal.onOpen(), setSelectedLesson(lesson) }}
                                            />
                                        </Tooltip>
                                        <Tooltip label={'Voir les commentaires'}>
                                            <IconButton aria-label='view-comments' height={'30px'} icon={<BiCommentDots />} onClick={() => { commentModal.onOpen(), setSelectedLesson(lesson) }} />
                                        </Tooltip>
                                        <Tooltip label={'Modifier cette leçon'}>
                                            <IconButton aria-label='edit-lesson' height={'30px'} icon={<EditIcon />} onClick={() => { lessonForm.onOpen(), setSelectedLesson(lesson) }} />
                                        </Tooltip>
                                        <Tooltip label={'Supprimer cette leçon'}>
                                            <IconButton aria-label='delete-lesson' height={'30px'} icon={<DeleteIcon />} onClick={() => deletelesson(lesson.id)} />
                                        </Tooltip>
                                    </HStack>
                                </Td>
                            </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Skeleton>
        </Box>

        <CreateLesson lessonId={selectedLesson?.id} isOpen={lessonForm.isOpen} onClose={() => lessonFormOnClose()} />
        <LessonReservations lesson={selectedLesson} isOpen={reservationModal.isOpen} onClose={() => reservationModalOnClose()} />
        <LessonComments lessonId={selectedLesson?.id} isOpen={commentModal.isOpen} onClose={() => commentModalOnClose()} />
    </Box>
}