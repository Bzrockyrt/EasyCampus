import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../style/App.css'
import { doc, getDoc } from 'firebase/firestore';
import { Text } from '@chakra-ui/react';
import { db } from '../firebase';

export default function Profile() {
  const [userId,] = useOutletContext()
  const [userData, setUserData] = useState(undefined)

  async function getUserData() {
    const docRef = doc(db, "users", userId);
    const user = await getDoc(docRef);
    if (user) setUserData(user._document.data.value.mapValue.fields)
  }
  useEffect(() => {
    getUserData()
  }, [userId])
  console.log('userData', userData)
  return (
    <div id="login">
      <Text>PROFILE</Text>
      <Text>Email: {userData?.email.stringValue}</Text>
      <Text>Nom: {userData?.nom.stringValue}</Text>
      <Text>Prenom: {userData?.prenom.stringValue}</Text>
    </div>
  )
}



  // const [user, setUser] =useState(null)

  // const auth = getAuth(firebaseConfig);
  // connectAuthEmulator(auth, "http://localhost:5173");

  // // Login using email/password
  // const loginEmailPassword = async () => {
  //   const loginEmail = txtEmail.value
  //   const loginPassword = txtPassword.value

  //   const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  // }

  // btnLogin.addEventListener("click", loginEmailPassword)