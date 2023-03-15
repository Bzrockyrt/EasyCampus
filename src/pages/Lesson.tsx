import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Lesson() {
    const { lessonId } = useParams()
    return <Flex></Flex>
}