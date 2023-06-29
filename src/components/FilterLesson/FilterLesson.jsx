import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import destructureDatas from '../../utils/destructureDatas';


export default function FilterLesson(props) {

    const [tabLessonsData, setTabLessonsData] = useState([]);
    const [rangeSliderMinValue, setRangeSliderMinValue] = useState();
    const [rangeSliderMaxValue, setRangeSliderMaxValue] = useState();

    useEffect(() => {
        const getLessonPriceRangeData = async () => {
            const querySnapshot = await getDocs(collection(db, "Lessons"));
            if (querySnapshot) {
                const lessons = destructureDatas(querySnapshot)
                setTabLessonsData(lessons)
            }
        }
        getLessonPriceRangeData();
    }, []);

    function onFilterLessonChanged(event) {
        props.filterValueSelected(event.target.value);
    }

    function rangeSliderValueChanged(min) {
        console.log(min);
        console.log(max);
        setRangeSliderMinValue(min);
        setRangeSliderMaxValue(max);
    }

    return (
        <div className="filterLesson-container">
            <select name='filterLesson-Lessontype' onChange={onFilterLessonChanged}>
                <option defaultValue disabled>Type de cours</option>
                <option value={'all'}>Tous</option>
                {
                    props.tabMatieresData && props.tabMatieresData.map((matiere, i) => <option key={matiere.id} value={matiere.id}>{matiere.nom}</option>)
                }
            </select>
            <input type={'range'} multiple></input>
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