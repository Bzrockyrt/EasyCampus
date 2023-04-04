import { Flex } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { auth } from "../firebase";
import './style/SignIn.css'

export default function SignIn() {
    const [userId, setUserId] = useOutletContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserId(userCredential.user.uid)
                navigate('/a')
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (userId) navigate('/')
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
                        <a href="/signup" style={{ marginTop: "20px" }}>No account? Create one!</a>
                    </Flex>
                    <button type="submit" className="btn-sumbit-login">Sign In</button>
                </Flex>
            </form>
        </div>
    )
}
