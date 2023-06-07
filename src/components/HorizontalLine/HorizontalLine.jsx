import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Input, Select, Skeleton, Text } from '@chakra-ui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase';
import { throwError, throwSuccess } from '../../utils/alerts';
import destructureData from '../../utils/destructureData';

export default function HorizontalLine({ targetedUserId, label, value, bgColor }) {
    const [userId, , isAdmin] = useOutletContext()
    const [currentValue, setCurrentValue] = useState(value)
    const [editMode, setEditMode] = useState(false)

    async function editField() {
        if (targetedUserId) {
            let user = await getDoc(doc(db, 'users', targetedUserId))
            if (user) {
                user = destructureData(user)
                if (userId == targetedUserId || (userId != targetedUserId && user.role != 'admin')) {
                    try {
                        const ref = doc(db, 'users', targetedUserId)
                        let toUpdate = {
                            [label]: currentValue,
                        }
                        await updateDoc(ref, toUpdate)
                        throwSuccess("Ce champ a bien été modifié")
                        setEditMode(false)
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    setEditMode(false)
                    setCurrentValue(value)
                    throwError("Vous n'êtes pas autorisé à modifier cet utilisateur")
                }
            }
        }
    }

    return <Flex flexDirection={'row'} alignItems={'center'} borderRadius={'15px'} margin={'0 0 5px'} gap={'6%'} height={'40px'} backgroundColor={bgColor}>
        <Flex width={'80%'} flexDirection={'row'} alignItems={'center'}>
            <Text width={'28%'} textAlign={'right'} fontWeight='500' marginRight={'6%'}>
                {label.charAt(0).toUpperCase() + label.slice(1)}:
            </Text>
            {!editMode ?
                <Text width={'68%'} textAlign={'left'}>
                    {currentValue}
                </Text> :
                label == 'role' ?
                    <Select width={'68%'} value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </Select> :
                    <Input width={'68%'} value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} />
            }
        </Flex>
        <Box>
            {editMode ?
                <HStack height={'100%'} textAlign={'right'}>
                    <CheckIcon onClick={() => editField(label)} cursor={'pointer'} />
                    <CloseIcon onClick={() => setEditMode(false)} cursor={'pointer'} />
                </HStack> :
                <EditIcon onClick={() => setEditMode(true)} cursor={'pointer'} />}
        </Box>
    </Flex>
}