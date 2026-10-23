"use client";

import React, { useState, useEffect } from "react";
import { clinicConfig } from "@/config/clinic";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Clock,
  ShieldAlert,
} from "lucide-react";

interface ContactSectionProps {
  selectedService?: string;
}

export function ContactSection({ selectedService }: ContactSectionProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [service, setService] = useState(selectedService || clinicConfig.services[0].name);
  const [customReason, setCustomReason] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Update selected service if prop changes (e.g. from service cards)
  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
      // Scroll smoothly to form if invoked from outside
      const formEl = document.getElementById("inquiry-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Client-side quick validation
    if (!fullName.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please provide your phone number.");
      return;
    }

    const effectiveService = service === "Other dental inquiry" ? (customReason.trim() || "Other dental inquiry") : service;

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          telegramUsername: telegramUsername.trim() || null,
          service: effectiveService,
          preferredDate: preferredDate || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry. Please try calling us directly.");
      }

      setSuccess(
        `Thank you, ${fullName.trim()}! Your inquiry has been received. Our clinic will contact you at ${phone.trim()} shortly.`
      );
      // Reset form
      setFullName("");
      setPhone("");
      setTelegramUsername("");
      setCustomReason("");
      setPreferredDate("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please contact the clinic by phone.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-sand-100/60 border-t border-sand-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy-700"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-burgundy-800">
              GET IN TOUCH
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 leading-tight mb-4">
            How can we help you?
          </h2>

          <p className="text-base text-charcoal-700">
            Leave your contact details and tell us what service you want to ask about.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Inquiry Form Column */}
          <div className="lg:col-span-7">
            <div id="inquiry-form" className="bg-cream-50 rounded-2xl p-6 sm:p-8 md:p-10 border border-sand-200 shadow-card">
              
              <div className="mb-6">
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-charcoal-900 mb-1">
                  Send a Patient Inquiry
                </h3>
                <p className="text-xs text-charcoal-600">
                  Fill in your details below. We keep your information private and secure.
                </p>
              </div>

              {/* Status Alerts */}
              {success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start space-x-3 text-sm animate-in fade-in duration-200">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Inquiry Saved</p>
                    <p className="mt-0.5 leading-relaxed">{success}</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start space-x-3 text-sm animate-in fade-in duration-200">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Unable to Send</p>
                    <p className="mt-0.5 leading-relaxed">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-2">
                    Full Name <span className="text-burgundy-700">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Abebe Kebede"
                    className="w-full px-4 py-3 rounded-lg bg-cream-50 border border-sand-300 text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:border-transparent text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-2">
                    Phone Number <span className="text-burgundy-700">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0921 48 90 71 or +251 9..."
                    className="w-full px-4 py-3 rounded-lg bg-cream-50 border border-sand-300 text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:border-transparent text-sm"
                  />
                  <p className="mt-1 text-[11px] text-charcoal-500">
                    Ethiopian mobile format (Ethio Telecom or Safaricom).
                  </p>
                </div>

                {/* Telegram Username (Optional) */}
                <div>
                  <label htmlFor="telegramUsername" className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-2">
                    Telegram username (optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-charcoal-400 text-sm font-mono">@</span>
                    <input
                      id="telegramUsername"
                      type="text"
                      value={telegramUsername}
                      onChange={(e) => setTelegramUsername(e.target.value)}
                      placeholder="username"
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-cream-50 border border-sand-300 text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-2">
                    Service or Reason for Inquiry <span className="text-burgundy-700">*</span>
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-cream-50 border border-sand-300 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:border-transparent text-sm"
                  >
                    {clinicConfig.services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Other dental inquiry">Other dental inquiry</option>
                  </select>

                  {/* If "Other" selected, show small description input */}
                  {service === "Other dental inquiry" && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        placeholder="Please briefly describe your dental need or question"
                        maxLength={150}
                        className="w-full px-4 py-2.5 rounded-lg bg-cream-50 border border-sand-300 text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                      />
                    </div>
                  )}
                </div>

                {/* Preferred Date (Optional) */}
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-2">
                    Preferred contact/visit date <span className="text-charcoal-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="preferredDate"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-lg bg-cream-50 border border-sand-300 text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-charcoal-500 flex items-center space-x-1">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>This is a requested date only, not a confirmed appointment. We will confirm via call.</span>
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 disabled:bg-burgundy-500 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:ring-offset-2"
                  >
                    {loading ? (
                      <span className="inline-flex items-center space-x-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Saving your inquiry...</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-2">
                        <span>Send Inquiry</span>
                        <Send className="w-4 h-4 ml-1" />
                      </span>
                    )}
                  </button>
                </div>

                {/* Privacy Note */}
                <p className="text-[11px] text-charcoal-500 text-center leading-relaxed">
                  Please don't include private medical information in your message.
                </p>

              </form>

            </div>
          </div>

          {/* Contact Details & Map Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-cream-50 rounded-2xl p-6 sm:p-7 border border-sand-200 shadow-subtle">
              <h3 className="font-editorial text-xl font-bold text-charcoal-900 mb-4">
                Visit or contact us.
              </h3>

              <div className="space-y-4 text-sm">
                
                {/* Clinic Name & Location */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-burgundy-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal-900">{clinicConfig.name}</p>
                    <p className="text-charcoal-700 mt-0.5">{clinicConfig.contact.address.text}</p>
                    <p className="text-charcoal-600 font-medium">
                      {clinicConfig.contact.address.city}, {clinicConfig.contact.address.country}
                    </p>
                    {!clinicConfig.contact.address.isVerifiedByClinic && (
                      <p className="mt-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                        Please confirm exact room/floor before your visit
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start space-x-3 pt-3 border-t border-sand-200">
                  <Phone className="w-5 h-5 text-burgundy-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-charcoal-900 mb-1">Telephone & Inquiries</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {clinicConfig.contact.allPhones.map((p, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <a
                            href={`tel:${p.number}`}
                            className="text-xs font-semibold text-charcoal-800 hover:text-burgundy-700 hover:underline"
                          >
                            {p.formatted}
                          </a>
                          {p.supportsWhatsApp && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                              WhatsApp
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 pt-3 border-t border-sand-200">
                  <Mail className="w-5 h-5 text-burgundy-700 shrink-0" />
                  <div>
                    <a
                      href={`mailto:${clinicConfig.contact.email}`}
                      className="text-xs font-semibold text-charcoal-800 hover:text-burgundy-700 hover:underline"
                    >
                      {clinicConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-3 border-t border-sand-200 flex flex-wrap gap-2.5">
                  <a
                    href={clinicConfig.contact.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-charcoal-700 bg-sand-100 hover:bg-sand-200 border border-sand-200"
                  >
                    <span>TikTok</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={clinicConfig.contact.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-charcoal-700 bg-sand-100 hover:bg-sand-200 border border-sand-200"
                  >
                    <span>Facebook</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {clinicConfig.contact.allPhones[0].supportsWhatsApp && (
                    <a
                      href={`https://wa.me/${clinicConfig.contact.allPhones[0].number.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                    >
                      <MessageCircle className="w-3 h-3 text-emerald-700" />
                      <span>WhatsApp Chat</span>
                    </a>
                  )}
                </div>

              </div>
            </div>

            {/* Google Maps Container */}
            <div className="bg-cream-50 rounded-2xl overflow-hidden border border-sand-200 shadow-subtle flex flex-col">
              <div className="p-4 bg-sand-100 border-b border-sand-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800">
                  Clinic Location Map · Adama
                </span>
                <a
                  href={clinicConfig.contact.maps.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-burgundy-700 hover:underline"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative w-full h-64 sm:h-72 bg-sand-200">
                <iframe
                  title="Dr Megersa Dental Clinic Google Map Location"
                  src={clinicConfig.contact.maps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
