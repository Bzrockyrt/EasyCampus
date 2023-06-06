import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, Text, useDisclosure, Link,
         Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, background, } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { color } from "framer-motion";

export default function Lesson() {  
    const [docData, setDocData] = useState(null);
    const location = useLocation();
    const courseTypeModal = useDisclosure();
    const courseReservationModal = useDisclosure();
    const navigate = useNavigate();

    let selectedHour = "";

    function register(){
        // Mettre ici la logique pour l'inscription à un cours
        console.log("bouton : ", selectedHour);
        courseReservationModal.onClose();
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

    function selectHourForCourse (param) {
        selectedHour = param;
    }
   
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
                    {docData && (<h1>{docData.title}</h1>)}
                    {/* Catégorie de la leçon */}
                    <Link className="linkcourse" textAlign={"left"} display="block" onClick={() => courseTypeModal.onOpen()}>Mathematiques</Link>
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
                    <Button display={{ base: 'none', md: 'inline-flex' }} fontSize={'sm'} fontWeight={600} onClick={() => courseReservationModal.onOpen()} colorScheme="blue" border="0px">
                        Horaires réservation
                    </Button>
                </div>
            </div>
            <Modal isOpen={courseTypeModal.isOpen} onClose={courseTypeModal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {/* <Text>S'inscrire au cours {location.state.name}</Text> */}
                        <Text textAlign="center">Thématiques</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexDirection="column" justifyContent={'center'}>
                            <Text textAlign="center">Souhaitez-vous vous inscrire pour ce cours ? Vous serez alors mis en relation avec l'étudiant le proposant</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={courseReservationModal.isOpen} onClose={courseReservationModal.onClose} size="5xl">
                <ModalOverlay  width="100%"/>
                <ModalContent width="100%">
                    <ModalHeader>
                        {/* <Text>S'inscrire au cours {location.state.name}</Text> */}
                        <Text textAlign="center">Mathématiques</Text>
                    </ModalHeader>
                    <ModalBody width="100%">
                        <Flex flexDirection="column" justifyContent={'center'}>
                            <Text textAlign="center">Veuillez choisir un horaire pour votre cours</Text>
                            <TableContainer width="100%">
                                <Table variant='simple' width="100%">
                                    <Thead>
                                        <Tr>
                                            <Th width="auto" textAlign="center">Lundi</Th>
                                            <Th width="auto" textAlign="center">Mardi</Th>
                                            <Th width="auto" textAlign="center">Mercredi</Th>
                                            <Th width="auto" textAlign="center">Jeudi</Th>
                                            <Th width="auto" textAlign="center">Vendredi</Th>
                                            <Th width="auto" textAlign="center">Samedi</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="LU17" onClick={(e) => selectHourForCourse(e.target.id)}>17:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="MA17" onClick={(e) => selectHourForCourse(e.target.id)}>17:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="ME17" onClick={(e) => selectHourForCourse(e.target.id)}>17:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="JE17" onClick={(e) => selectHourForCourse(e.target.id)}>17:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="VE17" onClick={(e) => selectHourForCourse(e.target.id)}>17:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="SA17" onClick={(e) => selectHourForCourse(e.target.id)}>17:00</button></Td>
                                        </Tr>
                                        <Tr>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="LU18" onClick={(e) => selectHourForCourse(e.target.id)}>18:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="MA18" onClick={(e) => selectHourForCourse(e.target.id)}>18:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="ME18" onClick={(e) => selectHourForCourse(e.target.id)}>18:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="JE18" onClick={(e) => selectHourForCourse(e.target.id)}>18:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="VE18" onClick={(e) => selectHourForCourse(e.target.id)}>18:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="SA18" onClick={(e) => selectHourForCourse(e.target.id)}>18:00</button></Td>
                                        </Tr>
                                        <Tr>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="LU19" onClick={(e) => selectHourForCourse(e.target.id)}>19:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="MA19" onClick={(e) => selectHourForCourse(e.target.id)}>19:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="ME19" onClick={(e) => selectHourForCourse(e.target.id)}>19:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="JE19" onClick={(e) => selectHourForCourse(e.target.id)}>19:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="VE19" onClick={(e) => selectHourForCourse(e.target.id)}>19:00</button></Td>
                                            <Td padding="0px" margin="0px" textAlign="center"><button className="buttonTableHour" id="SA19" onClick={(e) => selectHourForCourse(e.target.id)}>19:00</button></Td>
                                        </Tr>
                                    </Tbody>
                                    <Tfoot>

                                    </Tfoot>
                                </Table>
                            </TableContainer>
                            
                            <Text textAlign="center" marginTop="20px" fontStyle="italic">En vous inscrivant à ce cours, vous serez mis en relation avec l'étudiant le proposant</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' onClick={() => register()}>Réserver</Button>
                        <Button variant='ghost' marginLeft="10px" onClick={courseReservationModal.onClose}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <div>
      {docData && (
        <p>{docData.title}</p>
      )}
    </div>
        </div>
    )
}
