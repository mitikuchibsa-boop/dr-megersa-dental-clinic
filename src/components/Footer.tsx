"use client";

import React from "react";
import Link from "next/link";
import { clinicConfig } from "@/config/clinic";
import { Lock, MapPin, Phone, ExternalLink, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-mist-100 pt-16 pb-20 md:pb-14 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-mint-400/20 border border-mint-400/40 flex items-center justify-center text-mint-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
                {clinicConfig.name}
              </h3>
            </div>

            <p className="text-sm text-mint-200/80 italic font-serif">
              Your dental care starts with a conversation.
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed pt-1">
              {clinicConfig.doctorName} · {clinicConfig.doctorTitle}. Providing attentive, individualized dental care in Adama, Ethiopia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-mint-300">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#home" className="hover:text-mint-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#clinic" className="hover:text-mint-300 transition-colors">
                  Our Clinic
                </a>
              </li>
              <li>
                <a href="#doctor" className="hover:text-mint-300 transition-colors">
                  Doctor Profile
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-mint-300 transition-colors">
                  Dental Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-mint-300 transition-colors">
                  Clinic Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-mint-300 transition-colors">
                  Patient Inquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-mint-300">
              Contact & Social
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-mint-300 shrink-0" />
                <a href={`tel:${clinicConfig.contact.primaryPhone}`} className="hover:text-white">
                  {clinicConfig.contact.primaryPhoneFormatted}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-mint-300 shrink-0" />
                <a
                  href={clinicConfig.contact.maps.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center space-x-1"
                >
                  <span>Google Maps Adama</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li className="pt-2 flex items-center space-x-4">
                <a
                  href={clinicConfig.contact.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mint-300 transition-colors"
                >
                  TikTok
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={clinicConfig.contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mint-300 transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Prototype Showcase Notice & Admin Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            <p>© {new Date().getFullYear()} {clinicConfig.name}. All rights reserved.</p>
            {clinicConfig.presentationMode.isPrototypeNoticeVisible && (
              <p className="mt-1 text-[11px] text-cyan-300/80">
                {clinicConfig.presentationMode.noticeText}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin"
              className="inline-flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-slate-800 border border-slate-700/80 shadow-subtle"
            >
              <Lock className="w-3.5 h-3.5 text-mint-300" />
              <span>Showcase CRM / Admin</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
