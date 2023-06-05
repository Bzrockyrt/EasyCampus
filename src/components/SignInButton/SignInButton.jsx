import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Input } from '@chakra-ui/react'

export default function SignInButton({ setUserId }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

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

    return (
        <>
            <Button
                fontSize={'sm'}
                fontWeight={400}
                color={'white'}
                variant={'link'}
                onClick={() => onOpen()}>
                Se connecter
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text>Se connecter</Text>
                    </ModalHeader>
                    <ModalBody>
                        <Flex flexDirection="column" justifyContent={'center'}>

                            <Input className="champs-login"
                                placeholder='Enter your email'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size='md'
                                borderColor={"gray"}
                                required />

                            <Input className="champs-login"
                                placeholder='Enter your password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                size='md'
                                borderColor={"gray"}
                                required />
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => signIn()}>Connecter</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
