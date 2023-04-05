import { InputGroup, Stack } from '@chakra-ui/react';
import React, { useEffect, useState, Component } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Card from '../../components/Card/Card';

export default function HomePage() {

    const [tabLessonsData, setTabLessonsData] = useState([]);

    async function getLessonData() {
        const querySnapshot = await getDocs(collection(db, "Lessons"));
        console.log(querySnapshot)
        const data = []
        querySnapshot.forEach(async (lessonDoc) => {
            let object = lessonDoc._document.data.value.mapValue.fields
            let keys = Object.keys(object)
            let lesson = {}
            keys.forEach((key) => lesson[key] = object[key].stringValue)
            if (object.userID.stringValue) {
                const user = await getDoc(doc(db, "users", object.userID.stringValue));
                const username = user._document.data.value.mapValue.fields.prenom.stringValue
                lesson.userID = username
            }
            data.push(lesson)
        });
        setTabLessonsData(data)
    }

    useEffect(() => {
        getLessonData()
    }, []);
    console.log(tabLessonsData)
    return (
        <div className='container'>
            <div>
                <div>
                    <h6>Mettre dans ce div le filtrage des cards dans le HomePage</h6>
                </div>
            </div>
            <div>
                <div>
                    <h1>Responsive Cards</h1>
                    <div className="cards">
                        {
                            tabLessonsData.map((card, i) => {
                                return <Card key={i} lessonData={card} />
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}