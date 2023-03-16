import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom'
import { Flex } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
<<<<<<< HEAD:src/SignIn.jsx
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom"
=======
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import './style/SignIn.css'
>>>>>>> register:src/pages/SignIn/SignIn.jsx

export default function SignIn() {
    const [user, setUser] = useOutletContext()
    console.log('user', user)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
<<<<<<< HEAD:src/SignIn.jsx
                setUser(userCredential)
                navigate('/profile')
=======
                // window.localStorage.setItem('uid', JSON.stringify(userCredential.user.uid))
>>>>>>> register:src/pages/SignIn/SignIn.jsx
            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signIn} className="form-login">
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1 className="text-login">Sign In</h1>
                    <Flex flexDirection="column" justifyContent={'center'}>
                        <input className="champs-login"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input className="champs-login"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </Flex>
                    <button type="submit" className="btn-sumbit-login">Sign In</button>
                </Flex>
            </form>
        </div>
        // </div>
    )
}
