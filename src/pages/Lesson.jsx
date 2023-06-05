import { Flex, Input, Select } from '@chakra-ui/react';
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { throwError, throwSuccess } from '../utils/alerts';

export default function Lesson() {
    const navigate = useNavigate();
    const [userId] = useOutletContext();
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [subject, setSubject] = useState("")

    async function saveLessonToFirestore() {
        if (title) {
            try {
                const ref = addDoc(collection(db, "Lessons"), {
                    userID: userId,
                    title,
                    duration,
                    price,
                    description,
                    subject,
                    imgUrl: "Economy.jpg",
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
    console.log(subject)
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
                        <Select required
                            type="text"
                            placeholder="Sélecionner une matière"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}>
                            <option value='Mathématiques'>Mathématiques</option>
                            <option value='Economie'>Economie</option>
                            <option value='Fançais'>Fançais</option>
                        </Select>
                    </Flex>
                    <button type="submit" className="btn-sumbit-login">Créer</button>
                </Flex>
            </form>
        </div >
    )
}
