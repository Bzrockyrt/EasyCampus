import { Box, Button, Flex, Skeleton, Text, useDisclosure } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';
import HorizontalLine from '../HorizontalLine/HorizontalLine';

export default function Userdata({ targetedUserId, dataToDisplay, width }) {
    const [userId, ,] = useOutletContext()
    const [userData, setUserData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const deleteAccountDisclosure = useDisclosure()

    async function getUserData(id) {
        if (id) {
            let docRef = doc(db, "users", id);
            const querySnapshot = await getDoc(docRef);
            if (querySnapshot) {
                let user = {}
                let object = querySnapshot._document.data.value.mapValue.fields
                let keys = Object.keys(object)
                keys.forEach((key) => user[key] = object[key].stringValue)
                user.id = querySnapshot.id
                setUserData(user)
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        getUserData(targetedUserId)
    }, [targetedUserId])

    return <Box height={width ? width : '100%'}>
        <Flex height={'15%'} alignItems={'center'} justifyContent={'center'}>
            <Text fontSize={'28px'} fontWeight={600}>
                PROFIL
            </Text>
        </Flex>
        <Box height={'75%'}>
            <Skeleton isLoaded={!isLoading}>
                <Box margin={'0 20%'}>
                    {userData && dataToDisplay.map((key, index) => {
                        if (userData[key]) return <HorizontalLine key={key} targetedUserId={userData.id} label={key} value={userData[key]} bgColor={index % 2 != 0 ? "#dfdfdf" : "#f5f5f5"} />
                        else if (key == 'role') return <HorizontalLine key={key} targetedUserId={userData.id} label={key} value={userData[key]} bgColor={index % 2 != 0 ? "#dfdfdf" : "#f5f5f5"} />
                        else return null
                    })}
                </Box>
            </Skeleton>
        </Box>
        {userId == targetedUserId && <>
            <Box height={'10%'} display={'flex'} justifyContent={'center'}>
                <Button colorScheme={"red"} onClick={() => deleteAccountDisclosure.onOpen()}>Supprimer ce compte</Button>
            </Box>
            <DeleteAccountModal targetedUserId={targetedUserId} isOpen={deleteAccountDisclosure.isOpen} onClose={deleteAccountDisclosure.onClose} />
        </>}
    </Box>
}