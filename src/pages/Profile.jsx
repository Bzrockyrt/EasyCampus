import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../style/App.css'
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { Button, HStack, Skeleton, Text } from '@chakra-ui/react';
import { auth, db } from '../firebase';
import { deleteUser, signOut } from 'firebase/auth';

export default function Profile() {
  const [userId, setUserId] = useOutletContext()
  const [userData, setUserData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  let docRef
  if (userId) {
    docRef = doc(db, "users", userId);
  }

  async function getUserData() {
    const user = await getDoc(docRef);
    if (user) {
      setUserData(user._document.data.value.mapValue.fields)
      setIsLoading(false)
    }
  }

  async function deleteAccount() {
    const user = auth.currentUser;
    deleteUser(user).then(async () => {
      await deleteDoc(docRef);
      signOut(auth).then(() => {
        setUserId(null)
        navigate('/')
      }).catch((error) => {
        console.log(error)
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    if (userId) {
      getUserData()
    }
  }, [userId])

  return (
    <div id="login">
      <Text>PROFILE</Text>
      <Skeleton isLoaded={!isLoading}><Text>Nom: {userData?.nom.stringValue}</Text></Skeleton>
      <Skeleton isLoaded={!isLoading}><Text>Prenom: {userData?.prenom.stringValue}</Text></Skeleton>
      <Skeleton isLoaded={!isLoading}><Text>Email: {userData?.email.stringValue}</Text></Skeleton>
      <Skeleton isLoaded={!isLoading}><Text>Téléphone: {userData?.phone.stringValue}</Text></Skeleton>

      <HStack marginTop={"15px"} gap={"15px"} justifyContent="center">
        <Button colorScheme={"blue"} onClick={() => navigate('/edit')}>Modifier mon compte</Button>
        <Button colorScheme={"red"} onClick={() => deleteAccount()}>Supprimer mon compte</Button>
      </HStack>
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