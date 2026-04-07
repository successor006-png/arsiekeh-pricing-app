import { CATS, BUNDLES, formatPrice, type LeadData } from "@/lib/pricingData";
import "./QuoteScreen.css";

interface QuoteScreenProps {
  selPkgs: Record<string, string | null>;
  selAddons: Record<string, boolean>;
  selBundle: string | null;
  oneTime: number;
  monthly: number;
  yr1: number;
  cur: "NLE" | "USD";
  lead: LeadData;
  onBack: () => void;
}

export default function QuoteScreen({
  selPkgs,
  selAddons,
  selBundle,
  oneTime,
  monthly,
  yr1,
  cur,
  lead,
  onBack,
}: QuoteScreenProps) {
  const selectedItems: Array<{
    type: string;
    name: string;
    price: number;
    category?: string;
    billing?: string;
    recurring?: boolean;
    description?: string;
  }> = [];

  if (selBundle) {
    const bundle = BUNDLES.find((b) => b.id === selBundle);
    if (bundle) {
      selectedItems.push({
        type: "bundle",
        name: bundle.name,
        price: bundle.price,
        description: bundle.includes,
      });
    }
  } else {
    Object.entries(selPkgs).forEach(([catId, pkgId]) => {
      if (pkgId) {
        const category = CATS.find((c) => c.id === catId);
        const pkg = category?.pkgs.find((p) => p.id === pkgId);
        if (pkg) {
          selectedItems.push({
            type: "package",
            name: pkg.name,
            price: pkg.price,
            category: category?.label,
            billing: category?.billing,
          });
        }
      }
    });

    Object.entries(selAddons).forEach(([addonId, selected]) => {
      if (selected) {
        for (const category of CATS) {
          const addon = category.addons.find((a) => a.id === addonId);
          if (addon) {
            selectedItems.push({
              type: "addon",
              name: addon.name,
              price: addon.price,
              category: category?.label,
              recurring: addon.recurring,
            });
            break;
          }
        }
      }
    });
  }

  const handleDownloadPDF = () => {
    // Create a simple HTML document for printing
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Quote - ${lead.company}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
          h1 { color: #1f2937; margin-bottom: 30px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
          .item-name { flex: 1; }
          .item-price { text-align: right; font-weight: bold; }
          .total-section { margin-top: 40px; padding-top: 20px; border-top: 3px solid #1f2937; }
          .total-row { display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; margin: 10px 0; }
          .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <h1>Custom Quote</h1>
        
        <div class="section">
          <div class="section-title">Client Information</div>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Company:</strong> ${lead.company}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Phone:</strong> ${lead.phone}</p>
        </div>

        <div class="section">
          <div class="section-title">Selected Services</div>
          ${selectedItems
            .map(
              (item) =>
                `<div class="item">
            <div class="item-name">${item.name}${item.category ? ` (${item.category})` : ""}</div>
            <div class="item-price">${formatPrice(item.price, cur)}${item.billing === "monthly" || item.recurring ? "/mo" : ""}</div>
          </div>`
            )
            .join("")}
        </div>

        <div class="total-section">
          ${oneTime > 0 ? `<div class="total-row"><span>One-Time Cost:</span><span>${formatPrice(oneTime, cur)}</span></div>` : ""}
          ${monthly > 0 ? `<div class="total-row"><span>Monthly Cost:</span><span>${formatPrice(monthly, cur)}/mo</span></div>` : ""}
          ${monthly > 0 && oneTime > 0 ? `<div class="total-row"><span>Year 1 Total:</span><span>${formatPrice(yr1, cur)}</span></div>` : ""}
        </div>

        <div class="footer">
          <p>This quote was generated on ${new Date().toLocaleDateString()} by Arsiekeh AI Agency</p>
          <p>Valid for 30 days. Contact us to discuss next steps.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quote-${lead.company.replace(/\s+/g, "-").toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEmailQuote = () => {
    const subject = `Quote for ${lead.company} - Arsiekeh AI Agency`;
    const body = `Hello ${lead.name},\n\nThank you for using our pricing calculator. Here's your custom quote:\n\n${selectedItems.map((item) => `- ${item.name}: ${formatPrice(item.price, cur)}`).join("\n")}\n\nTotal: ${formatPrice(oneTime + monthly, cur)}\n\nPlease reply to this email or call us to discuss next steps.`;

    window.location.href = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="app">
      <div className="quote-screen">
        <div className="qs-header">
          <button className="qs-back" onClick={onBack}>
            ← Back
          </button>
          <h1 className="qs-title">Your Custom Quote</h1>
          <p className="qs-subtitle">Ready to move forward? Contact us to get started</p>
        </div>

        <div className="qs-container">
          <div className="qs-content">
            <div className="qs-section">
              <h3 className="qs-section-title">Client Information</h3>
              <div className="qs-info">
                <div className="qs-info-row">
                  <span className="qs-info-label">Name:</span>
                  <span className="qs-info-value">{lead.name}</span>
                </div>
                <div className="qs-info-row">
                  <span className="qs-info-label">Company:</span>
                  <span className="qs-info-value">{lead.company}</span>
                </div>
                <div className="qs-info-row">
                  <span className="qs-info-label">Email:</span>
                  <span className="qs-info-value">{lead.email}</span>
                </div>
                <div className="qs-info-row">
                  <span className="qs-info-label">Phone:</span>
                  <span className="qs-info-value">{lead.phone}</span>
                </div>
              </div>
            </div>

            <div className="qs-section">
              <h3 className="qs-section-title">Selected Services</h3>
              <div className="qs-items">
                {selectedItems.map((item, idx) => (
                  <div key={idx} className="qs-item">
                    <div className="qsi-name">
                      {item.name}
                      {item.category && <span className="qsi-category">{item.category}</span>}
                    </div>
                    <div className="qsi-price">
                      {formatPrice(item.price, cur)}
                      {item.billing === "monthly" || item.recurring ? <span className="qsi-recurring">/mo</span> : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="qs-section qs-totals">
              <h3 className="qs-section-title">Pricing Summary</h3>
              {oneTime > 0 && (
                <div className="qs-total-row">
                  <span>One-Time Cost:</span>
                  <span className="qs-total-value">{formatPrice(oneTime, cur)}</span>
                </div>
              )}
              {monthly > 0 && (
                <div className="qs-total-row">
                  <span>Monthly Cost:</span>
                  <span className="qs-total-value">{formatPrice(monthly, cur)}/mo</span>
                </div>
              )}
              {monthly > 0 && oneTime > 0 && (
                <div className="qs-total-row qs-year-total">
                  <span>Year 1 Total:</span>
                  <span className="qs-total-value">{formatPrice(yr1, cur)}</span>
                </div>
              )}
            </div>

            <div className="qs-actions">
              <button className="qs-action-btn primary" onClick={handleDownloadPDF}>
                ↓ Download Quote
              </button>
              <button className="qs-action-btn secondary" onClick={handleEmailQuote}>
                ✉ Email Quote
              </button>
            </div>

            <div className="qs-footer">
              <p>
                This quote is valid for <strong>30 days</strong>. Contact us to discuss pricing, payment terms, and next steps.
              </p>
              <p className="qs-contact">
                <strong>Arsiekeh AI Agency</strong> | Ready to get started? Let's talk!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
