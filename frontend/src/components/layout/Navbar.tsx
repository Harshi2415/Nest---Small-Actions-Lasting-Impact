import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import JoinMoment from "../common/JoinMoment";

const navItems = [
  { label: "Our Impact", href: "#impact" },
  { label: "Community", href: "#community" },
  { label: "Teams", href: "#teams" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center rounded-full border border-white/40 bg-white/25 px-5 py-3 shadow-[0_8px_30px_rgba(38,65,52,0.06)] backdrop-blur-xl">
        
        {/* Logo */}
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2 text-[#17352c]"
          aria-label="NEST home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173f32] text-[#f5f0df]">
            <Leaf size={18} strokeWidth={2.2} />
          </span>

          <span className="font-display text-xl font-semibold tracking-wide">
            NEST
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="ml-auto hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#466055] transition hover:text-[#173f32]"
            >
              {item.label}
            </a>
          ))}

          <JoinMoment />
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setMenuOpen((value) => !value)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#e8eee4] text-[#173f32] md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mx-4 mt-2 rounded-3xl border border-[#dce5d9] bg-white/70 p-4 shadow-xl backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[#466055] transition hover:bg-[#e8eee4]"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#community"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-2xl bg-[#173f32] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Join the movement
            </a>
          </div>
        </div>
      )}
    </header>
  );
}