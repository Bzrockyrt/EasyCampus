import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, useRangeSlider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";



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
            <div class="icon">
                <i id="left" class="fa-solid fa-angle-left"></i>
            </div>
            <ul class="tabs-box">
                <li class="tab">Coding</li>
                <li class="tab active">JavaScript</li>
                <li class="tab">Podcasts</li>
                <li class="tab">Databases</li>
                <li class="tab">Web Development</li>
                <li class="tab">Unboxing</li>
                <li class="tab">History</li>
                <li class="tab">Programming</li>
                <li class="tab">Gadgets</li>
                <li class="tab">Algorithms</li>
                <li class="tab">Comedy</li>
                <li class="tab">Gaming</li>
                <li class="tab">Share Market</li>
                <li class="tab">Smartphones</li>
                <li class="tab">Data Structure</li>
            </ul>
            <div class="icon">
                <i id="right" class="fa-solid fa-angle-right"></i>
            </div>
            {/* <select name='filterLesson-Lessontype' onChange={onFilterLessonChanged}>
                <option defaultValue disabled>Type de cours</option>
                <option value={'all'}>Tous</option>
                    {
                        props.tabMatieresData && props.tabMatieresData.map((matiere, i) => {
                            return <option value={matiere.id}>{matiere.nom}</option>
                        })
                    }
            </select>
            <p>Notes :</p>
            <RangeSlider min={0} max={5} step={0.1} onChange={(e) => rangeSliderValueChanged(e.target.value.min)}>
                <RangeSliderTrack >
                    <RangeSliderFilledTrack/>
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0} />
                <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider>
            <p>{rangeSliderMinValue}</p>
            <p>/</p>
            <p>{rangeSliderMaxValue}</p> */}
        </div>
    );
}