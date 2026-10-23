"use client";

import React, { useState, useEffect } from "react";
import { clinicConfig } from "@/config/clinic";
import { saveStoredInquiry, getStoredInquiries, MAX_DEMO_INQUIRIES } from "@/lib/storage";
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
  Sparkles,
  Info,
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
  const [storedCount, setStoredCount] = useState<number>(0);

  useEffect(() => {
    const list = getStoredInquiries();
    setStoredCount(list.length);
  }, []);

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
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

    // Client-side required checks
    if (!fullName.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please provide your phone number.");
      return;
    }

    const effectiveService =
      service === "Other dental inquiry" ? (customReason.trim() || "Other dental inquiry") : service;

    setLoading(true);

    try {
      // 1. Server-side validation & rate-limiting check
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        throw new Error(data.error || "Failed to validate inquiry. Please try calling directly.");
      }

      // 2. Client-side local storage with strict 10-inquiry showcase limit
      const storageResult = saveStoredInquiry({
        fullName: fullName.trim(),
        phone: data.validatedData?.phone || phone.trim(),
        telegramUsername: telegramUsername.trim() || null,
        service: effectiveService,
        preferredDate: preferredDate || null,
      });

      if (!storageResult.success) {
        throw new Error(storageResult.error || "Failed to store demo inquiry.");
      }

      const updatedList = getStoredInquiries();
      setStoredCount(updatedList.length);

      setSuccess(
        `Inquiry received and saved to browser demo storage (${updatedList.length}/${MAX_DEMO_INQUIRIES} demo slots used). You can view this entry in the Demo Admin area.`
      );

      // Reset fields
      setFullName("");
      setPhone("");
      setTelegramUsername("");
      setCustomReason("");
      setPreferredDate("");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try contacting the clinic by telephone.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-mist-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-mint-200 shadow-subtle w-fit mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
              GET IN TOUCH
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            How can we help you?
          </h2>

          <p className="text-base text-slate-600">
            Leave your contact details and tell us what service you want to ask about.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div id="inquiry-form" className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-white/90 shadow-floating">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-mist-200">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                    Send a Patient Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Quick 4-field inquiry form for dental consultation.
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-medium text-teal-700 bg-mint-100 px-2.5 py-1 rounded-md border border-mint-200">
                    Demo Storage: {storedCount}/{MAX_DEMO_INQUIRIES}
                  </span>
                </div>
              </div>

              {/* Status Alerts */}
              {success && (
                <div className="mb-6 p-4 rounded-2xl bg-mint-50 border border-mint-300 text-teal-900 flex items-start space-x-3 text-sm animate-in fade-in">
                  <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Inquiry Saved Successfully</p>
                    <p className="mt-0.5 leading-relaxed text-xs text-teal-800">{success}</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start space-x-3 text-sm animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Submission Note</p>
                    <p className="mt-0.5 leading-relaxed text-xs">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-teal-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Abebe Kebede"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-mist-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm shadow-subtle"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-teal-600">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0921 48 90 71 or +251 9..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-mist-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm shadow-subtle"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Ethiopian mobile format (Ethio Telecom or Safaricom).
                  </p>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service or Reason for Inquiry <span className="text-teal-600">*</span>
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-mist-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm shadow-subtle"
                  >
                    {clinicConfig.services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Other dental inquiry">Other dental inquiry</option>
                  </select>

                  {service === "Other dental inquiry" && (
                    <div className="mt-2.5">
                      <input
                        type="text"
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        placeholder="Please briefly describe your dental need or question"
                        maxLength={150}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-mist-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-subtle"
                      />
                    </div>
                  )}
                </div>

                {/* Preferred Date (Optional) */}
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred contact / visit date <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-mist-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-subtle"
                  />
                  <p className="mt-1 text-[11px] text-slate-500 flex items-center space-x-1">
                    <Clock className="w-3 h-3 shrink-0 text-slate-400" />
                    <span>Requested date only, not a confirmed appointment. The clinic will call to confirm.</span>
                  </p>
                </div>

                {/* Telegram Username (Optional) */}
                <div>
                  <label htmlFor="telegramUsername" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Telegram username (optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm font-mono">@</span>
                    <input
                      id="telegramUsername"
                      type="text"
                      value={telegramUsername}
                      onChange={(e) => setTelegramUsername(e.target.value)}
                      placeholder="username"
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-white border border-mist-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm shadow-subtle"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || storedCount >= MAX_DEMO_INQUIRIES}
                    className="btn-primary-glow w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-flex items-center space-x-2">
                        <span>Validating and saving...</span>
                      </span>
                    ) : storedCount >= MAX_DEMO_INQUIRIES ? (
                      <span>Demo Storage Full (10/10)</span>
                    ) : (
                      <span className="inline-flex items-center space-x-2">
                        <span>Send Inquiry</span>
                        <Send className="w-4 h-4 ml-1" />
                      </span>
                    )}
                  </button>
                </div>

                {/* Privacy & Demo Notice */}
                <div className="pt-2 space-y-1.5 text-center">
                  <p className="text-[11px] text-slate-500">
                    Please don't include private medical information in your message.
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center justify-center space-x-1">
                    <Info className="w-3 h-3 text-teal-600" />
                    <span>Showcase demo: inquiries are saved locally in this browser.</span>
                  </p>
                </div>

              </form>

            </div>
          </div>

          {/* Contact Details & Directions Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/90 shadow-glass">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">
                Visit or contact us.
              </h3>

              <div className="space-y-4 text-sm">
                
                {/* Location */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{clinicConfig.name}</p>
                    <p className="text-slate-600 mt-0.5">{clinicConfig.contact.address.text}</p>
                    <p className="text-slate-500 font-medium">
                      {clinicConfig.contact.address.city}, {clinicConfig.contact.address.country}
                    </p>
                    {!clinicConfig.contact.address.isVerifiedByClinic && (
                      <p className="mt-1 text-[11px] text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 inline-block font-medium">
                        Please confirm exact floor/room before your visit
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start space-x-3 pt-3 border-t border-mist-200">
                  <div className="w-8 h-8 rounded-lg bg-mint-50 border border-mint-200 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 mb-1">Telephone & Inquiries</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {clinicConfig.contact.allPhones.map((p, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <a
                            href={`tel:${p.number}`}
                            className="text-xs font-semibold text-slate-800 hover:text-teal-600 hover:underline"
                          >
                            {p.formatted}
                          </a>
                          {p.supportsWhatsApp && (
                            <span className="text-[10px] bg-mint-100 text-teal-800 px-1.5 py-0.2 rounded font-medium">
                              WhatsApp
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 pt-3 border-t border-mist-200">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-teal-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <a
                      href={`mailto:${clinicConfig.contact.email}`}
                      className="text-xs font-semibold text-slate-800 hover:text-teal-600 hover:underline"
                    >
                      {clinicConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Social & WhatsApp Buttons */}
                <div className="pt-3 border-t border-mist-200 flex flex-wrap gap-2.5">
                  <a
                    href={clinicConfig.contact.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-mist-100 border border-mist-300 shadow-subtle"
                  >
                    <span>TikTok</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  <a
                    href={clinicConfig.contact.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-mist-100 border border-mist-300 shadow-subtle"
                  >
                    <span>Facebook</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  {clinicConfig.contact.allPhones[0].supportsWhatsApp && (
                    <a
                      href={`https://wa.me/${clinicConfig.contact.allPhones[0].number.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-teal-800 bg-mint-50 hover:bg-mint-100 border border-mint-200 shadow-subtle"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
                      <span>WhatsApp Chat</span>
                    </a>
                  )}
                </div>

              </div>
            </div>

            {/* Google Maps Container */}
            <div className="glass-card rounded-3xl overflow-hidden border border-white/90 shadow-glass flex flex-col">
              <div className="p-4 bg-mist-100/80 border-b border-mist-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Clinic Location Map · Adama
                </span>
                <a
                  href={clinicConfig.contact.maps.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-teal-700 hover:underline"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative w-full h-64 bg-mist-200">
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
