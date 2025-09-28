import supabase from "@/lib/supabaseClient"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

function SignupForm({ setShowLogin, setShowSignup }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [message, setMessage] = useState('')
  
  const handleSignup = async () => {
    console.log("email: " + email)
    console.log("password: " + password)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else {
      setEmail("")
      setPassword("")
      setMessage("Please check your email for verification.")
    }
  }

  function handleLogin() {
    setShowSignup(false)
    setShowLogin(true)
  }

  const isPasswordValid = () => {
    /** Password must have at least: 
     * 8 characters
     * 1 uppercase letter 
     * 1 lowercase letter 
     * 1 number
     * 1 special symbol (!@#$%^&*()_+-=[]{};'\:"|<>?,./`~)
     */ 
    
    // Check for 8 characters 
    


    // Check for 1 uppercase letter 


    // Check for 1 lowercase letter 


    // Check for 1 number 


    // Check for 1 special symbol 


    // Return true if passed all checks 
    return true
  }



  return (
    <div className="flex flex-col justify-center gap-6 max-w-[40%] max-h-[60%] w-full h-full">
      <Card className="overflow-hidden p-0 bg-neutral-900 border-stone-800">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-foreground">Signup</h1>
                <p className="text-muted-foreground text-balance ">
                  Enter credentials to create an account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-neutral-600 bg-neutral-800 focus-visible:ring-transparent focus-visible:border-neutral-400 text-foreground"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-neutral-600 bg-neutral-800 focus-visible:ring-transparent focus-visible:border-neutral-400 text-foreground"
                  required 
                />
              </div>
              <Button type="submit" className="w-full bg-foreground text-neutral-900 hover:bg-neutral-400 hover:text-neutral-950" onClick={handleSignup}>
                Signup
              </Button>
              <div className="text-center text-sm text-foreground">
                Already have an account?{" "}
                <a onClick={handleLogin} className="underline underline-offset-4 hover:cursor-pointer">
                  Login
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/public/login-wallpaper.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-foreground"
            />
          </div>
          {message && <p>{message}</p>}
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By signing up, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

export default SignupForm

