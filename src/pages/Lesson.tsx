import { Flex } from '@chakra-ui/react';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import AlertContext from "./AlertContext";

export default function Lesson() {
    const navigate = useNavigate();
    const [userId] = useOutletContext();
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const [isError, setIsError] = useState({ status: false, alert: "" });
    const [isSucces, setIsSucces] = useState({ status: false, alert: "" });

    function throwSuccess(alert) {
        setIsSucces({ status: true, alert });
        setTimeout(() => {
            setIsSucces({ status: false, alert: "" })
        }, 3000)
    }

    function throwAlert(alert) {
        setIsError({ status: true, alert: alert });
        setTimeout(() => {
            setIsError({ status: false, alert: "" })
        }, 3000)
    }

    async function saveLessonToFirestore() {
        if (title) {
            try {
                const ref = addDoc(collection(db, "Lessons"), {
                    userID: userId,
                    title: title,
                    duration: duration,
                    price: price,
                    description: description,
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
                throwSuccess("Votre compte a été créé");
            })
            .catch(() => {
                console.log("test err")
                throwAlert("Une erreur est survenue lors de la création de votre compte");
            });

    }

    return (
        <div className="sign-in-container">
            <form onSubmit={addLesson} className="form-login">
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1 className="text-login">Add lesson</h1>
                    <Flex flexDirection="column" justifyContent={'center'}>
                        <input className="champs-login" required
                            type="text"
                            placeholder="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                        <input className="champs-login" required
                            type="number"
                            placeholder="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        ></input>
                        <input className="champs-login" required
                            type="number"
                            placeholder="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></input>
                        <input className="champs-login" required
                            type="text"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></input>
                    </Flex>
                    <button type="submit" className="btn-sumbit-login">Add lesson</button>
                </Flex>
            </form>


            {/*isError &&
                <Alert status='error'>
                    <AlertIcon />
                    There was an error processing your request
    </Alert>*/}

            {/*isSucces &&
                <Alert status='success'>
                    <AlertIcon />
                    Votre lesson a été créé
</Alert>*/}



            {/*            <AuthDetails /> */}
        </div>
    )
}
