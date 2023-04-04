import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../style/App.css'
import { doc, getDoc } from 'firebase/firestore';
import { Button, Text } from '@chakra-ui/react';
import { db } from '../firebase';

export default function Profile() {
  const [userId,] = useOutletContext()
  const [userData, setUserData] = useState(undefined)
  const navigate = useNavigate();
  let docRef
  if (userId) {
    docRef = doc(db, "users", userId);
  }

  async function getUserData() {
    const docRef = doc(db, "users", userId);
    const user = await getDoc(docRef);
    if (user) setUserData(user._document.data.value.mapValue.fields)
  }

  function goToEditProfile() {
    navigate('/edit')
  }

  useEffect(() => {
    if (userId) {
      getUserData()
    }
  }, [userId])

  return (
    <div id="login">
      <Text>PROFILE</Text>
      <Text>Nom: {userData?.nom.stringValue}</Text>
      <Text>Prenom: {userData?.prenom.stringValue}</Text>
      <Text>Email: {userData?.email.stringValue}</Text>
      <Text>Téléphone: {userData?.phone.stringValue}</Text>

      <form onSubmit={goToEditProfile}>
        <Button type="submit">Modifier mon profil</Button>
      </form>
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