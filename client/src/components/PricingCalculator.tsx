import { useState, useMemo } from "react";
import { CATS, BUNDLES, QUALIFIER, getRecommendation, formatPrice, getDailyRate, type Category, type LeadData } from "@/lib/pricingData";
import QualifierScreen from "./pricing/QualifierScreen";
import BuilderScreen from "./pricing/BuilderScreen";
import LeadScreen from "./pricing/LeadScreen";
import QuoteScreen from "./pricing/QuoteScreen";
import "./pricing/PricingCalculator.css";

export type { LeadData };

type Screen = "qualifier" | "builder" | "lead" | "quote";

export default function PricingCalculator() {
  const [screen, setScreen] = useState<Screen>("qualifier");
  const [qStep, setQStep] = useState(0);
  const [bizType, setBizType] = useState("");
  const [urgency, setUrgency] = useState("");
  const [activeCat, setActiveCat] = useState("web");
  const [showBundles, setShowBundles] = useState(false);
  const [selPkgs, setSelPkgs] = useState<Record<string, string | null>>({});
  const [selAddons, setSelAddons] = useState<Record<string, boolean>>({});
  const [selBundle, setSelBundle] = useState<string | null>(null);
  const [cur, setCur] = useState<"NLE" | "USD">("NLE");
  const [lead, setLead] = useState<LeadData>({ name: "", email: "", phone: "", company: "" });

  const rec = useMemo(() => {
    if (bizType && urgency) return getRecommendation(bizType, urgency);
    return null;
  }, [bizType, urgency]);

  const cat = useMemo(() => CATS.find((c) => c.id === activeCat) as Category, [activeCat]);

  const { oneTime, monthly, totalItems, dOT, dMo, dYr } = useMemo(() => {
    let ot = 0,
      mo = 0,
      items = 0;

    if (selBundle) {
      const bundle = BUNDLES.find((b) => b.id === selBundle);
      if (bundle) {
        ot = bundle.price;
        items = 1;
      }
    } else {
      Object.entries(selPkgs).forEach(([catId, pkgId]) => {
        if (pkgId) {
          const category = CATS.find((c) => c.id === catId);
          const pkg = category?.pkgs.find((p) => p.id === pkgId);
          if (pkg) {
            if (category?.billing === "monthly") mo += pkg.price;
            else ot += pkg.price;
            items++;
          }
        }
      });

      Object.entries(selAddons).forEach(([addonId, selected]) => {
        if (selected) {
          for (const category of CATS) {
            const addon = category.addons.find((a) => a.id === addonId);
            if (addon) {
              if (addon.recurring) mo += addon.price;
              else ot += addon.price;
              items++;
              break;
            }
          }
        }
      });
    }

    return {
      oneTime: ot,
      monthly: mo,
      totalItems: items,
      dOT: ot,
      dMo: mo,
      dYr: ot + mo * 12,
    };
  }, [selPkgs, selAddons, selBundle]);

  const handleQualifier = (step: number, answer: string) => {
    if (step === 0) {
      setBizType(answer);
      // If user selects "event", skip to builder directly without asking urgency
      if (answer === "event") {
        const r = getRecommendation(answer, "");
        if (r.cat) setActiveCat(r.cat);
        setScreen("builder");
      } else {
        setQStep(1);
      }
    } else if (step === 1) {
      setUrgency(answer);
      const r = getRecommendation(bizType, answer);
      if (r.cat) setActiveCat(r.cat);
      setScreen("builder");
    }
  };

  const togglePkg = (catId: string, pkgId: string) => {
    setSelPkgs((p) => ({
      ...p,
      [catId]: p[catId] === pkgId ? null : pkgId,
    }));
  };

  const toggleAddon = (id: string) => {
    setSelAddons((p) => ({
      ...p,
      [id]: !p[id],
    }));
  };

  if (screen === "qualifier") {
    return <QualifierScreen step={qStep} onAnswer={handleQualifier} />;
  }

  if (screen === "lead") {
    return (
      <LeadScreen
        lead={lead}
        setLead={setLead}
        oneTime={oneTime}
        monthly={monthly}
        totalItems={totalItems}
        cur={cur}
        onBack={() => setScreen("builder")}
        onSubmit={() => setScreen("quote")}
      />
    );
  }

  if (screen === "quote") {
    return (
      <QuoteScreen
        selPkgs={selPkgs}
        selAddons={selAddons}
        selBundle={selBundle}
        oneTime={oneTime}
        monthly={monthly}
        yr1={dYr}
        cur={cur}
        lead={lead}
        onBack={() => setScreen("builder")}
      />
    );
  }

  return (
    <div className="app">
      <div className="builder">
        <header className="bld-hdr">
          <div className="bld-logo-wrap">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663505087318/cfRcVsHzyEqJuuCR79VKrc/ThreeAMonogramwithGoldBar_20260407_070718_0000_ec0b2152.png" alt="Arsiekeh AI Agency" className="bld-logo-img" />
            <div>
              <div className="bld-nm">Arsiekeh AI Agency</div>
              <div className="bld-sm">Pricing Calculator · 2026</div>
            </div>
          </div>
          <div className="curr-row">
            <span className="curr-lbl">Currency</span>
            <button className={`cbtn${cur === "NLE" ? " on" : ""}`} onClick={() => setCur("NLE")}>
              NLE
            </button>
            <button className={`cbtn${cur === "USD" ? " on" : ""}`} onClick={() => setCur("USD")}>
              USD
            </button>
          </div>
        </header>

        <div className="cat-strip">
          {CATS.map((c) => {
            const has = !!selPkgs[c.id] || (c.addons || []).some((a) => selAddons[a.id]);
            return (
              <button
                key={c.id}
                className={`cpill${activeCat === c.id && !showBundles ? " on" : ""}`}
                onClick={() => {
                  setActiveCat(c.id);
                  setShowBundles(false);
                }}
              >
                <span className="cpill-icon">{c.icon}</span>
                <span className="cpill-name">{c.label}</span>
                {has && <span className="cpill-dot" />}
              </button>
            );
          })}
          <button className={`cpill${showBundles ? " on" : ""}`} onClick={() => setShowBundles((b) => !b)}>
            <span className="cpill-icon">✦</span>
            <span className="cpill-name">Bundles</span>
            {selBundle && <span className="cpill-dot" />}
          </button>
        </div>

        <BuilderScreen
          cat={cat}
          showBundles={showBundles}
          activeCat={activeCat}
          selPkgs={selPkgs}
          selAddons={selAddons}
          selBundle={selBundle}
          rec={rec}
          cur={cur}
          togglePkg={togglePkg}
          toggleAddon={toggleAddon}
          setSelBundle={setSelBundle}
          setShowBundles={setShowBundles}
        />

        {totalItems > 0 && (
          <div className="total-bar">
            <div className="tb-left">
              <div className="tb-items">
                <b>{totalItems}</b> {totalItems === 1 ? "service" : "services"}
              </div>
              <div className="tb-div" />
              {oneTime > 0 && (
                <div className="tb-grp">
                  <div className="tb-lbl">One-Time</div>
                  <div className="tb-val">{formatPrice(dOT, cur)}</div>
                </div>
              )}
              {oneTime > 0 && monthly > 0 && <div className="tb-div" />}
              {monthly > 0 && (
                <div className="tb-grp">
                  <div className="tb-lbl">Monthly</div>
                  <div className="tb-val">
                    {formatPrice(dMo, cur)}
                    <span style={{ fontFamily: "'Inconsolata',monospace", fontSize: "10px", color: "var(--muted)" }}>
                      /mo
                    </span>
                  </div>
                  <div className="tb-day">{getDailyRate(monthly, cur)}</div>
                </div>
              )}
              {monthly > 0 && oneTime > 0 && (
                <>
                  <div className="tb-div tb-grp yr1" />
                  <div className="tb-grp yr1">
                    <div className="tb-lbl">Year 1</div>
                    <div className="tb-val" style={{ fontSize: "16px" }}>
                      {formatPrice(dYr, cur)}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button className="btn-bq" onClick={() => setScreen("lead")}>
              Build Quote →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
