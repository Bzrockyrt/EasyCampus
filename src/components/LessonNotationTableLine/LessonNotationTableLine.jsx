import { Td } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';
import destructureDatas from '../../utils/destructureDatas';

export default function LessonNotationTableLine({ lessonId }) {
    const [notation, setNotation] = useState(0)

    const getNotation = async () => {
        const querySnapshot = await getDocs(await query(collection(db, "Comments"), where('lessonId', '==', lessonId)));
        const comments = destructureDatas(querySnapshot)
        if (comments.length > 0) {
            let total = 0
            comments.forEach((comment) => total += Number(comment.notation))
            setNotation(Math.round(total / comments.length * 10) / 10)
        } else { setNotation('~') }
    }

    useEffect(() => {
        getNotation()
    }, [lessonId])

    return <Td>
        {notation && <div className='cardNotation' style={{ margin: 0 }}>
            <img src='star.png' className='cardStarNotation' />
            {notation}
        </div>}
    </Td>
}