import { InputGroup, Skeleton, Stack } from '@chakra-ui/react';
import React, { useEffect, useState, Component } from 'react'
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Card from '../../components/Card/Card';
import FilterItem from '../../components/FilterItem/FilterItem'
import FilterButton from '../../components/FilterButton/FilterButton'

export default function HomePage() {

    const [tabLessonsData, setTabLessonsData] = useState([]);

    useEffect(() => {
        const getLessonData = async () => {
            const querySnapshot = await getDocs(collection(db, "Lessons"));
            const lessons = []
            console.log(querySnapshot)
            if (querySnapshot) {
                querySnapshot.docs.forEach(async (lessonDoc, index) => {
                    console.log(lessonDoc)
                    let lesson = {}
                    let object = lessonDoc._document.data.value.mapValue.fields
                    let keys = Object.keys(object)
                    keys.forEach((key) => lesson[key] = object[key].stringValue)
                    lesson.id = lessonDoc.id
                    lessons.push(lesson)
                });
            }
            setTabLessonsData(lessons)
        }
        getLessonData()
    }, []);

    return (
        <div>
            <Skeleton isLoaded={!!tabLessonsData}>
                <div>
                    <div>
                        <h1>Responsive Cards</h1>
                        <div className="cards">
                            {
                                tabLessonsData && tabLessonsData.map((card, i) => {
                                    return <Card key={i} lessonData={card} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </Skeleton>
        </div>
    );
}