import { Button } from "@/components/ui/Button"
import { Link } from "react-router-dom"

function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center w-[95%] gap-5 py-6 rounded-lg bg-slate-800 border-4 border-slate-900"> 
      <div className="flex flex-row items-center justify-center w-[50%] gap-6">
        <h1 className="scroll-m-20 border-b text-center text-5xl font-extrabold tracking-tight text-balance">
          Getting Better
        </h1>
        <img className="w-12 h-12" src="/brand-logo.png" alt="Logo" />
      </div>
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        A minimalist journaling tool for reflection and self-healing.
      </h2>
      <p className="flex text-center w-[30%] leading-6">
        Whether you’re navigating anxiety, recovering from burnout, or just trying to stay grounded — this space is yours.
      </p>
      <Link to="/auth">
        <Button className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent">
          Get Started
        </Button>
      </Link>
    </div>
  )
}

export default HeroSection
