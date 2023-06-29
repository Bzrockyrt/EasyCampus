import { Flex, InputGroup, Skeleton, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState, Component } from 'react'
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Card from '../../components/Card/Card';
import FilterLesson from '../../components/FilterLesson/FilterLesson';
import FilterItem from '../../components/FilterItem/FilterItem'
import FilterButton from '../../components/FilterButton/FilterButton'
import { useOutletContext } from 'react-router-dom';
import destructureDatas from '../../utils/destructureDatas';

export default function HomePage() {
    const [userId, ,] = useOutletContext()
    const [tabLessonsData, setTabLessonsData] = useState([]);
    const [tabMatieresData, setTabMatieresData] = useState([]);
    const [filterTextValue, setfilterTextValue] = useState('all');
    const [filteredLessons, setFilteredLessons] = useState([]);
    const [favorisedLessonList, setFavorisedLessonList] = useState([])

    const getLessonData = async () => {
        const querySnapshot = await getDocs(collection(db, "Lessons"));
        if (querySnapshot) {
            const lessons = destructureDatas(querySnapshot, 'creationDate')
            setTabLessonsData(lessons)
        }
    }

    const getMatiereData = async () => {
        const querySnapshot = await getDocs(collection(db, "Matieres"));
        if (querySnapshot) {
            const matieres = destructureDatas(querySnapshot, 'title')
            setTabMatieresData(matieres)
        }
    }

    useEffect(() => {
        getLessonData();
        getMatiereData();
    }, []);

    useEffect(() => {
        setFilteredLessons(tabLessonsData.filter((lesson) => {
            if (filterTextValue === 'all')
                return true;
            else {
                return lesson.matiereId === filterTextValue;
            }
        }));
    }, [tabLessonsData, filterTextValue]);

    useEffect(() => {
        setFavorisedLessonList(filteredLessons.filter((lesson) => {
            return lesson.favorisedBy?.includes(userId)
        }))
    }, [tabLessonsData, filteredLessons, userId])

    function onFilterValueSelected(filterValue) {
        setfilterTextValue(filterValue);
    }

    return (
        <div style={{ margin: '0 25px' }}>
            <div>
                <FilterLesson filterValueSelected={onFilterValueSelected} tabMatieresData={tabMatieresData}></FilterLesson>
                {userId && <>
                    <div className="cards">
                        <Text fontSize={"lg"} textAlign={'left'} fontWeight={600}>Cours favoris</Text>
                    </div>
                    {favorisedLessonList?.length > 0 ?
                        <Flex margin={'15px 0 30px'}>
                            <div className="cards">
                                {
                                    favorisedLessonList && favorisedLessonList.map((card, i) => {
                                        return <Card key={i} lessonData={card} refetch={getLessonData} />
                                    })
                                }
                            </div>
                        </Flex>
                        :
                        <div className="cards">
                            <Text fontSize={'12px'} fontStyle={'italic'} textAlign={'left'} margin={'15px 0 30px'}>Vous n'avez aucun cours en favori 🙁</Text>
                        </div>}
                </>}
                <div className="cards">
                    <Text fontSize={"lg"} textAlign={'left'} fontWeight={600}>Cours disponibles</Text>
                </div>
                <Flex margin={'15px 0 30px'}>
                    <div className="cards">
                        {
                            filteredLessons && filteredLessons.map((card, i) => {
                                return <Card key={i} lessonData={card} refetch={getLessonData} />
                            })
                        }
                    </div>
                </Flex>
            </div>
        </div>
    );
}