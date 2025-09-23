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
import supabase from "@/lib/supabaseClient"
import { useState } from "react"

function LoginForm({setShowLogin, setShowSignup, setShowForgotPassword}) {
  const [email, setEmail] = useState("") // User's email
  const [password, setPassword] = useState("") // User's password
  const [error, setError] = useState(null) // For showing error message if invalid login

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError("Invalid login. Please try again.")
  }

  function handleSignup() {
    setShowLogin(false)
    setShowSignup(true)    
  }

  function handleForgotPassword() {
    setShowLogin(false)
    setShowForgotPassword(true)
  }

  return (
    <Card className="w-full max-w-sm bg-slate-800 text-foreground">
      <CardHeader> 
        <div className="flex flex-row justify-between">
          <CardTitle>Login to your account</CardTitle>
          <Button variant="outline" onClick={handleSignup} className="max-w-14 max-h-6 bg-stone-800 text-foreground text-xs hover:bg-stone-700 hover:text-stone-400">Sign Up</Button>
        </div>
        <CardDescription className="text-foreground">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  onClick={handleForgotPassword}
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
          variant="outline" 
          type="submit" 
          onClick={handleLogin}
          className="w-full bg-stone-800 hover:bg-stone-700 hover:text-stone-400"
        >
            Login
        </Button>
        {error && <p>{error}</p>}
      </CardFooter>
    </Card>
  )
}

export default LoginForm