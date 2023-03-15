import { Flex } from "@chakra-ui/react";
import {getAuth, updateEmail} from "firebase/auth";
import React, { useState } from "react";

export default function EditUser() {
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const EditUser = (e) => {
        e.preventDefault();

        const auth = getAuth();
        console.log(auth.currentUser)
        updateEmail(auth.currentUser, email)
            .then((userCredential) => {
                console.log(userCredential);
                //  window.localStorage.setItem('token', JSON.stringify(userCredential))
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={EditUser}>
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1>Log In</h1>
                    <Flex flexDirection="row" justifyContent={'center'}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </Flex>
                    <button type="submit">Log In</button>
                </Flex>
            </form>
        </div>
    )
}
