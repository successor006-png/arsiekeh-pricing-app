import { BUNDLES, type Category, type Recommendation, formatPrice } from "@/lib/pricingData";
import "./BuilderScreen.css";

interface BuilderScreenProps {
  cat: Category;
  showBundles: boolean;
  activeCat: string;
  selPkgs: Record<string, string | null>;
  selAddons: Record<string, boolean>;
  selBundle: string | null;
  rec: Recommendation | null;
  cur: "NLE" | "USD";
  togglePkg: (catId: string, pkgId: string) => void;
  toggleAddon: (id: string) => void;
  setSelBundle: (id: string | null) => void;
  setShowBundles: (show: boolean) => void;
}

export default function BuilderScreen({
  cat,
  showBundles,
  activeCat,
  selPkgs,
  selAddons,
  selBundle,
  rec,
  cur,
  togglePkg,
  toggleAddon,
  setSelBundle,
  setShowBundles,
}: BuilderScreenProps) {
  const selPkgObj = selPkgs[activeCat] ? cat.pkgs.find((p) => p.id === selPkgs[activeCat]) : null;

  return (
    <div className="bld-panel">
      {showBundles ? (
        <>
          <div className="roi-bar">
            <div className="roi-icon">✦</div>
            <div className="roi-txt">
              Bundle packages combine services at a discounted rate — saving up to NLE 10,200 vs purchasing separately.
            </div>
            <div className="roi-tag">Bundles</div>
          </div>
          <div className="bun-hdr">Pre-Built Packages</div>
          {BUNDLES.map((b) => (
            <div
              key={b.id}
              className={`brow${selBundle === b.id ? " sel" : ""}`}
              onClick={() => setSelBundle(selBundle === b.id ? null : b.id)}
            >
              <div className="bchk">{selBundle === b.id ? "✓" : ""}</div>
              <div className="bbody">
                <div className="btop">
                  <div className="bname">{b.name}</div>
                  <div className="btag" style={{ background: `${b.color}18`, color: b.color, border: `1px solid ${b.color}40` }}>
                    {b.tag}
                  </div>
                </div>
                <div className="binc">{b.includes}</div>
                <div className="bbot">
                  <div className="bprice">{formatPrice(b.price, cur)}</div>
                  <div className="bsave">Save {formatPrice(b.saves, cur)}</div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="roi-bar">
            <div className="roi-icon">◉</div>
            <div className="roi-txt">{cat.roi}</div>
            <div className="roi-tag">{cat.label}</div>
          </div>

          {rec?.cat === activeCat && rec?.pkg && (
            <div className="rec-tag">✦ Recommended for your situation: {rec.label}</div>
          )}

          <div className="pkg-grid">
            {cat.pkgs.map((pkg, i) => {
              const sel = selPkgs[activeCat] === pkg.id;
              const isRec = rec?.cat === activeCat && rec?.pkg === pkg.id;
              let bc = "";
              if (isRec) bc = "reco";
              else if (pkg.badge === "Most Popular") bc = "pop";
              else if (pkg.badge === "Recommended") bc = "rec";
              else if (pkg.badge === "Best Value") bc = "bv";
              else if (pkg.badge) bc = "prem";

              return (
                <button
                  key={pkg.id}
                  className={`pkg${sel ? " sel" : ""}${isRec ? " rechl" : ""}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => togglePkg(activeCat, pkg.id)}
                >
                  {(pkg.badge || isRec) && (
                    <div className={`pbadge ${bc}`}>{isRec ? rec.label : pkg.badge}</div>
                  )}
                  <div className="pchk">{sel ? "✓" : ""}</div>
                  <div className="pname">{pkg.name}</div>
                  <div className="pdesc">{pkg.desc}</div>
                  <div className="pprice">{formatPrice(pkg.price, cur)}</div>
                  <div className="pbill">{cat.billing === "monthly" ? "per month" : "one-time fee"}</div>
                  <ul className="pfeats">
                    {pkg.feats.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          {selPkgObj && cat.addons && cat.addons.length > 0 && (
            <>
              <div className="addons-hdr">Add-Ons for {selPkgObj.name}</div>
              <div className="addons-grid">
                {cat.addons.map((a) => {
                  const sel = !!selAddons[a.id];
                  return (
                    <button
                      key={a.id}
                      className={`ac${sel ? " sel" : ""}`}
                      onClick={() => toggleAddon(a.id)}
                    >
                      <div className="acbox">{sel ? "✓" : "+"}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="acname">{a.name}</div>
                        <div className="acdesc">{a.desc}</div>
                      </div>
                      <div className="acprice">
                        {formatPrice(a.price, cur)}
                        {a.recurring ? "/mo" : ""}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
