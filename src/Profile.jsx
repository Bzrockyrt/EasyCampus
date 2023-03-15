import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

export default function Profile() {
  const user = useOutletContext()
  console.log('user', user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // async function getUserDoc() {
  //   const ref = doc(db, 'users', user.uid)
  //   const userDoc = await getDoc(ref)
  //   if (userDoc) {
  //     setEmail(userDoc.data().email)
  //     setPassword(userDoc.data().password)
  //   }
  // }

  // useEffect(() => {
  //   getUserDoc()
  // }, [])
  const db = getFirestore()
  console.log('db', db)
  function handleSave() {
    const ref = doc(db, 'users', user.uid)
    setDoc(ref, { email, password })
  }
  function getDocs() {
    const ref = doc(db, 'users', user.uid)
    setDoc(ref, { email, password })
  }
  // if (!user) return <div>Please log in</div>

  return (
    <div id="login">
      <div className="header">
        <h1>Getting Started with Firebase Auth</h1>
      </div>
      <form onSubmit={handleSave}>
        <div className="group">
          <input onChange={e => setEmail(e)} id="txtEmail" type="email" />
          <label>Email</label>
        </div>
        <div className="group">
          <input onChange={e => setPassword(e)} id="txtPassword" type="password" />
          <label>Password</label>
        </div>
        <button id="btnSignup" type="button" className="button buttonBlue">Save</button>
      </form>
      <button onClick={getDocs} id="btnSignup" type="button" className="button buttonBlue">get</button>
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