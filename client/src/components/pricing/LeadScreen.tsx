import { useState } from "react";
import { formatPrice } from "@/lib/pricingData";
import type { LeadData } from "../PricingCalculator";
import "./LeadScreen.css";

interface LeadScreenProps {
  lead: LeadData;
  setLead: (lead: LeadData) => void;
  oneTime: number;
  monthly: number;
  totalItems: number;
  cur: "NLE" | "USD";
  onBack: () => void;
  onSubmit: () => void;
}

export default function LeadScreen({
  lead,
  setLead,
  oneTime,
  monthly,
  totalItems,
  cur,
  onBack,
  onSubmit,
}: LeadScreenProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof LeadData, value: string) => {
    setLead({ ...lead, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!lead.name.trim()) newErrors.name = "Name is required";
    if (!lead.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) newErrors.email = "Invalid email";
    if (!lead.phone.trim()) newErrors.phone = "Phone is required";
    if (!lead.company.trim()) newErrors.company = "Company name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  const yr1 = oneTime + monthly * 12;

  return (
    <div className="app">
      <div className="lead-screen">
        <div className="ls-header">
          <button className="ls-back" onClick={onBack}>
            ← Back
          </button>
          <h1 className="ls-title">Let's Get Your Details</h1>
          <p className="ls-subtitle">We'll use this to prepare your custom quote</p>
        </div>

        <div className="ls-container">
          <div className="ls-form">
            <div className="ls-form-group">
              <label className="ls-label">Full Name *</label>
              <input
                type="text"
                className={`ls-input${errors.name ? " error" : ""}`}
                value={lead.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your name"
              />
              {errors.name && <p className="ls-error">{errors.name}</p>}
            </div>

            <div className="ls-form-group">
              <label className="ls-label">Email Address *</label>
              <input
                type="email"
                className={`ls-input${errors.email ? " error" : ""}`}
                value={lead.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your@email.com"
              />
              {errors.email && <p className="ls-error">{errors.email}</p>}
            </div>

            <div className="ls-form-group">
              <label className="ls-label">Phone Number *</label>
              <input
                type="tel"
                className={`ls-input${errors.phone ? " error" : ""}`}
                value={lead.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+232 XX XXX XXXX"
              />
              {errors.phone && <p className="ls-error">{errors.phone}</p>}
            </div>

            <div className="ls-form-group">
              <label className="ls-label">Company/Organization *</label>
              <input
                type="text"
                className={`ls-input${errors.company ? " error" : ""}`}
                value={lead.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="Your company name"
              />
              {errors.company && <p className="ls-error">{errors.company}</p>}
            </div>

            <button className="ls-submit" onClick={handleSubmit}>
              Generate Quote →
            </button>
          </div>

          <div className="ls-summary">
            <div className="lss-card">
              <h3 className="lss-title">Quote Summary</h3>
              <div className="lss-item">
                <span className="lss-label">Services Selected</span>
                <span className="lss-value">{totalItems}</span>
              </div>
              {oneTime > 0 && (
                <div className="lss-item">
                  <span className="lss-label">One-Time Cost</span>
                  <span className="lss-value">{formatPrice(oneTime, cur)}</span>
                </div>
              )}
              {monthly > 0 && (
                <div className="lss-item">
                  <span className="lss-label">Monthly Cost</span>
                  <span className="lss-value">{formatPrice(monthly, cur)}/mo</span>
                </div>
              )}
              {monthly > 0 && oneTime > 0 && (
                <div className="lss-item lss-highlight">
                  <span className="lss-label">Year 1 Total</span>
                  <span className="lss-value">{formatPrice(yr1, cur)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
