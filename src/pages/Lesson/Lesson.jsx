import {
    Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, Text, useDisclosure, Link,
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, background, Input, Box, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Popover, PopoverFooter, Skeleton
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ArrowLeftIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getDoc, doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { color } from "framer-motion";
import { throwError, throwSuccess } from "../../utils/alerts";
import CommentSection from "../../components/CommentSection/CommentSection";
import destructureData from "../../utils/destructureData";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default function Lesson() {
    const [userId, ,] = useOutletContext();
    const [docData, setDocData] = useState([]);
    const [matiereData, setMatiereData] = useState([]);
    const [pathReference, setPathReference] = useState('')
    const [username, setUsername] = useState('')
    const [reportReason, setReportReason] = useState('')
    const [isUserLoading, setIsUserLoading] = useState(true)
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
            if (querySnapshot) {
                const matiere = destructureData(querySnapshot)
                const imgUrl = matiere?.imgUrl
                const storage = getStorage();
                if (imgUrl) {
                    getDownloadURL(ref(storage, imgUrl)).then((url) => {
                        setPathReference(url)
                    }).catch(function (error) {
                        console.log('Error when fetching lessonImage', error)
                    });
                }
            }
        }
    }
    const getUsername = async () => {
        if (docData.userId) {
            const querySnapshot = await getDoc(doc(db, "users", docData.userId));
            const user = destructureData(querySnapshot)
            if (user) {
                setUsername(`${user.prenom} ${user.nom}`)
                setIsUserLoading(false)
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        getMatiereImage();
        getUsername()
    }, [docData]);

    async function reportUser() {
        if (!reportReason) {
            throwError('Veuillez indiquer une raison afin de signaler un utilisateur')
        } else {
            let today = new Date()
            await addDoc(collection(db, "Reports"), {
                userReportedId: docData.userId,
                reason: reportReason,
                date: today,
                userId

            });
            throwSuccess("Le signalement sera traité prochainement par nos administrateurs");
        }
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
                    <Skeleton isLoaded={!isUserLoading}>
                        <Box color={"gray.600"} textAlign={'left'} marginBottom={'20px'} flexDirection={'row'} display={'flex'} alignItems={'center'}><Text>{username}</Text>
                            <Popover trigger="hover" onClose={() => setReportReason('')}>
                                <PopoverTrigger>
                                    <InfoOutlineIcon marginLeft={'10px'} />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Voulez vous signaler cette utilisateur?</PopoverHeader>
                                    <PopoverBody>
                                        <Flex flexDirection={'column'}>
                                            <Text>
                                                Veuillez indiquer une raison :
                                            </Text>
                                            <Input value={reportReason} onChange={(e) => setReportReason(e.target.value)}></Input>
                                        </Flex>
                                    </PopoverBody>
                                    <PopoverFooter justifyContent={'center'}><Button colorScheme={'red'} onClick={() => reportUser()}>Signaler</Button></PopoverFooter>
                                </PopoverContent>
                            </Popover>
                        </Box>
                    </Skeleton>
                    <div className='lesson-important'>
                        <div className="lesson-price-duration">
                            {/* Prix de la leçon */}
                            <span className="lesson-price">{docData.price} €</span>
                            <p>pour</p>
                            {/* Durée de la leçon */}
                            <span className="lesson-duration">{docData.duration}</span>
                            <p>minutes</p>
                        </div>
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
            <Modal isOpen={courseReservationModal.isOpen} onClose={courseReservationModal.onClose} size="3xl">
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

                            <Text textAlign="center" marginTop="20px" fontStyle="italic">Après la demande de réservation, vous devrez attendre que le responsable de la leçon accepte.</Text>
                            <Text textAlign="center" fontStyle="italic">Vous pourrez voir le status de votre demande dans l'onglet "Réservations" de la page "Profil"</Text>
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
