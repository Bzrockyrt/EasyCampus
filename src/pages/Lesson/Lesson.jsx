import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, Text, useDisclosure, Link } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Lesson() {  
    const [docData, setDocData] = useState(null);
    const location = useLocation();
    const courseTypeModal = useDisclosure();
    const courseReservationModal = useDisclosure();
    const navigate = useNavigate();

    function register(){
        // Mettre ici la logique pour l'inscription à un cours
        onClose();
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const docRef = doc(db, 'Lessons', location.state.id);
            const querySnapshot = await getDoc(docRef);
            const docData = querySnapshot.data();
            setDocData(docData);
          } catch (e) {
            console.log(e);
          }
        };
    
        fetchData();
      }, []);
   
  /*useEffect(() => {
    console.log('lessonID',location.state.id)
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'Lessons', location.state.id);
        const docData = querySnapshot.data();
        const querySnapshot = await getDoc(docRef);
        setDocData(docData);
        console.log(docData)
      } catch (e) {
        console.log(e);
      }

    };
    fetchData();
  }, []);*/
            
  return (
    <div className='container'>
        <div className='left-column'>
            <img src='Economy.jpg' alt=''></img>
        </div>
            
            <div className='right-column'>
                <div className='goback'>
                    <button onClick={() => navigate('/')}>
                        <ArrowLeftIcon textAlign="center"/>
                        Retour
                    </button>                
                </div>

                <div className='lesson-description'>
                    {/* Titre de la leçon */}
                    <h1>{docData.title}</h1>
                    {/* Catégorie de la leçon */}
                    <Link className="linkcourse" textAlign={"left"} display="block" onClick={() => courseReservationModal.onOpen()}>Mathematiques</Link>
                    {/* Description de la leçon */}
                    <p>{docData.description}</p>
                </div>
                <div className='lesson-localization'>
                    <Text fontStyle="italic" textAlign="left">Mettre ici la localisation de l'étudiant proposant le cours. On pourra faire appel à l'API de Google Maps pour afficher une carte</Text>
                </div>
                <div className='lesson-price'>
                    {/* Prix de la leçon */}
                    <span>150,00€</span>
                    {/* Bouton pour ajouter s'inscrire à la leçon */}
                    {/* <a href="#" class="cart-btn" onClick={() => onOpen()}>S'inscrire</a> */}
                    <Button display={{ base: 'none', md: 'inline-flex' }} fontSize={'sm'} fontWeight={600} onClick={() => courseTypeModal.onOpen()} colorScheme="blue" border="0px">
                        Horaires réservation
                    </Button>
                </div>
            </div>
            <Modal isOpen={courseTypeModal.isOpen} onClose={courseTypeModal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {/* <Text>S'inscrire au cours {location.state.name}</Text> */}
                        <Text textAlign="center">Réservation horaires</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexDirection="column" justifyContent={'center'}>
                            <Text textAlign="center">Souhaitez-vous vous inscrire pour ce cours ? Vous serez alors mis en relation avec l'étudiant le proposant</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' onClick={() => register()}>Réserver</Button>
                        <Button variant='ghost' onClick={courseTypeModal.onClose}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={courseReservationModal.isOpen} onClose={courseReservationModal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {/* <Text>S'inscrire au cours {location.state.name}</Text> */}
                        <Text textAlign="center">Mathématiques</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexDirection="column" justifyContent={'center'}>
                            <Text textAlign="center">Mettre ici la description des cours de mathématiques</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
