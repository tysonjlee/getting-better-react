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
  const [message, setMessage] = useState(null)

  const handleSignup = async () => {
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

  return (
      <Card className="w-full max-w-sm bg-slate-800 text-foreground">
        <CardHeader> 
          <div className="flex flex-row justify-between">
            <CardTitle>Signup</CardTitle>
            <Button variant="outline" onClick={handleLogin} className="max-w-14 max-h-6 bg-stone-800 text-foreground text-xs hover:bg-stone-700 hover:text-stone-400">Login</Button>
          </div>
          <CardDescription className="text-foreground">
            Enter a valid email & password to make an account
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
            onClick={handleSignup}
            className="w-full bg-stone-800 hover:bg-stone-700 hover:text-stone-400"
          >
              Signup
          </Button>
          {message && <p className="absolute bottom-full left-1/2 -translate-x-1/2 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">{message}</p>}
        </CardFooter>
      </Card>
    )
}

export default SignupForm