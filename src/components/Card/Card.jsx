import { Card as CardChakra, Skeleton } from '@chakra-ui/react'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>

function handleClick() {
    alert('Test du click sur une card');
}

export default function Card(props) {
    const navigate = useNavigate();

    const { lessonData } = props;
    const [username, setUsername] = useState('')
    useEffect(() => {
        const getUsername = async () => {
            const user = await getDoc(doc(db, "users", lessonData.userID));
            setUsername(`${user._document.data.value.mapValue.fields.prenom.stringValue} ${user._document.data.value.mapValue.fields.nom.stringValue}`)
        }
        getUsername()
    }, [])
    console.log('lessonData', lessonData)
    console.log('lessonDataID', lessonData.id)
    return (
        <div className='allCard'>
            <div className='cardContainer' onClick={() => navigate('/lesson', { state : { id : lessonData.id, name : lessonData.id}})}>
                <div>
                    <img src={lessonData.imgUrl} className='cardImage' />
                </div>
                <div className='cardWrapper'>
                    <div className='cardTitle'>
                        {lessonData.title}
                    </div>
                    <div className='cardNotation'>
                        <img src='star.png' className='cardStarNotation' />
                        {lessonData.notation}
                    </div>
                    <Skeleton isLoaded={!!username}>
                        <div className='cardUsername'>
                            {username}
                        </div>
                    </Skeleton>
                    <div className='cardDescription'>
                        {lessonData.description}
                    </div>
                    <div className='cardPrice'>
                        {lessonData.price}€
                    </div>
                    <div className='cardButtonLike'>
                        <button>
                            <lord-icon
                                src="https://cdn.lordicon.com/pnhskdva.json"
                                trigger="hover"
                                colors="primary:#c71f16">
                            </lord-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}