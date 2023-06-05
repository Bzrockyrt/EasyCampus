import { Flex } from '@chakra-ui/react';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import './admin.css';

export default function AdminHomePage() {

  const navigate = useNavigate();
  const [userId] = useOutletContext();

  return (
    <div className='test2'>
      <div className='test'>
        <tr>
          <button>test</button>
        </tr>
      </div>
      <div className='test1'>
        <h1>Admin panel</h1>
      </div>
    </div>
  )
};

