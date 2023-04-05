import { Card as CardChakra, CardHeader, CardBody, CardFooter, Heading, Stack, Button, Grid, GridItem } from '@chakra-ui/react'
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";

// <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>

function handleClick() {
    alert('Test du click sur une card');
}

export default function Card(props) {
    const { lessonData } = props;
    return (
        <div className='allCard'>
            <div className='cardContainer' onClick={handleClick}>
                <div>
                    <img src={lessonData.imgUrl} className='cardImage' />
                </div>
                <div className='cardWrapper'>
                    <div className='cardTitle'>
                        {lessonData.title}
                    </div>
                    <div className='cardNotation'>
                        <img src='star.png' className='cardStarNotation' />
                        {lessonData.notation}
                    </div>
                    <div className='cardUsername'>
                        {lessonData.userID}
                    </div>
                    <div className='cardDescription'>
                        {lessonData.description}
                    </div>
                    <div className='cardPrice'>
                        {lessonData.price}
                    </div>
                    <div className='cardButtonLike'>
                        <button>
                            {/*<lord-icon
                            src="https://cdn.lordicon.com/pnhskdva.json"
                            trigger="hover"
                            colors="primary:#c71f16"
                            style="width:250px;height:250px">
    </lord-icon>*/}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}