function MissionSection() {
  return (
    <div className="flex flex-col items-center justify-center w-[95%] gap-5 py-6 rounded-lg bg-slate-800 border-4 border-slate-900"> 
      <div className="flex flex-row items-center justify-center w-[50%] gap-6">
        <h1 className="scroll-m-20 border-b text-center text-5xl font-semibold tracking-tight text-balance">
          Our Mission
        </h1>
      </div>
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        For helping real people with real problems.
      </h2>
      <blockquote className="flex w-[50%] text-center border-l-2 pl-6 italic">
        &quot;I built Getting Better because I know how overwhelming it can feel to carry thoughts around with nowhere to put them. This app isn’t about productivity or streaks — it’s just a space to be honest with yourself. Whether you’re navigating something heavy or just trying to make sense of your day, I hope this can be a small, quiet place for you to process, reflect, and breathe.&quot; - Tyson Lee (App Creator)
    </blockquote>
    </div>
  )
}

export default MissionSection
