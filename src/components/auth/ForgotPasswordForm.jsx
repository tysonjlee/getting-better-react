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

function ForgotPasswordForm({ setShowLogin, setShowForgotPassword }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleResetLink = async () => {
    const { error } = supabase.auth.resetPasswordForEmail(email)
    if (error) setError(error.message)
  }

  function handleLogin() {
    setShowForgotPassword(false)
    setShowLogin(true)
  }

  return (
    <div className="flex flex-col justify-center gap-6 max-w-[40%] max-h-[60%] w-full h-full">
      <Card className="overflow-hidden p-0 bg-neutral-900 border-stone-800">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-foreground">Forgot password?</h1>
                <p className="text-muted-foreground text-balance ">
                  Enter your email to reset your password
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-neutral-600 bg-neutral-800 focus-visible:ring-transparent focus-visible:border-neutral-400 text-foreground"
                  required
                />
              </div>
              <Button type="submit" onClick={handleResetLink} className="w-full bg-foreground text-neutral-900 hover:bg-neutral-400 hover:text-neutral-950">
                Send reset link
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
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By signing up, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

export default ForgotPasswordForm