import { Flex } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth, db } from "../firebase";
import './style/SignIn.css'
import { doc, setDoc } from "firebase/firestore";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { throwError, throwSuccess } from "../utils/alerts";

// useEffect(() => {
//
// })

export default function SignUp() {
    const navigate = useNavigate()
    const [userId, setUserId] = useOutletContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [phone, setPhone] = useState("")

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
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                saveUserToFirestore(userCredential.user.uid)
                throwSuccess("Votre compte a été créé");
            })
            .catch((error) => {
                console.log(error);
                throwError("Une erreur est survenue lors de la création de votre compte");
            });
    };
    console.log(userId)
    if (userId) navigate('/')
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
                            required
                        ></input>
                        <input className="champs-login"
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>
                        <input className="champs-login"
                            type="password"
                            placeholder="Confirmez votre mot de passe"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        ></input>
                        <input className="champs-login"
                            type="text"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        ></input>
                        <input className="champs-login"
                            type="text"
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                        ></input>
                        <input className="champs-login"
                            type="number"
                            placeholder="Téléphone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        ></input>
                    </Flex>
                    <button type="submit" className="btn-sumbit-login">Sign Up</button>
                </Flex>
            </form>
        </div>
    )
}
