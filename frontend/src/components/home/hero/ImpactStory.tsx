import { useEffect, useState } from "react";
import { Leaf, Recycle, Users, UserRound } from "lucide-react";

const stages = [
  {
    number: "01",
    label: "ONE SMALL CHOICE",
    message: "It starts with one choice.",
  },
  {
    number: "02",
    label: "THE RIPPLE",
    message: "One choice can influence another.",
  },
  {
    number: "03",
    label: "A SHARED HABIT",
    message: "Small actions become habits.",
  },
  {
    number: "04",
    label: "COLLECTIVE IMPACT",
    message: "Together, they become change.",
  },
];

export default function ImpactStory() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setStage((current) => (current + 1) % stages.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, []);
  const current = stages[stage];

  return (
    <div
      className="impact-story"
      aria-label="How small actions create collective impact"
    >
      <div className="impact-story__scene">
        <div className="impact-story__glow" />

        <div className="impact-story__orbit impact-story__orbit--one" />
        <div className="impact-story__orbit impact-story__orbit--two" />

        <div className="impact-story__ground">
          <span className="impact-story__ground-line" />
          <span className="impact-story__ground-line impact-story__ground-line--two" />
        </div>

        <div className="impact-story__center">
          <div className="impact-story__core">
            <Leaf size={22} strokeWidth={1.5} />
          </div>

          <span className="impact-story__pulse" />
          <span className="impact-story__pulse impact-story__pulse--two" />
        </div>

        {/* Users */}
        <div className="impact-story__person impact-story__person--one">
          <UserRound size={18} strokeWidth={1.5} />
        </div>

        <div className="impact-story__person impact-story__person--two">
          <UserRound size={18} strokeWidth={1.5} />
        </div>

        <div className="impact-story__person impact-story__person--three">
          <UserRound size={18} strokeWidth={1.5} />
        </div>

        <div className="impact-story__person impact-story__person--four">
          <UserRound size={18} strokeWidth={1.5} />
        </div>

        <div className="impact-story__person impact-story__person--five">
          <UserRound size={18} strokeWidth={1.5} />
        </div>

        <div className="impact-story__person impact-story__person--six">
          <UserRound size={18} strokeWidth={1.5} />
        </div>

        <div className="impact-story__person impact-story__person--seven">
          <UserRound size={18} strokeWidth={1.5} />
        </div>

        <div className="impact-story__person impact-story__person--eight">
          <UserRound size={18} strokeWidth={1.5} />
        </div>
        {/* Actions */}
        <div className="impact-story__action impact-story__action--one">
          <Recycle size={17} strokeWidth={1.6} />
        </div>

        <div className="impact-story__action impact-story__action--two">
          <Leaf size={16} strokeWidth={1.6} />
        </div>

        <div className="impact-story__action impact-story__action--three">
          <Users size={16} strokeWidth={1.6} />
        </div>

        <div className="impact-story__number">
          <span className="impact-story__number-value">
            {current.number}
          </span>

          <span className="impact-story__number-line" />
        </div>

        <div className="impact-story__message" key={stage}>
          <span>{current.label}</span>
          <p>{current.message}</p>
        </div>
      </div>
    </div>
  );
}