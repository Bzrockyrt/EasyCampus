import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Skeleton, Td, Text, Tooltip, Tr } from '@chakra-ui/react';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase';
import { throwError, throwSuccess } from '../../utils/alerts';

export default function CommentTableLine({ comment, refetch }) {
    const [, , isAdmin] = useOutletContext()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    async function getUser(id) {
        if (id) {
            let docRef = doc(db, "users", id);
            const querySnapshot = await getDoc(docRef);
            if (querySnapshot) {
                let user = {}
                let object = querySnapshot._document.data.value.mapValue.fields
                let keys = Object.keys(object)
                keys.forEach((key) => user[key] = object[key].stringValue)
                user.id = querySnapshot.id
                setUser(user)
                setIsLoading(false)
            }
        }
    }

    async function deleteComment(commentId) {
        try {
            await deleteDoc(doc(db, "Comments", commentId))
            throwSuccess('Le commentaire a été supprimé')
            refetch()
        } catch {
            throwError('Une erreur est survenue lors de la suppression du commentaire')
        }
    }

    useEffect(() => {
        getUser(comment.userId)
    }, [comment])

    return <Tr key={comment.id}>
        <Td><Skeleton isLoaded={!isLoading}>{user?.nom}</Skeleton></Td>
        <Td><Skeleton isLoaded={!isLoading}>{user?.prenom}</Skeleton></Td>
        <Td>
            <div className='cardNotation' style={{ margin: 0 }}>
                <img src='star.png' className='cardStarNotation' />
                {comment.notation}
            </div>
        </Td>
        <Td whiteSpace={'pre-wrap'}><Text maxWidth={'600px'}>{comment.comment}</Text></Td>
        <Td>{comment.dateCreated}</Td>
        {isAdmin && <Td>
            <Tooltip label={'Supprimer cette leçon'}>
                <IconButton aria-label='delete-lesson' height={'30px'} icon={<DeleteIcon />} onClick={() => deleteComment(comment.id)} />
            </Tooltip>
        </Td>}
    </Tr>
}