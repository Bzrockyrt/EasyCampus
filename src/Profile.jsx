import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

export default function Profile() {
  const user = useOutletContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function getUserDoc() {
    const ref = doc(db, 'users', user.uid)
    const userDoc = await getDoc(ref)
    if (userDoc) {
      setEmail(userDoc.data().email)
      setPassword(userDoc.data().password)
    }
  }

  useEffect(() => {
    getUserDoc()
  }, [])

  function handleSave() {
    const ref = doc(db, 'users', user.uid)
    setDoc(ref, { name: name })
  }

  if (!user) return <div>Please log in</div>

  return (
    <div id="login">
      <div class="header">
        <h1>Getting Started with Firebase Auth</h1>
      </div>
      <form>
        <div class="group">
          <input onchange={e => setEmail(e)} id="txtEmail" type="email" />
          <label>Email</label>
        </div>
        <div class="group">
          <input onchange={e => setPassword(e)} id="txtPassword" type="password" />
          <label>Password</label>
        </div>
        <div id="divLoginError" class="group">
          <div id="lblLoginErrorMessage" class="errorlabel">Error message</div>
        </div>
        <button id="btnLogin" type="button" class="button buttonBlue">Log in</button>
        <button id="btnSignup" type="button" class="button buttonBlue">Sign up</button>
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