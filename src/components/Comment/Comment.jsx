import { Box, Flex, Text } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';

export default function Comment({ comment }) {
    const [username, setUsername] = useState('')

    const getUsername = async () => {
        if (comment.userId) {
            const user = await getDoc(doc(db, "users", comment.userId));
            if (user._document) {
                setUsername(`${user._document.data.value.mapValue.fields.prenom.stringValue} ${user._document.data.value.mapValue.fields.nom.stringValue}`)
            }
        }
    }

    useEffect(() => {
        getUsername()
    }, [comment])

    console.log(comment)
    return <Box>
        <Flex flexDirection={"column"}>
            <Flex flexDirection={"row"} justifyContent={'space-between'}>
                <Text fontSize={'18px'} fontWeight={600}>{username}</Text>
                <div className='cardNotation'>
                    <img src='star.png' className='cardStarNotation' />
                    {comment.notation}
                </div>
            </Flex>
            <Text fontSize={'14px'} fontWeight={500}>{comment.comment}</Text>
            <Text fontSize={'11px'} fontStyle={'italic'} textAlign={'right'}>{comment.creationdate}</Text>
        </Flex>
    </Box>
}