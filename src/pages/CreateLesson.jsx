import { Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { throwError, throwSuccess } from '../utils/alerts';
import destructureData from '../utils/destructureData';

export default function CreateLesson({ lessonId, isOpen, onClose }) {
    const navigate = useNavigate();
    const [userId, ,] = useOutletContext();
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [matiereId, setMatiereId] = useState("")
    const [matieres, setMatieres] = useState([])
    const [isMatiereLoading, setIsMatiereLoading] = useState(true)
    const [lessonToEdit, setLessonToEdit] = useState(null)

    function handleOnClose() {
        onClose()
        setDescription('')
        setDuration('')
        setTitle('')
        setPrice('')
        setMatiereId('')
        setLessonToEdit(null)
    }

    async function addLesson() {
        try {
            await addDoc(collection(db, "Lessons"), {
                userId,
                title,
                duration,
                price,
                description,
                matiereId,
                notation: "5"
            });
            handleOnClose()
            throwSuccess("La leçon a été créée!");
        } catch (e) {
            console.log("Erreur addLesson", e)
            throwError("Une erreur est survenue lors de la création de votre leçon");
        }
    }

    async function editLesson() {
        try {
            const ref = doc(db, 'Lessons', lessonToEdit.id)
            let toUpdate = {}
            if (lessonToEdit?.description != description) toUpdate.description = description
            if (lessonToEdit?.duration != duration) toUpdate.duration = duration
            if (lessonToEdit?.title != title) toUpdate.title = title
            if (lessonToEdit?.price != price) toUpdate.price = price
            if (lessonToEdit?.matiereId != matiereId) toUpdate.matiereId = matiereId
            await updateDoc(ref, toUpdate)
            handleOnClose()
            throwSuccess("La leçon a bien été modifiée")
        } catch (err) {
            console.log(err)
        }
    }

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
            setIsMatiereLoading(false)
        }
    }

    async function getLesson(id) {
        if (id) {
            let docRef = doc(db, "Lessons", id);
            const querySnapshot = await getDoc(docRef);
            const lesson = destructureData(querySnapshot)
            if (lesson) {
                setDescription(lesson?.description)
                setDuration(lesson?.duration)
                setMatiereId(lesson?.matiereId)
                setPrice(lesson?.price)
                setTitle(lesson?.title)
                setLessonToEdit(lesson)
            }
        }
    }

    useEffect(() => {
        getMatieres()
        getLesson(lessonId)
    }, [lessonId, isOpen])

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => handleOnClose()}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text>{lessonId ? 'Modifier la leçon ' : 'Créer une leçon'}</Text>
                    </ModalHeader>
                    <ModalBody>
                        <Flex flexDirection="column" justifyContent={'center'} gap={"15px"}>
                            <Input required
                                type="text"
                                placeholder="Titre"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Input>
                            <Input required
                                type="number"
                                placeholder="Durée (en min)"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            ></Input>
                            <Input required
                                type="number"
                                placeholder="Prix"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Input>
                            <Input required
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Input>
                            <Skeleton isLoaded={!isMatiereLoading}>
                                <Select required
                                    type="text"
                                    placeholder="Sélecionner une matière"
                                    value={matiereId}
                                    onChange={(e) => setMatiereId(e.target.value)}>
                                    {matieres?.map((matiere) => <option key={matiere.id} value={matiere.id}>{matiere.nom}</option>)}
                                </Select>
                            </Skeleton>
                        </Flex>
                    </ModalBody>
                    <ModalFooter justifyContent={'space-evenly'}>
                        <Button onClick={() => handleOnClose()}>Annuler</Button>
                        <Button colorScheme={'blue'} onClick={() => { lessonId ? editLesson() : addLesson() }}>Créer</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
