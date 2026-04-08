import { QUALIFIER } from "@/lib/pricingData";
import "./QualifierScreen.css";

interface QualifierScreenProps {
  step: number;
  onAnswer: (step: number, answer: string) => void;
}

export default function QualifierScreen({ step, onAnswer }: QualifierScreenProps) {
  const qualifier = QUALIFIER[step];

  if (!qualifier) return null;

  return (
    <div className="app">
      <div className="qualifier-screen">
        <div className="qs-header">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663505087318/cfRcVsHzyEqJuuCR79VKrc/ThreeAMonogramwithGoldBar_20260407_070718_0000_ec0b2152.png" alt="Arsiekeh AI Agency" className="qs-logo-img" />
          <h1 className="qs-title">Arsiekeh AI Agency</h1>
          <p className="qs-subtitle">Let's find the perfect package for you</p>
        </div>

        <div className="qs-progress">
          <div className="qs-progress-bar">
            <div className="qs-progress-fill" style={{ width: `${((step + 1) / QUALIFIER.length) * 100}%` }} />
          </div>
          <p className="qs-progress-text">
            Question {step + 1} of {QUALIFIER.length}
          </p>
        </div>

        <div className="qs-content">
          <h2 className="qs-question">{qualifier.q}</h2>
          <p className="qs-hint">{qualifier.hint}</p>

          <div className="qs-options">
            {qualifier.opts.map((opt) => (
              <button
                key={opt.id}
                className="qs-option"
                onClick={() => onAnswer(step, opt.id)}
              >
                <div className="qso-label">{opt.label}</div>
                <div className="qso-desc">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
