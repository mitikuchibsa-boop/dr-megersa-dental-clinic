"use client";

import React, { useState } from "react";
import Link from "next/link";
import { clinicConfig } from "@/config/clinic";
import { Phone, Menu, X, Sparkles, MessageCircle } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#clinic", label: "Our Clinic" },
    { href: "#doctor", label: "Doctor" },
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-mist-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-100 via-mint-200 to-white flex items-center justify-center border border-mint-300 shadow-subtle group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-teal-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
              {clinicConfig.name}
            </span>
            <span className="text-[11px] tracking-wide text-slate-500 font-medium -mt-0.5">
              Adama, Ethiopia · {clinicConfig.doctorTitle}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors py-1.5"
            >
              {link.label}
            </a>
          ))}

          {/* Direct Phone Call Pill */}
          <a
            href={`tel:${clinicConfig.contact.primaryPhone}`}
            className="flex items-center space-x-2 text-xs font-semibold text-slate-800 bg-cyan-50/80 hover:bg-cyan-100/80 px-3.5 py-2 rounded-full border border-cyan-200 transition-all shadow-subtle"
            title="Call Clinic Directly"
          >
            <Phone className="w-3.5 h-3.5 text-teal-600" />
            <span>{clinicConfig.contact.primaryPhoneFormatted}</span>
          </a>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick("#contact")}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-glass transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Contact Us
          </button>
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center space-x-2">
          <a
            href={`tel:${clinicConfig.contact.primaryPhone}`}
            className="p-2.5 rounded-xl text-teal-700 bg-cyan-50 border border-cyan-200 focus:outline-none"
            aria-label="Call clinic directly"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 bg-mist-100 border border-mist-200 focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-mist-200 bg-white/95 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3 shadow-floating animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-mist-100 hover:text-teal-600 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-mist-200 flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick("#contact")}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-glass transition-colors"
            >
              Contact Us
            </button>
            <a
              href={`tel:${clinicConfig.contact.primaryPhone}`}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium text-slate-800 bg-mist-100 border border-mist-200"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Call {clinicConfig.contact.primaryPhoneFormatted}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
