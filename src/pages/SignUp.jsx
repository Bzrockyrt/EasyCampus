import { Flex } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth, db } from "../firebase";
// import AuthDetails from './AuthDetails'
// import {
//     Alert,
//     AlertIcon,
// } from '@chakra-ui/react'
import './style/SignIn.css'
import { doc, setDoc } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import Alert from "../utils/Alerts";
import AlertContext from "./AlertContext";

// useEffect(() => {
//
// })

export default function SignUp() {
    const [, setUserId] = useOutletContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [phone, setPhone] = useState("")
    const { setErrorMessage, setSuccessMessage } = useContext(AlertContext)

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

    function checkIfMissingData() {
        if (!email) {
            setErrorMessage("Veuillez rentrer un email");
            return true;
        }
        if (!password) {
            throwAlert("Veuillez rentrer un mot de passe");
            return true;
        }
        if (!passwordConfirmation) {
            throwAlert("Veuillez confirmer votre mot de passe");
            return true;
        }
        if (!nom) {
            throwAlert("Veuillez rentrer nom nom");
            return true;
        }
        if (!prenom) {
            throwAlert("Veuillez rentrer votre prénom");
            return true;
        }
        if (!phone) {
            throwAlert("Veuillez rentrer votre numéro de téléphone");
            return true;
        }
        if (password != passwordConfirmation) {
            throwAlert("Vos mots de passe ne correspondent pas");
            return true;
        }
        return false
    }

    async function saveUserToFirestore(userId) {
        try {
            const ref = doc(db, 'users', userId)
            await setDoc(ref, { email, nom, prenom, phone })
        } catch (e) {
            console.log(e)
        }
    }

    const signUp = (e) => {
        e.preventDefault();
        if (checkIfMissingData()) return;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserId(userCredential.user.uid)
                saveUserToFirestore(userCredential.user.uid)
                throwSuccess("Votre compte a été créé");
            })
            .catch((error) => {
                console.log(error);
                throwAlert("Une erreur est survenue lors de la création de votre compte");
            });
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp} className="form-login">
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1 className="text-login">Créer mon compte</h1>
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
                            type="text"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="text"
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="number"
                            placeholder="Téléphone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></input>
                    </Flex>
                    <button type="submit" className="btn-sumbit-login">Sign Up</button>
                </Flex>
            </form>
            {/* {isError.status &&
                <div style={{ width: "100%", position: "absolute", top: "75px", display: "flex", justifyContent: "center" }}>
                    <Alert maxWidth={"500px"} borderRadius={"15px"} status='error'>
                        <AlertIcon />
                        {isError.alert}
                    </Alert>
                </div>
            } */}
            {/* {isSucces.status &&
                <div style={{ width: "100%", position: "absolute", top: "75px", display: "flex", justifyContent: "center" }}>
                    <Alert maxWidth={"500px"} borderRadius={"15px"} status='success'>
                        <AlertIcon />
                        {isSucces.alert}
                    </Alert>
                </div>
            } */}
        </div>
    )
}
