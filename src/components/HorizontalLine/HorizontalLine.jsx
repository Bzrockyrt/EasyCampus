import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Input, Select, Skeleton, Text } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase';
import { throwSuccess } from '../../utils/alerts';

export default function HorizontalLine({ userId, label, value, bgColor }) {
    const [currentValue, setCurrentValue] = useState(value)
    const [editMode, setEditMode] = useState(false)
    const [role, setRole] = useState(value)

    async function editField() {
        try {
            const ref = doc(db, 'users', userId)
            let toUpdate = {
                [label]: currentValue,
            }
            await updateDoc(ref, toUpdate)
            throwSuccess("Ce champ a bien été modifié")
            setEditMode(false)
        } catch (err) {
            console.log(err)
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
                    <Select width={'68%'} value={role} onChange={(e) => setRole(e.target.value)}>
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