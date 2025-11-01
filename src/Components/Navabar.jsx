import React, { useState } from "react";

const Navabar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-linear-to-r from-violet-900 via-violet-800 to-purple-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* left: brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-xl font-bold">
              PM
            </div>
            <div className="font-semibold text-lg">PassManager</div>
          </div>


          {/* right: actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white/6 rounded-lg px-2 py-1">
              <svg
                className="w-4 h-4 text-white/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              <input
                className="bg-transparent focus:outline-none text-sm ml-2 placeholder:text-white/70"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
            <button className=" sm:inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-2 py-1 rounded-lg text-sm font-medium flex ring-white ring-2">
              <img
                className="w-8 h-8 "
                src="/icons/github white.svg"
                alt="github"
              />
              GitHub
            </button>

            {/* profile / avatar */}
                      <button className=" sm:inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-2 py-1 rounded-lg text-sm font-medium flex ring-white ring-2">
              <div className="w-7 h-7 rounded-full bg-violet-700 flex items-center justify-center text-xs font-semibold ring-white ring-2">
                A
              </div>
              <span className="text-sm">Ahmad</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navabar;
