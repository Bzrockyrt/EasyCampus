import { Flex, InputGroup, Skeleton, Stack } from '@chakra-ui/react';
import React, { useEffect, useState, Component } from 'react'
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Card from '../../components/Card/Card';
import FilterLesson from '../../components/FilterLesson/FilterLesson';
import FilterItem from '../../components/FilterItem/FilterItem'
import FilterButton from '../../components/FilterButton/FilterButton'

export default function HomePage() {

    const [tabLessonsData, setTabLessonsData] = useState([]);
    const [tabMatieresData, setTabMatieresData] = useState([]);
    const [filterTextValue, setfilterTextValue] = useState('all');

    useEffect(() => {
        const getLessonData = async () => {
            const querySnapshot = await getDocs(collection(db, "Lessons"));
            const lessons = []
            if (querySnapshot) {
                querySnapshot.docs.forEach(async (lessonDoc, index) => {
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
        const getMatiereData = async () => {
            const querySnapshot = await getDocs(collection(db, "Matieres"));
            const matieres = []
            if (querySnapshot) {
                querySnapshot.docs.forEach(async (matiereDoc, index) => {
                    let matiere = {}
                    let object = matiereDoc._document.data.value.mapValue.fields
                    let keys = Object.keys(object)
                    keys.forEach((key) => matiere[key] = object[key].stringValue)
                    matiere.id = matiereDoc.id
                    matieres.push(matiere)
                });
            } 
            setTabMatieresData(matieres)
        }
        getLessonData();
        getMatiereData();
    }, []);

    let filteredLessonList = tabLessonsData.filter((lesson) => {
        if(filterTextValue === 'physic'){
            return lesson.matiereId === (tabMatieresData.id === "Physique");
        }
        else if(filterTextValue === 'french'){
            return lesson.matiereId.nom === "Français";
        }
        else{
            return lesson;
        }
    });

    function onFilterValueSelected(filterValue){
        console.log(filterValue);
        setfilterTextValue(filterValue);
    }

    return (
        <div>
            <Skeleton isLoaded={!!tabLessonsData}>
                <div>
                    <FilterLesson filterValueSelected={onFilterValueSelected}></FilterLesson>
                    <Flex marginTop={'25px'}>
                        <div className="cards">
                            {
                                filteredLessonList && filteredLessonList.map((card, i) => {
                                    return <Card key={i} lessonData={card} />
                                })
                            }
                        </div>
                    </Flex>
                </div>
            </Skeleton>
        </div>
    );
}