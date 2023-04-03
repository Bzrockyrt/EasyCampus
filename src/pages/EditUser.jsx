import {Flex} from "@chakra-ui/react";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import React, {useEffect, useState} from "react";
import './style/SignIn.css'
import {useOutletContext} from "react-router-dom";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../firebase.js";

export default function EditUser() {
    const [userId,] = useOutletContext()
    const [userData, setUserData] = useState(undefined)
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");


    async function getUserData() {
        const docRef = doc(db, "users", userId);
        const user = await getDoc(docRef);
        if (user) setUserData(user._document.data.value.mapValue.fields)
    }

    async function saveUserToFirestore() {
        try {
            const ref = doc(db, 'users', userId)
            await setDoc(ref, { email, nom, prenom })
        } catch (err) {
            console.log(err)
        }
    }

    const EditUser = (e) => {
        e.preventDefault();

        const auth = getAuth();
        updateEmail(auth.currentUser, email)
            .then((userCredential) => {
                console.log(userCredential);
                saveUserToFirestore()
            })
            .catch((error) => {
                console.log(error);

            });

        const authPassword = getAuth();
        if (password == passwordConfirmation) {
            console.log("password check")
            updatePassword(authPassword.currentUser, password)
                .then((userCredential) => {
                    console.log(userCredential);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

        useEffect(() => {
        getUserData()
        console.log('userId', userId)
    }, [userId])
    console.log('userData', userData)

    return (
        <div className="sign-in-container">
            <form onSubmit={EditUser} className="form-login">
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1 className="text-login">Edit User</h1>
                    <Flex flexDirection="column" justifyContent={'center'}>
                        <input className="champs-login"
                               type="email"
                               placeholder={userData?.email.stringValue}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input className="champs-login"
                               type="text"
                               placeholder={userData?.nom.stringValue}
                               value={nom}
                               onChange={(e) => setNom(e.target.value)}
                        ></input>
                        <input className="champs-login"
                               type="text"
                               placeholder={userData?.prenom.stringValue}
                               value={prenom}
                               onChange={(e) => setPrenom(e.target.value)}
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
                    <button type="submit" className="btn-sumbit-login">Edit</button>
                    <button className="btn-sumbit-login">Password</button>
                </Flex>
            </form>
        </div>
    )
}
