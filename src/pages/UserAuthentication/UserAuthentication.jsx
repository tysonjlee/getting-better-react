import { useState } from "react"
import LoginForm from "@/components/auth/LoginForm"
import SignupForm from "@/components/auth/SignupForm"
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"

function UserAuthentication() {
  const [showLogin, setShowLogin] = useState(true)
  const [showSignup, setShowSignup] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const authProps = {
    showLogin, 
    setShowLogin, 
    showSignup, 
    setShowSignup, 
    showForgotPassword, 
    setShowForgotPassword
  }

  function handleShowComponent() {
    if (showLogin) return <LoginForm {...authProps} />
    else if (showSignup) return <SignupForm {...authProps} />
    else if (showForgotPassword) return <ForgotPasswordForm {...authProps} />
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      {handleShowComponent()}
    </div>
  )
}

export default UserAuthentication