import { ArrowUpRight, Globe2, Users } from "lucide-react";

export default function ImpactPreview() {
  return (
    <section id="impact" className="bg-[#f7f4ec] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#66806f]">
              Collective impact
            </span>

            <h2 className="font-display mt-4 text-4xl font-semibold leading-tight text-[#17352c] sm:text-5xl">
              What happens when 1,000 people do the little thing?
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#607269]">
              NEST turns an individual action into a simple, transparent
              estimate of what could happen when a whole community joins in.
            </p>

            <a
              href="#community"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#173f32] px-5 py-3 text-sm font-semibold text-white"
            >
              Explore the impact tracker
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="rounded-[2.2rem] bg-[#173f32] p-7 text-white shadow-2xl shadow-[#173f32]/15 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a9c1af]">
                  Example action
                </p>

                <h3 className="font-display mt-2 text-2xl font-semibold">
                  Carry a reusable bottle
                </h3>
              </div>

              <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                1 action
              </div>
            </div>

            <div className="my-10 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[#a9c1af]">One person</p>
                <p className="mt-2 text-3xl font-bold">30</p>
                <p className="text-xs text-[#9fb7a6]">estimated bottles</p>
              </div>

              <div className="h-px flex-1 bg-white/15" />

              <div className="text-right">
                <p className="text-sm text-[#a9c1af]">1,000 people</p>
                <p className="mt-2 text-4xl font-bold text-[#d8e8cf]">
                  30,000
                </p>
                <p className="text-xs text-[#9fb7a6]">
                  estimated bottles avoided
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/8 p-5">
                <Users size={20} className="text-[#bfd6bd]" />
                <p className="mt-4 text-sm text-[#a9c1af]">People joining</p>
                <p className="mt-1 text-2xl font-bold">1,000</p>
              </div>

              <div className="rounded-2xl bg-white/8 p-5">
                <Globe2 size={20} className="text-[#bfd6bd]" />
                <p className="mt-4 text-sm text-[#a9c1af]">
                  Estimated collective effect
                </p>
                <p className="mt-1 text-2xl font-bold">30K</p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-[#8fa89a]">
              Example calculation for demonstration. Real impact values will
              use documented assumptions and will be clearly labelled as
              estimates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}