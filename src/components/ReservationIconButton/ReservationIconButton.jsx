import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../firebase';
import destructureDatas from '../../utils/destructureDatas';

export default function ReservationIconButton({ lesson }) {
    const [reservationCount, setReservationCount] = useState(0)

    async function getReservationCount(lessonId) {
        const querySnapshot = await getDocs(query(collection(db, "Reservations"), where("lessonId", "==", lessonId)));
        const count = destructureDatas(querySnapshot).length
        setReservationCount(count)
    }

    useEffect(() => {
        getReservationCount(lesson.id)
    }, [lesson])

    return <>
        <InfoOutlineIcon />
        {reservationCount > 0 && <Box as={'span'} color={'white'} position={'absolute'} top={'0px'} right={'4px'} fontSize={'0.8rem'}
            bgColor={'red'} borderRadius={'5px'} minWidth={'18px'} zIndex={9999} p={'1px'}>
            {reservationCount}
        </Box>}
    </>
}