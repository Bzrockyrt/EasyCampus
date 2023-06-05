import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import './admin.css';

export default function AdminHomePage() {

    const navigate = useNavigate();
    const [userId] = useOutletContext();
    const [MatiereData, setMatiereData] = useState([]);

    useEffect(() => {
        const getLessonData = async () => {
            const MatiereData = await getDocs(collection(db, "Matiere"));
            const lessons = []
            if (querySnapshot) {
                querySnapshot._snapshot.docChanges.forEach(async (lessonDoc, index) => {
                    let lesson = {}
                    let object = lessonDoc.doc.data.value.mapValue.fields
                    let keys = Object.keys(object)
                    keys.forEach((key) => lesson[key] = object[key].stringValue)
                    lessons.push(lesson)
                });
            }
            setMatiereData(lessons)
        }
        getLessonData()
    }, [])
    console.log('MatiereData', MatiereData)

    return (
        <div className='test2'>
            <div className='test'>
                <tr>
                    <button>test</button>
                </tr>
            </div>
            <div className='test1'>
                <h1>Admin panel</h1>
            </div>
        </div>
    )
};

