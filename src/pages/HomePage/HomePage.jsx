import { InputGroup, Stack } from '@chakra-ui/react';
import React, { Component, useState } from 'react'
import { Form } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Card from '../../components/Card/Card';

export default function HomePage(){
    const users = [
        {
            firstname : 'Yoann',
            latname : 'GOZEl',
            age : 20
        },
        {
            firstname : 'Maxime',
            latname : 'CHABEAUDIE',
            age : 20
        },
        {
            firstname : 'Hugo',
            latname : 'ROUECHE',
            age : 20
        },
        {
            firstname : 'Pierre-Louis',
            latname : 'IPPOLITI',
            age : 20
        },
    ]
    const cards = [
        {
            title : 'Economie',
            user : users[0],
            imageURL : 'Economy.jpg',
            notation : 4.7,
            description : `Description écrite par l'étudiant proposant le cours`
        }
        ,{
            title : 'Informatique',
            user : users[1],
            imageURL : 'IT.jpg',
            notation : 4.4,
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Management',
            user : users[2],
            imageURL : 'Management.jpg',
            notation : 4.2,
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Mathématiques',
            user : users[3],
            imageURL : 'Maths.jpg',
            notation : 4.3,
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Economie',
            user : users[0],
            imageURL : 'Economy.jpg',
            notation : 3.0,
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Informatique',
            user : users[1],
            imageURL : 'IT.jpg',
            notation : 4.5,
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Management',
            user : users[2],
            imageURL : 'Management.jpg',
            notation : 4.9,
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Mathématiques',
            user : users[3],
            imageURL : 'Maths.jpg',
            notation : 4.1,
            description : `Description écrite par l'étudiant proposant le cours`
        },
    ]

    return(
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
                            cards.map((card, i) => {
                                return <Card lessonData={card}/>
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