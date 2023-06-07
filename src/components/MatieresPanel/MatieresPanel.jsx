import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase';
import { throwError, throwSuccess } from '../../utils/alerts';
import { getBytes, getStorage, ref, uploadBytes } from "firebase/storage";
import 'firebase/storage';

export default function MatieresPanel() {
    const [userId, ,] = useOutletContext()
    const [matieres, setMatieres] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [matiereName, setMatiereName] = useState('')
    const [matiereImage, setMatiereImage] = useState(null)
    const [selectedMatiere, setSelectedMatiere] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const storage = getStorage();

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
        return pathReference
    }

    async function createMatiere(matiereToEdit) {
        const storageRef = ref(storage, matiereImage?.name);
        if (matiereToEdit) {
            let toUpdate = {}
            try {
                if (matiereName) toUpdate.nom = matiereName
                if (matiereImage) {
                    toUpdate.imgUrl = matiereImage?.name
                    try {
                        uploadBytes(storageRef, matiereImage)
                    } catch (e) {
                        console.log("image not uploaded", e)
                    }
                }
                const ref = doc(db, 'Matieres', matiereToEdit.id)
                await updateDoc(ref, toUpdate)
                throwSuccess('La matière a bien été ajoutée')
                getMatieres()
                handleClose()
            } catch (e) {
                throwError('une erreur est survenue', e)
            }
        } else if (matiereName && matiereImage) {
            try {
                try {
                    uploadBytes(storageRef, matiereImage)
                } catch (e) {
                    console.log("image not uploaded", e)
                }
                addDoc(collection(db, "Matieres"), {
                    userID: userId,
                    nom: matiereName,
                    imgUrl: matiereImage?.name,
                });
                throwSuccess('La matière a bien été ajoutée')
                getMatieres()
                handleClose()
            } catch (e) {
                console.log(e)
            }
        }
    }

    async function deleteMatiere(matiereId) {
        try {
            await deleteDoc(doc(db, "Matieres", matiereId))
            throwSuccess('La matière a été supprimée')
            getMatieres()
        } catch {
            throwError('Une erreur est survenue lors de la suppression de la matière')
        }
    }

    function handleClose() {
        setMatiereName('')
        setMatiereImage(null)
        setSelectedMatiere(null)
        onClose()
    }

    useEffect(() => {
        getMatieres()
    }, [])

    return <Box height={'100%'}>
        <Flex height={'15%'} alignItems={'center'} justifyContent={'center'}>
            <Text width={"90%"} fontSize={'28px'} fontWeight={600}>
                Matières
            </Text>
            <IconButton width={"10%"} colorScheme={'blue'} aria-label='add-matiere' icon={<AddIcon />} onClick={() => onOpen()}>Créer une nouvelle matière</IconButton>
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
                            {matieres.map((matiere) => <Tr key={matiere.id}>
                                <Td>{matiere.nom}</Td>
                                <Td>
                                    {matiere.imgUrl}
                                </Td>
                                <Td>
                                    <IconButton aria-label='details' marginRight={'5px'} height={'30px'} icon={<EditIcon />} onClick={() => { setSelectedMatiere(matiere), onOpen() }} />
                                    <IconButton aria-label='details' height={'30px'} icon={<DeleteIcon />} onClick={() => deleteMatiere(matiere.id)} />
                                </Td>
                            </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Skeleton>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent display={'flex'}>
                <ModalHeader>{selectedMatiere ? 'Modifier cette matière' : 'Créer une nouvelle matière'}</ModalHeader>
                <ModalBody height={'100%'}>
                    <Input placeholder={selectedMatiere ? selectedMatiere.nom : 'Nom de la matière'} marginBottom={'15px'} onChange={(e) => setMatiereName(e.target.value)} />
                    <Input id='fileInput' accept="image/*" placeholder="Ajouter une image" type="file" onChange={(e) => { setMatiereImage(document.getElementById("fileInput").files[0]), console.log('document.getElementById("fileInput").files[0]', document.getElementById("fileInput").files[0]) }} />
                </ModalBody>
                <ModalFooter justifyContent={'space-evenly'}>
                    <Button onClick={() => handleClose()}>
                        Annuler
                    </Button>
                    <Button colorScheme={"red"} onClick={() => createMatiere(selectedMatiere)}>
                        Valider
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
}