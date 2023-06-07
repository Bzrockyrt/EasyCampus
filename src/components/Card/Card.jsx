import { Card as CardChakra, Skeleton } from '@chakra-ui/react'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import destructureData from '../../utils/destructureData';

// <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>

function handleClick() {
    alert('Test du click sur une card');
}

export default function Card(props) {
    const { lessonData } = props;
    const [username, setUsername] = useState('')
    const [pathReference, setPathReference] = useState('')

    useEffect(() => {
        const getUsername = async () => {
            if (lessonData.userID) {
                const user = await getDoc(doc(db, "users", lessonData.userID));
                setUsername(`${user._document.data.value.mapValue.fields.prenom.stringValue} ${user._document.data.value.mapValue.fields.nom.stringValue}`)
            }
        }
        const getMatiereImage = async () => {
            if (lessonData.matiereId) {
                const matiere = await getDoc(doc(db, "Matieres", lessonData.matiereId));
                console.log(destructureData(matiere))
                const imgUrl = destructureData(matiere).imgUrl
                const storage = getStorage();
                getDownloadURL(ref(storage, imgUrl)).then((url) => {
                    setPathReference(url)
                }).catch(function (error) {
                    console.log('Error when fetching lessonImage', error)
                });
            }
        }
        getUsername()
        getMatiereImage()
    }, [])

    return (
        <div className='allCard'>
            <div className='cardContainer' onClick={handleClick}>
                <div>
                    <img src={pathReference} className='cardImage' />
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