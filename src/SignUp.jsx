import { Flex } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
// import AuthDetails from './AuthDetails'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isSucces, setSucces] = useState(false);

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
               setSucces(true);
               setTimeout(() => {
                setSucces(false)
               }, 3000)
            })
            .catch((error) => {
                console.log(error);
                setError(true);
                 setTimeout(() => {
                                setSucces(false)
                               }, 3000)
            });
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1>Sign Up</h1>
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
                    <button type="submit">Sign Up</button>
                </Flex>
            </form>


            {error &&
            <Alert status='error'>
             <AlertIcon />
             There was an error processing your request
             </Alert>}

             {isSucces &&
                         <Alert status='error'>
                          <AlertIcon />
                          There was an error processing your request
                          </Alert>}



{/*            <AuthDetails /> */}
        </div>
    )
}
