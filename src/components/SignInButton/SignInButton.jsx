import { Box, Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Input } from '@chakra-ui/react'
import { throwError } from "../../utils/alerts";

export default function SignInButton({ setUserId }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    {/*    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserId(userCredential.user.uid)
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            });
    };*/}

    const signIn = async () => {
        try {
            const auth = getAuth();
            const { user } = await signInWithEmailAndPassword(auth, email, password);

            // Recherche de l'utilisateur dans la collection "users"
            const db = getFirestore();
            const userRef = doc(db, 'users', user.uid);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();

                // Vérification du champ "blockedTime"
                const blockedTime = userData.blockedTime;

                if (blockedTime && blockedTime.toDate() > new Date()) {
                    // Déconnexion de l'utilisateur
                    logout()
                    throwError(`Votre compte a été restreint : ${userData.blockedReason}`)
                    return;
                }
            }

            // L'utilisateur est autorisé à se connecter
            setUserId(user.uid);
            navigate('/');
        } catch (error) {
            console.log(error);
            throwError('Une erreur est survenue lors de la connexion')
        }
    };

    function logout() {
        signOut(auth).then(() => {
            setUserId(null)
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }


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
                        <Flex marginTop={'15px'}>Pas de compte?<a style={{ marginLeft: '5px', cursor:'pointer' }} onClick={() => handleOnClick()}>Créez-en un ici!</a></Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme={'blue'} onClick={() => signIn()}>Connecter</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
