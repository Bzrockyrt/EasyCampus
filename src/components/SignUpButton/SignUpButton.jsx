import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth, db } from "../../firebase";
import { Input } from '@chakra-ui/react'
import { doc, setDoc } from "firebase/firestore";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { throwError, throwSuccess } from "../../utils/alerts";

// useEffect(() => {
//
// })

export default function SignUpButton({ shouldOpen }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [phone, setPhone] = useState("")

    async function saveUserToFirestore(userId) {
        try {
            const ref = doc(db, 'users', userId)
            await setDoc(ref, { email, nom, prenom, phone, role: "user" })
        } catch (e) {
            console.log(e)
        }
    }

    function signUp() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                saveUserToFirestore(userCredential.user.uid)
                throwSuccess("Votre compte a été créé");
                onClose()
            })
            .catch((error) => {
                console.log(error);
                throwError("Une erreur est survenue lors de la création de votre compte");
            });
    };

    if (shouldOpen) onOpen()

    return (
        <>
            <Button
                id='signUpButton'
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'#293b6b'}
                onClick={() => onOpen()}
                _hover={{
                    bg: 'pink.300',
                }}>
                Créer un compte
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text>Créer mon compte</Text>
                    </ModalHeader>
                    <ModalBody>
                        <Flex flexDirection="column" justifyContent={'center'}>
                            <Input className="champs-login"
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size='md'
                                borderColor={"gray"}
                                required />
                            <Input className="champs-login"
                                type="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                size='md'
                                borderColor={"gray"}
                                required />
                            <Input className="champs-login"
                                type="password"
                                placeholder="Confirmez votre mot de passe"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                size='md'
                                borderColor={"gray"}
                                required />
                            <Input className="champs-login"
                                type="text"
                                placeholder="Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                size='md'
                                borderColor={"gray"}
                                required />
                            <Input className="champs-login"
                                type="text"
                                placeholder="Prénom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                size='md'
                                borderColor={"gray"}
                                required />
                            <Input className="champs-login"
                                type="number"
                                placeholder="Téléphone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                size='md'
                                borderColor={"gray"}
                                required />
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => signUp()}>Créer</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
