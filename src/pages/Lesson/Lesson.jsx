import {
    Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, Text, useDisclosure, Link,
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, background, Input
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getDoc, doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { color } from "framer-motion";
import { throwError, throwSuccess } from "../../utils/alerts";
import CommentSection from "../../components/CommentSection/CommentSection";

export default function Lesson() {
    const [userId, ,] = useOutletContext();
    const [docData, setDocData] = useState([]);
    const [matiereData, setMatiereData] = useState([]);
    const [pathReference, setPathReference] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation();
    const courseTypeModal = useDisclosure();
    const courseReservationModal = useDisclosure();
    const navigate = useNavigate();
    const now = new Date();
    const lessonId = location.state.id
    let selectedHour = "";
    let selectedDateTime = new Date();

    function dateTimeChanged(value) {
        selectedDateTime = value;
    }

    async function reservation() {
        await addDoc(collection(db, "Reservations"), {
            userId,
            lessonId,
            date: selectedDateTime,
            status: 'En attente'

        });
        throwSuccess("Votre réservation a bien été prise en compte");
        courseReservationModal.onClose();
        navigate('/');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'Lessons', location.state.id);
                const querySnapshot = await getDoc(docRef);
                const docData = querySnapshot.data();
                const matiere = doc(db, 'Matieres', docData.matiereId);
                const queryMatiereSnapshot = await getDoc(matiere);
                const matiereData = queryMatiereSnapshot.data();
                setDocData(docData);
                setMatiereData(matiereData);
            } catch (e) {
                console.log(e);
            }
        };

        const getMatiereImage = async () => {
            if (docData.matiereId) {
                const querySnapshot = await getDoc(doc(db, "Matieres", docData.matiereId));
                console.log('toto');
                if (querySnapshot) {
                    const matiere = destructureData(querySnapshot)
                    const imgUrl = matiere?.imgUrl
                    const storage = getStorage();
                    if (imgUrl) {
                        getDownloadURL(ref(storage, imgUrl)).then((url) => {
                            console.log(url);
                            setPathReference(url)
                            setIsLoading(false)
                        }).catch(function (error) {
                            console.log('Error when fetching lessonImage', error)
                        });
                    }
                }
            }
        }

        fetchData();
        getMatiereImage();
    }, []);

    function selectHourForCourse(param) {
        selectedHour = param;
    }

    return (
        <div>
            <div className="header">
                <div className='goback'>
                    <button onClick={() => navigate('/')}>
                        <ArrowLeftIcon textAlign="center" />
                        Retour
                    </button>
                </div>
            </div>
            <div className="container">
                <div className='left-column'>
                    <img src={pathReference} alt=''></img>
                </div>

                <div className='right-column'>

                    <div className='lesson-description'>
                        {/* Titre de la leçon */}
                        {docData && (<h1>{docData.title}</h1>)}
                        {/* Catégorie de la leçon */}
                        <Link className="linkcourse" textAlign={"left"} display="block" onClick={() => courseTypeModal.onOpen()}>{matiereData.nom}</Link>
                    </div>
                    <div className='lesson-localization'>
                        <Text fontStyle="italic" textAlign="left">{docData.description}</Text>
                    </div>
                    <div className='lesson-price'>
                        {/* Prix de la leçon */}
                        <span>{docData.price} €</span>
                        {/* Bouton pour ajouter s'inscrire à la leçon */}
                        {/* <a href="#" class="cart-btn" onClick={() => onOpen()}>S'inscrire</a> */}
                        <Button display={{ base: 'none', md: 'inline-flex' }} fontSize={'sm'} fontWeight={600} onClick={() => courseReservationModal.onOpen()} colorScheme="blue" border="0px">
                            Réserver
                        </Button>
                    </div>
                </div>
            </div>
            <CommentSection lessonId={lessonId} />
            <Modal isOpen={courseTypeModal.isOpen} onClose={courseTypeModal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {/* <Text>S'inscrire au cours {location.state.name}</Text> */}
                        <Text textAlign="center">{matiereData.nom}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexDirection="column" justifyContent={'center'}>
                            <Text textAlign="center">{matiereData.histoire}</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={courseReservationModal.isOpen} onClose={courseReservationModal.onClose} size="2xl">
                <ModalOverlay width="100%" />
                <ModalContent width="100%">
                    <ModalHeader>
                        {/* <Text>S'inscrire au cours {location.state.name}</Text> */}
                        <Text textAlign="center">Mathématiques</Text>
                    </ModalHeader>
                    <ModalBody width="100%">
                        <Flex flexDirection="column" justifyContent={'center'}>
                            <Text textAlign="center">Veuillez choisir un horaire pour votre cours</Text>
                            <Input placeholder="Select Date and Time" size="md" type="datetime-local" onChange={(e) => dateTimeChanged(e.target.value)}
                                min={now} width={'250px'} alignSelf={'center'} marginTop={'10px'} />

                            <Text textAlign="center" marginTop="20px" fontStyle="italic">En vous inscrivant à ce cours, vous serez mis en relation avec l'étudiant le proposant</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter justifyContent={'space-evenly'}>
                        <Button variant='ghost' marginRight="10px" onClick={courseReservationModal.onClose}>Annuler</Button>
                        <Button colorScheme='blue' onClick={() => reservation()}>Réserver</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
