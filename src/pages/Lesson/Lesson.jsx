import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import {useLocation} from 'react-router-dom';

export default function Lesson() {  
  const [docData, setDocData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log('lessonID',location.state.id)
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'Lessons', location.state.id);
        const querySnapshot = await getDoc(docRef);
        const docData = querySnapshot.data();
        setDocData(docData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {docData && (
        <p>{docData.title}</p>
      )}
    </div>
  );
};