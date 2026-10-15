import { ArrowUpRight, CalendarDays, Users } from "lucide-react";
import {Link} from "react-router-dom";

export default function TeamPreview() {
  return (
    <section id="teams" className="bg-[#e8eee4] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
              Grow together
            </p>

            <h2 className="font-display text-4xl font-semibold tracking-tight text-[#173f32] sm:text-5xl">
              Better together.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#587064] sm:text-lg">
              Find people who care about the same places, problems, and
              possibilities — then turn ideas into action.
            </p>
          </div>

          <Link
            to="/teams"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#9eb6a4] bg-white/45 px-5 py-3 text-sm font-semibold text-[#285b49] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/70"
          >
            Explore all teams

            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2.5rem] bg-[#173f32] p-7 text-white shadow-[0_24px_70px_rgba(38,65,52,0.15)] sm:p-9">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-[#dce9dd]">
                <span className="h-2 w-2 rounded-full bg-[#9bc59d]" />
                Active team
              </div>

              <h3 className="mt-5 font-display text-3xl font-semibold">
                Green Warriors
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-6 text-[#b8c9bd]">
                A local group turning regular neighborhood cleanups into a
                shared habit.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <Users size={18} className="mb-3 text-[#b9d4bc]" />
                <p className="text-2xl font-semibold">42</p>
                <p className="mt-1 text-xs text-[#9db5a4]">Members</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <CalendarDays size={18} className="mb-3 text-[#b9d4bc]" />

                <p className="text-lg font-semibold">Oct 11</p>

                <p className="mt-1 text-xs text-[#9db5a4]">
                    Next activity
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="mb-3 text-lg">✦</p>
                <p className="text-2xl font-semibold">186</p>
                <p className="mt-1 text-xs text-[#9db5a4]">Actions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}