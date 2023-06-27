import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Skeleton, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase';
import destructureDatas from '../../utils/destructureDatas';
import CommentTableLine from '../CommenTableLine/CommenTableLine';

export default function LessonComments({ lessonId, isOpen, onClose }) {
    const [, , isAdmin] = useOutletContext()
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function getComments() {
        if (lessonId) {
            const querySnapshot = await getDocs(query(collection(db, "Comments"), where("lessonId", "==", lessonId)));
            if (querySnapshot) {
                const comments = destructureDatas(querySnapshot)
                setComments(comments)
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        getComments()
    }, [lessonId])

    return <>
        <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text>Commentaires</Text>
                </ModalHeader>
                <ModalBody justifyContent={'center'} marginBottom={'15px'}>
                    <Skeleton isLoaded={!isLoading} height={'100%'} scrollBehavior={"auto"}>
                        {comments.length != 0 ? <TableContainer height={'100%'} overflowY={"auto"}>
                            <Table variant='simple' size={"sm"}>
                                <Thead>
                                    <Tr>
                                        <Th>Nom</Th>
                                        <Th>Prénom</Th>
                                        <Th>Note</Th>
                                        <Th>Commentaire</Th>
                                        <Th>Date</Th>
                                        {isAdmin && <Th>Actions</Th>}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {comments.map((comment) => <CommentTableLine key={comment.id} comment={comment} refetch={() => getComments()} />)}
                                </Tbody>
                            </Table>
                        </TableContainer> :
                            <Text fontStyle={'italic'}>Il n'y a pas de commentaires pour ce cours 🙁</Text>}
                    </Skeleton>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}