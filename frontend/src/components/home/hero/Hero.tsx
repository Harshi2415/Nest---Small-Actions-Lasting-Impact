import { ArrowRight } from "lucide-react";
import ImpactStory from "./ImpactStory";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__background"></div>
      
      <div className="hero__content">
        <div className="hero__copy">
          <span className="hero__eyebrow">NEST · SMALL ACTIONS</span>

          <h1>
            Small actions.
            <br />
            Cleaner places.
            <br />
            <em>Bigger impact.</em>
          </h1>

          <p>
            A small choice may feel insignificant on its own.
            <br />
            Together, our choices can change the places we share.
          </p>

          <a href="#community" className="hero__cta">
            Share your small win
            <ArrowRight size={17} strokeWidth={1.7} />
          </a>
        </div>

        <ImpactStory />
      </div>

      <div className="hero__wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 80C180 25 350 25 540 65C760 112 930 135 1120 88C1250 56 1350 42 1440 62V160H0V80Z"
          />
        </svg>
      </div>
    </section>
  );
}