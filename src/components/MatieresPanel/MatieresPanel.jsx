import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase';
import { throwError, throwSuccess } from '../../utils/alerts';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function MatieresPanel() {
    const [userId, ,] = useOutletContext()
    const [matieres, setMatieres] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [matiereName, setMatiereName] = useState('')
    const [matiereImage, setMatiereImage] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const storage = getStorage();
    console.log('matiereImage', matiereImage)

    async function getMatieres() {
        const querySnapshot = await getDocs(collection(db, "Matieres"));
        if (querySnapshot) {
            const matieres = []
            querySnapshot.docs.forEach((matiereDoc, index) => {
                let matiere = {}
                let object = matiereDoc._document.data.value.mapValue.fields
                let keys = Object.keys(object)
                keys.forEach((key) => matiere[key] = object[key].stringValue)
                matiere.id = matiereDoc.id
                matieres.push(matiere)
            });
            setMatieres(matieres)
            setIsLoading(false)
        }
    }

    function getImage(fileName) {
        const pathReference = ref(storage, fileName)
        console.log(pathReference)
        return pathReference
    }

    function createMatiere() {
        if (matiereName && matiereImage) {
            try {
                try {
                    const storageRef = ref(storage, matiereImage?.name);
                    uploadBytes(storageRef, matiereImage)
                } catch (e) {
                    console.log(e)
                }
                addDoc(collection(db, "Matieres"), {
                    userID: userId,
                    nom: matiereName,
                    imgUrl: matiereImage?.name,
                });
                throwSuccess('La matière a bien été ajouté')
                getMatieres()
                onClose()
            } catch (e) {
                console.log(e)
            }
        }
    }

    async function deleteMatiere(matiereId) {
        try {
            await deleteDoc(doc(db, "Matieres", matiereId))
            throwSuccess('La matière a été supprimé')
            getMatieres()
        } catch {
            throwError('Une erreur est survenue lors de la suppression de la matière')
        }
    }

    useEffect(() => {
        getMatieres()
    }, [])

    return <Box height={'100%'}>
        <Flex height={'15%'} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={'28px'} fontWeight={600}>
                Matières
            </Text>
        </Flex>
        <Flex>
            <IconButton aria-label='add-matiere' icon={<AddIcon />} onClick={() => onOpen()}>Créer une nouvelle matière</IconButton>
        </Flex>
        <Box height={'85%'}>
            <Skeleton isLoaded={!isLoading} height={'100%'} scrollBehavior={"auto"}>
                <TableContainer height={'100%'} overflowY={"auto"}>
                    <Table variant='simple' size={"sm"}>
                        <Thead>
                            <Tr>
                                <Th>Nom</Th>
                                <Th>Image</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {matieres.map((matiere) => {
                                getImage(matiere.imgUrl)
                                return <Tr key={matiere.id}>
                                    <Td>{matiere.nom}</Td>
                                    <Td>{matiere.imgUrl}
                                        {/* <Input type={'file'} value={getImage(matiere.imgUrl)} /> */}
                                    </Td>
                                    <Td>
                                        {/* <IconButton aria-label='details' height={'30px'} icon={<SearchIcon />} onClick={() => } /> */}
                                        <IconButton aria-label='details' height={'30px'} icon={<DeleteIcon />} onClick={() => deleteMatiere(matiere.id)} />
                                    </Td>
                                </Tr>
                            }
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Skeleton>
        </Box>

        <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minHeight={'400px'} display={'flex'}>
                <ModalHeader>Créer une nouvelle matière</ModalHeader>
                <ModalBody height={'100%'}>
                    <Input placeholder='Nom de la matière' onChange={(e) => setMatiereName(e.target.value)} />
                    <Input id='fileInput' accept="image/*" placeholder="Ajouter une image" type="file" onChange={(e) => setMatiereImage(document.getElementById("fileInput").files[0])} />
                </ModalBody>
                <ModalFooter justifyContent={'space-evenly'}>
                    <Button onClick={() => onClose()}>
                        Annuler
                    </Button>
                    <Button colorScheme={"red"} onClick={() => createMatiere()}>
                        Valider
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
}