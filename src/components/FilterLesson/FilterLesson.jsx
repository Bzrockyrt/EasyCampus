import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, useRangeSlider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Slider from '@mui/material/Slider';


export default function FilterLesson(props){

    const [tabLessonsData, setTabLessonsData] = useState([]);
    const [rangeSliderMinValue, setRangeSliderMinValue] = useState();
    const [rangeSliderMaxValue, setRangeSliderMaxValue] = useState();

    useEffect(() => {
        const getLessonPriceRangeData = async () => {
            const querySnapshot = await getDoc(collection(db, "Lessons"));
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
        getLessonPriceRangeData();
    }, []);

    function onFilterLessonChanged(event){
        props.filterValueSelected(event.target.value);
    }

    function rangeSliderValueChanged(min){
        console.log(min);
        console.log(max);
        setRangeSliderMinValue(min);
        setRangeSliderMaxValue(max);
    }

    return (
        <div className="filterLesson-container">
            <select onChange={onFilterLessonChanged}>
                <option defaultValue disabled>Type de cours</option>
                <option value={'all'}>Tous</option>
                    {
                        props.tabMatieresData && props.tabMatieresData.map((matiere, i) => {
                            return <option value={matiere.id}>{matiere.nom}</option>
                        })
                    }
            </select>
            {/* <p>Notation :</p> */}
            {/* <RangeSlider min={0} max={5} step={0.1} onChange={(e) => rangeSliderValueChanged(e.target.value.min)}>
                <RangeSliderTrack >
                    <RangeSliderFilledTrack/>
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0} />
                <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider> */}
            {/* <p>{rangeSliderMinValue}</p>
            <p>/</p>
            <p>{rangeSliderMaxValue}</p> */}
        </div>
    );
}