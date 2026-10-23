"use client";

import React, { useState } from "react";
import Link from "next/link";
import { clinicConfig } from "@/config/clinic";
import { Phone, Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#clinic", label: "Our Clinic" },
    { href: "#services", label: "Services" },
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
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-sand-200 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo / Text */}
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="flex flex-col group"
        >
          <span className="font-editorial text-xl sm:text-2xl font-semibold tracking-tight text-charcoal-900 group-hover:text-burgundy-700 transition-colors">
            {clinicConfig.name}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-charcoal-500 font-medium -mt-0.5">
            Adama, Ethiopia · {clinicConfig.doctorTitle}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-charcoal-700 hover:text-burgundy-700 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}

          {/* Quick Call Button */}
          <a
            href={`tel:${clinicConfig.contact.primaryPhone}`}
            className="flex items-center space-x-2 text-xs font-semibold text-charcoal-700 hover:text-burgundy-700 bg-sand-100 hover:bg-sand-200 px-3.5 py-2.5 rounded-full border border-sand-300 transition-all"
            title="Call Clinic"
          >
            <Phone className="w-3.5 h-3.5 text-burgundy-700" />
            <span>{clinicConfig.contact.primaryPhoneFormatted}</span>
          </a>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick("#contact")}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-burgundy-700 hover:bg-burgundy-800 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-burgundy-600 focus:ring-offset-2"
          >
            Contact Us
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <a
            href={`tel:${clinicConfig.contact.primaryPhone}`}
            className="p-2.5 rounded-full text-burgundy-700 bg-burgundy-50 border border-burgundy-100 focus:outline-none focus:ring-2 focus:ring-burgundy-600"
            aria-label="Call clinic directly"
          >
            <Phone className="w-5 h-5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-md text-charcoal-700 hover:text-charcoal-900 hover:bg-sand-100 focus:outline-none focus:ring-2 focus:ring-burgundy-600"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-sand-200 bg-cream-50 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-dropdown">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block px-3 py-3 rounded-md text-base font-medium text-charcoal-800 hover:bg-sand-100 hover:text-burgundy-700 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-sand-200 flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick("#contact")}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-md text-sm font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 shadow-sm transition-colors"
            >
              Contact Us
            </button>
            <a
              href={`tel:${clinicConfig.contact.primaryPhone}`}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium text-charcoal-800 bg-sand-100 border border-sand-200"
            >
              <Phone className="w-4 h-4 text-burgundy-700" />
              <span>Call {clinicConfig.contact.primaryPhoneFormatted}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
