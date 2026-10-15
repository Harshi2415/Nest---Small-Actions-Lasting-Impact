import {
  CalendarDays,
  LogOut,
  MapPin,
  Pencil,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BackToNest from "../components/common/BackToNext";

export default function Profile() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("nest_user");
  const user = storedUser
    ? JSON.parse(storedUser)
    : {
        name: "NEST Member",
        email: "member@nest.com",
      };

  function handleLogout() {
    localStorage.removeItem("nest_user");
    localStorage.removeItem("nest_logged_in");

    navigate("/");
  }

  return (
    <main className="min-h-screen bg-[#f7f4ec] text-[#173f32]">
      {/* Header */}
      <section className="bg-[#e8eee4] px-6 pb-16 pt-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BackToNest />

          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#285b49] font-display text-3xl text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6b8879]">
                  Your profile
                </p>

                <h1 className="mt-2 font-display text-4xl font-semibold text-[#173f32] sm:text-5xl">
                  {user.name}
                </h1>

                <p className="mt-2 text-sm text-[#718177]">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#aabdad] bg-white/50 px-5 py-3 text-sm font-semibold text-[#355443] transition hover:bg-white"
            >
              <Pencil size={16} />
              Edit profile
            </button>
          </div>
        </div>
      </section>

      {/* Profile content */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Main */}
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[#d9e0d6] bg-white/55 p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <Sparkles size={19} className="text-[#668271]" />

                <h2 className="font-display text-2xl font-semibold text-[#244b3c]">
                  Your NEST journey
                </h2>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#687a70]">
                This is your space to keep track of the communities you join,
                the small wins you share, and the actions that matter to you.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#e8eee4] p-5">
                  <Users size={18} className="text-[#668271]" />
                  <p className="mt-4 text-2xl font-semibold text-[#285b49]">
                    0
                  </p>
                  <p className="mt-1 text-xs text-[#718177]">
                    Teams joined
                  </p>
                </div>

                <div className="rounded-2xl bg-[#e8eee4] p-5">
                  <Sparkles size={18} className="text-[#668271]" />
                  <p className="mt-4 text-2xl font-semibold text-[#285b49]">
                    0
                  </p>
                  <p className="mt-1 text-xs text-[#718177]">
                    Small wins
                  </p>
                </div>

                <div className="rounded-2xl bg-[#e8eee4] p-5">
                  <CalendarDays size={18} className="text-[#668271]" />
                  <p className="mt-4 text-2xl font-semibold text-[#285b49]">
                    Today
                  </p>
                  <p className="mt-1 text-xs text-[#718177]">
                    Joined NEST
                  </p>
                </div>
              </div>
            </div>

            {/* Empty state */}
            <div className="rounded-[2rem] border border-dashed border-[#c9d5c9] bg-white/35 px-7 py-12 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#e3ece0]">
                <LeafIcon />
              </div>

              <h3 className="mt-5 font-display text-2xl font-semibold text-[#294b3d]">
                Your story starts here.
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#718177]">
                Join a team or share your first small win. Your profile will
                grow with every action.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/teams"
                  className="rounded-full bg-[#285b49] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#214d3e]"
                >
                  Explore teams
                </Link>

                <Link
                  to="/posts"
                  className="rounded-full border border-[#aabdad] bg-white/60 px-5 py-3 text-sm font-semibold text-[#355443] transition hover:bg-white"
                >
                  Explore community
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-[#173f32] p-7 text-white">
              <MapPin size={20} className="text-[#b9d4bc]" />

              <h3 className="mt-5 font-display text-2xl font-semibold">
                Make your profile yours.
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#b8c9bd]">
                Add your location, interests, and a short introduction so
                people can discover what matters to you.
              </p>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e5efe2] px-5 py-3 text-sm font-semibold text-[#285b49] transition hover:bg-white"
              >
                <Pencil size={15} />
                Complete profile
              </button>
            </div>

            {/* Account */}
            <div className="rounded-[2rem] border border-[#d9e0d6] bg-white/55 p-6">
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-[#668271]" />

                <h3 className="font-semibold text-[#355443]">
                  Account
                </h3>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-[#8a554b] transition hover:bg-[#f3e3de]"
              >
                <span>Log out</span>
                <LogOut size={16} />
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function LeafIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="text-[#668271]"
    >
      <path d="M20 4C12 4 5 8 5 15c0 2.5 1.5 4 4 4 7 0 11-7 11-15Z" />
      <path d="M5 19c2-4 5-7 10-9" />
    </svg>
  );
}