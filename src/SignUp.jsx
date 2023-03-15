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
import './SignIn.css'

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
            <div className="image-login"><img src="../public/login.jpg" alt="img-sign" /></div>
            <form onSubmit={signUp} className="form-login">
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1 className="text-login">Sign Up</h1>
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
                    <button type="submit" className="btn-sumbit-login">Sign Up</button>
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
