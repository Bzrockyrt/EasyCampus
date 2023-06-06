import { Flex, Input, Select, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { throwError, throwSuccess } from '../utils/alerts';

export default function Lesson() {
    const navigate = useNavigate();
    const [userId] = useOutletContext();
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [matiereId, setMatiereId] = useState("")
    const [matieres, setMatieres] = useState([])
    const [isMatiereLoading, setIsMatiereLoading] = useState(true)

    async function saveLessonToFirestore() {
        if (title) {
            try {
                const ref = addDoc(collection(db, "Lessons"), {
                    userID: userId,
                    title,
                    duration,
                    price,
                    description,
                    matiereId,
                    notation: "5"
                });
            } catch (e) {
                console.log(e)
            }
        }
    }

    const addLesson = (e) => {
        e.preventDefault();
        saveLessonToFirestore()
            .then(() => {
                console.log("test")
                throwSuccess("Leçon créée!");
                // should navigate to the lesson page
            })
            .catch(() => {
                console.log("test err")
                throwError("Une erreur est survenue lors de la création de votre leçon");
            });
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

    useEffect(() => {
        getMatieres()
    }, [])

    return (
        <div className="sign-in-container">
            <form onSubmit={addLesson} className="form-login">
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1 className="text-login">Créer une leçon</h1>
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
                    <button type="submit" className="btn-sumbit-login">Créer</button>
                </Flex>
            </form>
        </div >
    )
}
