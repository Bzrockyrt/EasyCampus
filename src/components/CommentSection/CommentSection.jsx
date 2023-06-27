import { Box, Button, Divider, Flex, Icon, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';
import { AiOutlineStar } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { throwError, throwSuccess } from '../../utils/alerts';
import Comment from '../Comment/Comment';
import destructureDatas from '../../utils/destructureDatas';
import { useOutletContext } from 'react-router-dom';


export default function CommentSection({ lessonId }) {
    const [userId, ,] = useOutletContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [comments, setComments] = useState([])
    const [commentToAdd, setCommentToAdd] = useState('')
    const [note, setNote] = useState(0)

    const getCommentData = async () => {
        const querySnapshot = await getDocs(query(collection(db, "Comments"), where('lessonId', '==', lessonId)));
        const comments = destructureDatas(querySnapshot, 'creationDate')
        setComments(comments)
    }

    useEffect(() => {
        getCommentData();
    }, []);

    async function handleOnSave() {
        try {
            let dateCreated = new Date().toLocaleDateString('fr')
            await addDoc(collection(db, "Comments"), {
                userId,
                notation: note,
                comment: commentToAdd,
                dateCreated,
                lessonId
            });
            throwSuccess("Le commentaire a été créée!");
            getCommentData()
            handleOnClose()
        } catch (e) {
            console.log("Erreur addComment", e)
            throwError("Une erreur est survenue lors de la création de votre commentaire");
        }
    }

    function handleOnClose() {
        setNote(0)
        setCommentToAdd('')
        onClose()
    }

    return <Box margin={'200px 20% 0'}>
        <Flex flexDirection={'row'} justifyContent={'space-between'}>
            <Text textAlign={'left'} fontSize={'24px'} fontWeight={600}>Commentaires :</Text>
            <Button fontSize={'sm'} fontWeight={600} onClick={() => onOpen()} colorScheme="blue" border="0px">
                Ajouter un commentaire
            </Button>
        </Flex>
        {comments.length > 0 ?
            comments.map((comment) => <Box key={comment.id}><Comment comment={comment} /><Divider marginTop={'5px'} /></Box>) :
            <Text fontSize={'12px'} fontStyle={'italic'} marginTop={'25px'}>Cet espace commentaire est vide 🙁</Text>
        }
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text textAlign="center">Ajouter un commentaire</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDirection={'row'} justifyContent={'center'} marginBottom={'5px'}>
                        <Icon variant={'ghost'} cursor="pointer" boxSize={23} as={note >= 1 ? AiFillStar : AiOutlineStar} onClick={() => setNote(1)} />
                        <Icon variant={'ghost'} cursor="pointer" boxSize={23} as={note >= 2 ? AiFillStar : AiOutlineStar} onClick={() => setNote(2)} />
                        <Icon variant={'ghost'} cursor="pointer" boxSize={23} as={note >= 3 ? AiFillStar : AiOutlineStar} onClick={() => setNote(3)} />
                        <Icon variant={'ghost'} cursor="pointer" boxSize={23} as={note >= 4 ? AiFillStar : AiOutlineStar} onClick={() => setNote(4)} />
                        <Icon variant={'ghost'} cursor="pointer" boxSize={23} as={note >= 5 ? AiFillStar : AiOutlineStar} onClick={() => setNote(5)} />
                    </Flex>
                    <Flex flexDirection="column" justifyContent={'center'}>
                        <Input placeholder='Commentaire' type={"text"} value={commentToAdd} onChange={(e) => setCommentToAdd(e.target.value)} />
                    </Flex>
                </ModalBody>
                <ModalFooter flexDirection={'row'} justifyContent={'space-evenly'}>
                    <Button fontSize={'sm'} fontWeight={600} onClick={() => handleOnClose()} colorScheme="gray" border="0px">
                        Annuler
                    </Button>
                    <Button fontSize={'sm'} fontWeight={600} onClick={() => handleOnSave()} colorScheme="blue" border="0px">
                        Ajouter
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
}