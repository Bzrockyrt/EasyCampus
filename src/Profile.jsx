import {Outlet} from 'react-router-dom'
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

export default function Profile() {

  const auth = getAuth(firebaseapp);
  connectAuthEmulator(auth, "http://localhost:9090");

  // Login using email/password
  const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value
    const loginPassword = txtPassword.value

    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  }

  btnLogin.addEventListener("click", loginEmailPassword)

    return(
    <div id="login">
        <div class="header">
          <h1>Getting Started with Firebase Auth</h1>
        </div>
        <form>
          <div class="group">
            <input id="txtEmail" type="email"/>
            <label>Email</label>
          </div>
          <div class="group">
            <input id="txtPassword" type="password"/>
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