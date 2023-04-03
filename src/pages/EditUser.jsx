import { Flex } from "@chakra-ui/react";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import './style/SignIn.css'
import { useNavigate, useOutletContext } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export default function EditUser() {
    const navigate = useNavigate()
    const [userId,] = useOutletContext()
    const [userData, setUserData] = useState(undefined)
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");


    async function getUserData() {
        const docRef = doc(db, "users", userId);
        const user = await getDoc(docRef);
        if (user) {
            setUserData(user._document.data.value.mapValue.fields)
            setEmail(user._document.data.value.mapValue.fields?.email.stringValue)
            setNom(user._document.data.value.mapValue.fields?.nom.stringValue)
            setPrenom(user._document.data.value.mapValue.fields?.prenom.stringValue)
            setPhone(user._document.data.value.mapValue.fields?.phone.stringValue)
        }
    }

    async function saveUserToFirestore() {
        try {
            const ref = doc(db, 'users', userId)
            await setDoc(ref, { email, nom, prenom, phone })
        } catch (err) {
            console.log(err)
        }
    }

    const EditUser = (e) => {
        e.preventDefault();

        const auth = getAuth();
        updateEmail(auth.currentUser, email)
            .then((userCredential) => {
                saveUserToFirestore()
            })
            .catch((error) => {
                console.log(error);

            });

        const authPassword = getAuth();
        if (password && password == passwordConfirmation) {
            updatePassword(authPassword.currentUser, password)
                .then((userCredential) => {
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        getUserData()
    }, [userId])

    if (!userId) navigate('/signin')
    return (
        <div className="sign-in-container">
            <form onSubmit={EditUser} className="form-login">
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1 className="text-login">Edit User</h1>
                    <Flex flexDirection="column" justifyContent={'center'}>
                        <input className="champs-login"
                            type="email"
                            placeholder={email}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="text"
                            placeholder={nom}
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="text"
                            placeholder={prenom}
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="number"
                            placeholder={phone}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="password"
                            placeholder="*************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="password"
                            placeholder="*************"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        ></input>
                    </Flex>
                    <button type="submit" className="btn-sumbit-login">Modifier</button>
                    <button className="btn-sumbit-login">Password</button>
                </Flex>
            </form>
        </div>
    )
}
