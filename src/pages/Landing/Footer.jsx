function Footer() {
  return (
    <footer className="w-full border-t border-slate-700 bg-slate-900 text-muted-foreground">
      {/* Bottom copyright */}
      <div className="text-center text-xs text-slate-500 py-6 ">
        © {new Date().getFullYear()} Getting Better. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
