"use client";
import React, { useState } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./Signup/SignUp";

const SignUpOrSignIn = () => {
  const [signUpOrSignIn, setSignUpOrSignIn] = useState("SignIn");
  return (
    <div>
      {signUpOrSignIn === "SignIn" ? (
        <SignIn setSignUpOrSignIn={setSignUpOrSignIn} />
      ) : (
        <SignUp setSignUpOrSignIn={setSignUpOrSignIn} />
      )}
    </div>
  );
};

export default SignUpOrSignIn;
