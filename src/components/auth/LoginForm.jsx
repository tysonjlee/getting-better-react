import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import supabase from '@/lib/supabaseClient'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { useNotes } from '@/contexts/NotesContext'

function LoginForm({ setShowLogin, setShowSignup, setShowForgotPassword }) {
	const { fetchNotes } = useNotes()
	const [email, setEmail] = useState('') // User's email
	const [password, setPassword] = useState('') // User's password
	const [error, setError] = useState(null) // For showing error message if invalid login

	const handleLogin = async () => {
		const { error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
		if (error) setError(error.message)

		fetchNotes() // Call fetchNotes() to display notes upon login
	}

	function handleSignup() {
		setShowLogin(false)
		setShowSignup(true)
	}

	function handleForgotPassword() {
		setShowLogin(false)
		setShowForgotPassword(true)
	}

	const renderAlert = () => {
		if (error) {
			return (
				<Alert variant="destructive">
					<AlertTitle>Warning</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)
		} else return <></>
	}

	return (
		<div className="flex flex-col justify-center gap-6 max-w-[55%] max-h-[60%] w-full h-full">
			{renderAlert()}
			<Card className="overflow-hidden p-0 bg-neutral-900 border-stone-800">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form className="p-6 md:p-8">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center text-center">
								<h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
								<p className="text-muted-foreground text-balance ">Login to your Getting Better account</p>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="email" className="text-foreground">
									Email
								</Label>
								<Input
									id="email"
									type="email"
									onChange={(e) => setEmail(e.target.value)}
									className="border-neutral-600 bg-neutral-800 focus-visible:ring-transparent focus-visible:border-neutral-400 text-foreground"
									required
								/>
							</div>
							<div className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password" className="text-foreground">
										Password
									</Label>
									<a
										onClick={handleForgotPassword}
										className="ml-auto text-sm underline-offset-2 hover:underline text-foreground"
									>
										Forgot your password?
									</a>
								</div>
								<Input
									id="password"
									type="password"
									onChange={(e) => setPassword(e.target.value)}
									className="border-neutral-600 bg-neutral-800 focus-visible:ring-transparent focus-visible:border-neutral-400 text-foreground"
									required
								/>
							</div>
							<Button
								type="button"
								className="w-full bg-foreground text-neutral-900 hover:bg-neutral-400 hover:text-neutral-950"
								onClick={handleLogin}
							>
								Login
							</Button>
							<div className="text-center text-sm text-foreground">
								Don&apos;t have an account?{' '}
								<a onClick={handleSignup} className="underline underline-offset-4 hover:cursor-pointer">
									Sign up
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
				By logging in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	)
}

export default LoginForm
