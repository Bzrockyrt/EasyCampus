import { Card as CardChakra, IconButton, Skeleton } from '@chakra-ui/react'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import destructureData from '../../utils/destructureData';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { throwError } from '../../utils/alerts';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import destructureDatas from '../../utils/destructureDatas';

export default function Card({ lessonData, refetch }) {
    const navigate = useNavigate();
    const [userId, ,] = useOutletContext()
    const [username, setUsername] = useState('')
    const [pathReference, setPathReference] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [notation, setNotation] = useState(0)

    const getUsername = async () => {
        if (lessonData.userId) {
            const querySnapshot = await getDoc(doc(db, "users", lessonData.userId));
            const user = destructureData(querySnapshot)
            if (user) {
                setUsername(`${user.prenom} ${user.nom}`)
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
    const getNotation = async () => {
        const querySnapshot = await getDocs(await query(collection(db, "Comments"), where('lessonId', '==', lessonData.id)));
        const comments = destructureDatas(querySnapshot)
        if (comments.length > 0) {
            let total = 0
            comments.forEach((comment) => total += Number(comment.notation))
            setNotation(Math.round(total / comments.length * 10) / 10)
        } else { setNotation('~') }
    }

    useEffect(() => {
        getUsername()
        getMatiereImage()
        getNotation()
    }, [lessonData])

    const handleFavorise = async (e) => {
        e.stopPropagation()
        if (!userId) return throwError("Vous devez être connecté pour ajouter une leçon à vos favoris")
        let favorisedBy = lessonData?.favorisedBy ? lessonData?.favorisedBy : []
        if (lessonData?.favorisedBy?.includes(userId)) {
            favorisedBy.splice(favorisedBy.indexOf(userId), 1)
        } else {
            favorisedBy.push(userId)
        }
        try {
            const ref = doc(db, 'Lessons', lessonData.id)
            let toUpdate = {
                favorisedBy: favorisedBy,
            }
            await updateDoc(ref, toUpdate)
            refetch()
        } catch (e) {
            console.log("Error favorise", e)
            throwError("Une erreur est survenue lors de l'ajout de la leçon au favori")
        }
    }

    function goToLesson(lessonId)  {
        if (userId){
            navigate('/lesson', { state: { id: lessonId, name: lessonId } })
        } else {
            throwError('Vous devez vous connecter pour accéder à une leçon')
        }
    }

    return (
        <Skeleton isLoaded={!isLoading}>
            <div className='allCard'>
                <div className='cardContainer' onClick={() => goToLesson(lessonData.id)}>
                    <div style={{ height: '200px' }}><img src={pathReference} className='cardImage' />
                    </div>
                    <div className='cardWrapper'>
                        <div className='cardTitle'>
                            {lessonData.title}
                        </div>
                        {notation && <div className='cardNotation'>
                            <img src='star.png' className='cardStarNotation' />
                            {notation}
                        </div>}
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
        </Skeleton>
    );
}