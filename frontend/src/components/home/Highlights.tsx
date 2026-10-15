import { ArrowRight, Award, Lightbulb, Sprout } from "lucide-react";
import {Link} from "react-router-dom";

const highlights = [
  {
    label: "Small Win",
    title: "18 reusable bottles avoided",
    description:
      "A simple daily choice that kept disposable bottles out of the waste stream.",
    icon: Sprout,
  },
  {
    label: "Idea of the Day",
    title: "Turn old jars into seed starters",
    description:
      "Give everyday waste another purpose while creating a little more green around you.",
    icon: Lightbulb,
  },
  {
    label: "Community Champion",
    title: "Green Steps Collective",
    description:
      "A growing group of people turning small local actions into consistent community habits.",
    icon: Award,
  },
];

export default function Highlights() {
  return (
    
        <section
        id="community"
        className="border-y border-[#d5e1d0] bg-[#e8eee4] px-6 py-24 lg:px-8"
        >
        <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8879]">
                From the community
                </p>

                <h2 className="font-display text-4xl font-semibold tracking-tight text-[#173f32] sm:text-5xl">
                Community Highlights
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-[#587064] sm:text-lg">
                Real ideas, small wins, and people making environmental action
                easier to notice, share, and repeat.
                </p>
            </div>

            <Link
                to="/posts"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#9eb6a4] bg-white/50 px-5 py-3 text-sm font-semibold text-[#285b49] transition hover:-translate-y-0.5 hover:bg-white/80"
            >
                View all posts
                <ArrowRight size={16} />
            </Link>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
            {highlights.map((item) => {
                const Icon = item.icon;

                return (
                <article
                    key={item.title}
                    className="group rounded-[2rem] border border-[#dce5d9] bg-white p-7 card-shadow transition duration-300 hover:-translate-y-1"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8eee4] text-[#285b49]">
                    <Icon size={21} />
                    </div>

                    <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#769181]">
                    {item.label}
                    </p>

                    <h3 className="mt-2 font-display text-2xl font-semibold text-[#173f32]">
                    {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#64796e]">
                    {item.description}
                    </p>

                    <div className="mt-6 h-px w-12 bg-[#b9cdb7] transition-all duration-300 group-hover:w-20" />
                </article>
                );
            })}
            </div>
        </div>
        </section>
  );
}

