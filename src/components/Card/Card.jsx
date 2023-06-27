import { Card as CardChakra, IconButton, Skeleton } from '@chakra-ui/react'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import destructureData from '../../utils/destructureData';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { throwError, throwSuccess } from '../../utils/alerts';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

export default function Card(props) {
    const navigate = useNavigate();
    const [userId, ,] = useOutletContext()
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

    const handleFavorise = async (e) => {
        e.stopPropagation()
        if (!userId) return throwError("Vous devez être connecté pour ajouter une leçon à vos favoris")
        console.log('lessonData?.favorisedBy', lessonData?.favorisedBy)
        let favorisedBy = lessonData?.favorisedBy ? lessonData?.favorisedBy : []
        if (lessonData?.favorisedBy?.includes(userId)) {
            favorisedBy.splice(favorisedBy.indexOf(userId), 1)
        } else {
            favorisedBy.push(userId)
        }
        console.log('favorisedBy', favorisedBy)
        try {
            const ref = doc(db, 'Lessons', lessonData.id)
            let toUpdate = {
                favorisedBy: favorisedBy,
            }
            console.log('updating')
            await updateDoc(ref, toUpdate)
            props.refetch()
        } catch (e) {
            console.log("Error favorise", e)
            throwError("Une erreur est survenue lors de l'ajout de la lesson au favori")
        }
    }

    async function updateLesson(favorisedBy) {

    }

    return (
        <div className='allCard'>
            <div className='cardContainer' onClick={() => navigate('/lesson', { state: { id: lessonData.id, name: lessonData.id } })}>
                <div style={{ height: '200px' }}>
                    <Skeleton isLoaded={!isLoading}><img src={pathReference} className='cardImage' /></Skeleton>
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
                    <div className='cardPrice'>
                        {lessonData.price}€
                    </div>
                    <div className='cardButtonLike'>
                        <IconButton
                            variant={'ghost'}
                            icon={lessonData?.favorisedBy?.includes(userId) ? <AiFillHeart size={23} /> : <AiOutlineHeart size={23} />}
                            onClick={(e) => handleFavorise(e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}