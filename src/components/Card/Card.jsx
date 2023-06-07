import { Card as CardChakra, Skeleton } from '@chakra-ui/react'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import destructureData from '../../utils/destructureData';
import { useNavigate } from 'react-router-dom';

// <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>

function handleClick() {
    alert('Test du click sur une card');
}

export default function Card(props) {
    const navigate = useNavigate();

    const { lessonData } = props;
    const [username, setUsername] = useState('')
    const [pathReference, setPathReference] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getUsername = async () => {
            if (lessonData.userID) {
                const user = await getDoc(doc(db, "users", lessonData.userID));
                if (user._document) {
                    setUsername(`${user._document.data.value.mapValue.fields.prenom.stringValue} ${user._document.data.value.mapValue.fields.nom.stringValue}`)
                }
            }
        }
        const getMatiereImage = async () => {
            if (lessonData.matiereId) {
                const querySnapshot = await getDoc(doc(db, "Matieres", lessonData.matiereId));
                if (querySnapshot) {
                    const matiere = destructureData(querySnapshot)
                    const imgUrl = matiere?.imgUrl
                    const storage = getStorage();
                    if (imgUrl) {
                        getDownloadURL(ref(storage, imgUrl)).then((url) => {
                            console.log(url)
                            setPathReference(url)
                            setIsLoading(false)
                        }).catch(function (error) {
                            console.log('Error when fetching lessonImage', error)
                        });
                    }
                }
            }
        }
        getUsername()
        getMatiereImage()
    }, [])

    return (
        <div className='allCard'>
            <div className='cardContainer' onClick={() => navigate('/lesson', { state: { id: lessonData.id, name: lessonData.id } })}>
                <div style={{ height: '200px' }}>
                    <Skeleton isLoaded={isLoading}><img src={pathReference} className='cardImage' /></Skeleton>
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