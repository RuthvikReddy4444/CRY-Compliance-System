function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      
      {/* Left */}
      <div>
        <p className="text-xs font-medium text-slate-400">
          CRY Compliance Platform
        </p>

        <h2 className="text-sm font-semibold text-slate-800">
          Partner monitoring workspace
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="hidden items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="w-48 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notification */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          🔔

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
          CR
        </div>

      </div>

    </header>
  );
}

export default Header;