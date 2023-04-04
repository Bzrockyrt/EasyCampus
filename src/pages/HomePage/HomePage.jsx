import { InputGroup, Stack } from '@chakra-ui/react';
import React, { Component, useState } from 'react'
import { Form } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, IconButton, Grid, GridItem } from '@chakra-ui/react'
import Carousel from 'react-bootstrap/Carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './style/HomePage.css'

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
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Informatique',
            user : users[1],
            imageURL : 'IT.jpg',
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Management',
            user : users[2],
            imageURL : 'Management.jpg',
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Mathématiques',
            user : users[3],
            imageURL : 'Maths.jpg',
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Economie',
            user : users[0],
            imageURL : 'Economy.jpg',
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Informatique',
            user : users[1],
            imageURL : 'IT.jpg',
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Management',
            user : users[2],
            imageURL : 'Management.jpg',
            description : `Description écrite par l'étudiant proposant le cours`
        },{
            title : 'Mathématiques',
            user : users[3],
            imageURL : 'Maths.jpg',
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
                                // return <div key={i} className="card">
                                //     <img src={card.imageURL} className='cardImage'/>
                                //     <h1 className='cardTitle'>
                                //         { card.title }
                                //     </h1>
                                //     <h3 className='cardUsername'>
                                //         { card.user.firstname }
                                //     </h3>
                                //     <p className='cardDescription'>
                                //         { card.description }
                                //     </p>
                                //     <button className='buttonCard'>
                                //         Explore
                                //     </button>
                                // </div>
                                return <Card maxW={300}>
                                    <CardBody>
                                        <Carousel>
                                            <Carousel.Item>
                                                <img src={ card.imageURL } className='d-block w-100' alt='Image of the course'/>
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <p>Mettre ici différentes informations concernant le cours</p>
                                            </Carousel.Item>
                                        </Carousel>
                                        { card.description }
                                        {/* <Stack>
                                            <button>
                                                <img src='Heart.gif' width={50}/>
                                            </button>
                                        </Stack> */}
                                    </CardBody>
                                </Card>
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