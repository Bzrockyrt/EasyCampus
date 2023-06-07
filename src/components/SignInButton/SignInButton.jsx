import { Box, Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
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

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserId(userCredential.user.uid)
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function handleOnClick() {
        onClose()
        document.getElementById('signUpButton').click()
    }

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
                        <FormControl>
                            <FormLabel>Adresse email</FormLabel>
                            <Input placeholder='Email'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size='md'
                                borderColor={"gray"}
                                required
                                marginBottom={'25px'} />
                            <FormLabel>Mot de passe</FormLabel>
                            <Input placeholder='Mot de passe'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                size='md'
                                borderColor={"gray"}
                                required />
                        </FormControl>
                        <Flex marginTop={'15px'}>Pas de compte?<a style={{ marginLeft: '5px' }} onClick={() => handleOnClick()}>Créez-en un ici!</a></Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme={'blue'} onClick={() => signIn()}>Connecter</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
