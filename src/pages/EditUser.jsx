import { Flex } from "@chakra-ui/react";
import { getAuth, updateEmail } from "firebase/auth";
import React, { useState } from "react";
import './SignIn/style/SignIn.css'

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
            <form onSubmit={EditUser} className="form-login">
                <Flex flexDirection="column" justifyContent={'center'}>
                    <h1 className="text-login">Edit User</h1>
                    <Flex flexDirection="column" justifyContent={'center'}>
                        <input className="champs-login"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </Flex>
                    <button type="submit" className="btn-sumbit-login">Edit</button>
                </Flex>
            </form>
        </div>
    )
}
