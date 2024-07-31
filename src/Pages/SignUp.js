import React from 'react'
import SignInSignUp from '../Components/SignInSignUp';
import Header from "./../Components/Header";

export default function SignUp() {
  return (
    <div>
        <Header/>
        <div className="wrapper">
            <SignInSignUp/>
        </div>
    </div>
  )
}
