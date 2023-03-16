import { Flex } from '@chakra-ui/react'
import React from 'react';
import './style/DeleteAccount.css'

export default function DeleteAccount(){
    return(
        <div className='delete-account-container'>
            <form className='delete-account-form'>
                <Flex flexDirection='column' justifyContent={'center'}>
                    <h1 className='delete-account-title'>Delete Account</h1>
                </Flex>
            </form>
        </div>
    );
}