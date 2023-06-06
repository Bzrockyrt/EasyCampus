import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, Text, useDisclosure, Link } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@chakra-ui/react';



export default function Lesson() {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const courseTypeModal = useDisclosure();
    const courseReservationModal = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();

    console.log('location id', location.state.id);

    function register(){
        // Mettre ici la logique pour l'inscription à un cours
        onClose();
    }

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
                    <h1>Présentation des concepts mathématiques</h1>
                    {/* Catégorie de la leçon */}
                    <Link className="linkcourse" textAlign={"left"} display="block" onClick={() => courseReservationModal.onOpen()}>Mathematiques</Link>
                    {/* Description de la leçon */}
                    <p>Durant cette leçon, vous allez apprendre les concepts de bases des mathématiques modernes.</p>
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