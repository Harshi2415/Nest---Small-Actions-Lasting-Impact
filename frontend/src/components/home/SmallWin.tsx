import { ArrowUpRight, Heart, Leaf } from "lucide-react";

export default function SmallWin() {
  return (
    <section className="bg-[#f7f4ec] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#66806f]">
              Today's small win
            </span>

            <h2 className="font-display mt-4 max-w-xl text-4xl font-semibold leading-tight text-[#17352c] sm:text-5xl">
              The little things deserve to be celebrated.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#607269]">
              Not every environmental action has to be extraordinary. NEST
              gives everyday efforts a place to be seen, appreciated and
              repeated.
            </p>

            <a
              href="#community"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-[#315e42]"
            >
              Discover community wins
              <ArrowUpRight size={17} />
            </a>
          </div>

          <article className="relative overflow-hidden rounded-[2rem] border border-[#dce5d9] bg-[#e8eee4] p-7 card-shadow sm:p-9">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#c5dabe]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#315e42] font-semibold text-white">
                    P
                  </div>

                  <div>
                    <p className="font-semibold text-[#173f32]">
                      Priya Sharma
                    </p>
                    <p className="text-xs text-[#72857b]">2 hours ago</p>
                  </div>
                </div>

                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#52715b]">
                  Small Win
                </span>
              </div>

              <div className="mt-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#527e5d]">
                  <Leaf size={26} />
                </div>

                <h3 className="font-display text-2xl font-semibold text-[#173f32] sm:text-3xl">
                  “I started carrying my reusable bottle everywhere.”
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-6 text-[#5e7468]">
                  It felt like such a tiny change, but I've already avoided
                  buying 18 disposable bottles this month.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-6 border-t border-[#cbd9c8] pt-5 text-sm text-[#60766a]">
                <span className="flex items-center gap-2">
                  <Heart size={17} />
                  284 appreciations
                </span>

                <span>32 comments</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}