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

    return <Box>
        <Flex flexDirection={"column"} marginTop={"25px"}>
            <Flex flexDirection={"row"} justifyContent={'space-between'} alignItems={'center'}>
                <Text fontSize={'18px'} fontWeight={600}>{username}</Text>
                <div className='cardNotation' style={{}}>
                    <img src='star.png' className='cardStarNotation' />
                    {comment.notation}
                </div>
            </Flex>
            <Text fontSize={'14px'} fontWeight={500} marginTop={"10px"} textAlign={'left'}>{comment.comment}</Text>
            <Text fontSize={'11px'} fontStyle={'italic'} textAlign={'right'}>{comment.dateCreated}</Text>
        </Flex>
    </Box>
}