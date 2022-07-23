import React from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const LoginSignup = () => {


    return (
        <main className="content">


    {/* <!-- Container div --> */}
    <div className="row container ">

      <SignupForm />

      <LoginForm />
      
    </div>
  </main>
    )
};

export default LoginSignup;