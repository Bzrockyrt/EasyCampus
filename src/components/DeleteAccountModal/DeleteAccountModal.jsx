import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { deleteUser, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { throwError, throwSuccess } from '../../utils/alerts';

export default function DeleteAccountModal({ targetedUserId, isOpen, onClose }) {
    const [userId, setUserId, isAdmin] = useOutletContext()
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    console.log('auth.currentUser', auth.currentUser)
    async function getUserData(userId) {
        let docRef = doc(db, "users", userId);
        const querySnapshot = await getDoc(docRef);
        if (querySnapshot) console.log('querySnapshot', querySnapshot)
    }

    async function deleteAccount() {
        if (userId != targetedUserId) {
            deleteUser(auth.currentUser).then(async () => {
                let docRef = doc(db, "users", targetedUserId);
                await deleteDoc(docRef);
                throwSuccess('Votre compte a bien été supprimé')
            }).catch((error) => {
                throwError('Une erreur est survenue lors de la suppression de votre compte ')
                console.log(error)
            });
        } else if (auth) {
            signInWithEmailAndPassword(auth, auth.currentUser.email, password)
                .then(() => {
                    deleteUser(auth.currentUser).then(async () => {
                        let docRef = doc(db, "users", userId);
                        await deleteDoc(docRef);
                        signOut(auth).then(() => {
                            setUserId(null)
                            navigate('/')
                        }).catch((error) => {
                            console.log(error)
                        });
                        throwSuccess('Votre compte a bien été supprimé')
                    }).catch((error) => {
                        throwError('Une erreur est survenue lors de la suppression de votre compte ')
                        console.log(error)
                    });
                })
                .catch(() => {
                    throwError('Mot de passe incorrect')
                    console.log('password error')
                });
        }
    }

    useEffect(() => {
        getUserData(targetedUserId)
    }, [targetedUserId])

    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Êtes-vous sûr(e) de vouloir supprimer votre compte?</ModalHeader>
            {isAdmin && <ModalBody>
                <Text fontStyle={'italic'} marginBottom={'5px'}>Afin de valider la suppression du compte, veuillez renseigner votre mot de passe :</Text>
                <Input type={'password'} placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
            </ModalBody>}
            <ModalFooter justifyContent={'space-evenly'}>
                <Button onClick={() => onClose()}>
                    Annuler
                </Button>
                <Button colorScheme={"red"} onClick={() => deleteAccount()}>
                    Valider
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}