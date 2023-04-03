import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './style/SignIn.css'
import { Flex } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'


export default function SheerId() {

    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const [isError, setIsError] = useState(false);
    const [isSucces, setIsSucces] = useState(false);




    return (

        <div className="sheerid-container">
        <form onSubmit={SheerId} className="form-login">
            <Flex flexDirection="column" justifyContent={'center'}>
            <h1 className="text-login">Vérification SheerId</h1>
                    <Flex flexDirection="column" justifyContent={'center'}>
                    <input className="champs-login"
                            type="nom"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        ></input>
                    <input className="champs-login"
                            type="prenom"
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                        ></input>
                    <input className="champs-login"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input><br/>
                        <h2>Date de naissance</h2>
                    <Input 
                            placeholder="Select Date and Time"
                            size="md"
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            required
                            />
                        
                    </Flex>
                    <button type="submit" className="btn-sumbit-login">Vérification</button>

                </Flex>
        </form>
        </div>
        )
}
