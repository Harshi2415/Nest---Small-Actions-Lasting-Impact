import { ArrowUpRight, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function JoinMoment() {
  const [open, setOpen] = useState(false);

  const loggedIn = localStorage.getItem("nest_logged_in") === "true";

  if (loggedIn) {
    return (
      <Link
        to="/profile"
        className="inline-flex items-center rounded-full bg-[#285b49] px-5 py-3 text-sm font-semibold text-white hover:bg-[#214d3e]"
      >
        My Profile
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center rounded-full bg-[#285b49] px-5 py-3 text-sm font-semibold text-white hover:bg-[#214d3e]"
      >
        Join the moment
        <ArrowUpRight
            size={16}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-48 overflow-hidden rounded-2xl border border-[#d5dfd4] bg-[#f7f4ec] p-1.5 shadow-[0_18px_50px_rgba(38,65,52,0.12)]">
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#355443] transition hover:bg-[#e8eee4]"
          >
            <LogIn size={16} />
            Log in
          </Link>

          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#355443] transition hover:bg-[#e8eee4]"
          >
            <UserPlus size={16} />
            Register
          </Link>
        </div>
      )}
    </div>
  );
}