import { Flex } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('ça marche')
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signIn}>
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1>Log In</h1>
                    <Flex flexDirection="row" justifyContent={'center'}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </Flex>
                    <button type="submit">Log In</button>
                </Flex>
            </form>
        </div>
    )
}
