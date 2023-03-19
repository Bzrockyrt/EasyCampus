import { Flex } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase";
// import AuthDetails from './AuthDetails'
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import './style/SignIn.css'
import { doc, setDoc } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";

// useEffect(() => {
//
// })

export default function SignUp() {
    const [, setUserId] = useOutletContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")

    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSucces, setIsSucces] = useState(false);

    async function saveUserToFirestore(user) {
        if (nom && prenom) {
            try {
                const ref = doc(db, 'users', user.uid)
                await setDoc(ref, { email, nom, prenom })
            } catch (e) {
                console.log(e)
            }
        }
    }

    const signUp = (e) => {
        e.preventDefault();
        if (password == passwordConfirmation && email) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setUserId(userCredential.user)
                    saveUserToFirestore(userCredential.user)
                    setIsSucces(true);
                    setTimeout(() => {
                        setIsSucces(false)
                    }, 3000)
                })
                .catch((error) => {
                    console.log(error);
                    setIsError(true);
                    setTimeout(() => {
                        setIsError(false)
                    }, 3000)
                });
        } else {
            console.log("erreur")
        }
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp} className="form-login">
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1 className="text-login">Sign Up</h1>
                    <Flex flexDirection="column" justifyContent={'center'}>
                        <input className="champs-login"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="password"
                            placeholder="Confirmez votre mot de passe"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="nom"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="prenom"
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                        ></input>
                    </Flex>
                    <button type="submit" className="btn-sumbit-login">Sign Up</button>
                </Flex>
            </form>


            {isError &&
                <Alert status='error'>
                    <AlertIcon />
                    There was an error processing your request
                </Alert>}

            {isSucces &&
                <Alert status='success'>
                    <AlertIcon />
                    Votre compte a été créé
                </Alert>}



            {/*            <AuthDetails /> */}
        </div>
    )
}
