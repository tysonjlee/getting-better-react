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

function ForgotPasswordForm({ setShowLogin, setShowForgotPassword, }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleResetPassword = async () => {
    const { error } = supabase.auth.resetPasswordForEmail(email)
    if (error) setError(error.message)
  }

  function handleLogin() {
    setShowForgotPassword(false)
    setShowLogin(true)
  }

  return (
      <Card className="w-full max-w-sm bg-slate-800 text-foreground">
        <CardHeader> 
          <div className="flex flex-row justify-between">
            <CardTitle>Reset Password</CardTitle>
            <Button variant="outline" onClick={handleLogin} className="max-w-24 max-h-6 bg-stone-800 text-foreground text-xs hover:bg-stone-700 hover:text-stone-400">Back to Login</Button>
          </div>
          <CardDescription className="text-foreground">
            Enter your email to reset your password.
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button 
            variant="outline" 
            type="submit" 
            onClick={handleResetPassword}
            className="w-full bg-stone-800 hover:bg-stone-700 hover:text-stone-400"
          >
              Reset Password
          </Button>
          {error && <p>{error}</p>}
        </CardFooter>
      </Card>
    )
}

export default ForgotPasswordForm