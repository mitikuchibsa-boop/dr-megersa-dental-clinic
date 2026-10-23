"use client";

import React from "react";
import Link from "next/link";
import { clinicConfig } from "@/config/clinic";
import { Lock, MapPin, Phone, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-100 pt-14 pb-20 md:pb-14 border-t border-charcoal-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-charcoal-800">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="font-editorial text-2xl font-bold tracking-tight text-white">
              {clinicConfig.name}
            </h3>
            <p className="text-sm text-sand-300 italic font-serif">
              Your dental care starts with a conversation.
            </p>
            <p className="text-xs text-charcoal-500 max-w-sm leading-relaxed pt-1">
              {clinicConfig.doctorName} · {clinicConfig.doctorTitle}. Providing attentive, individualized dental care in Adama, Ethiopia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-burgundy-500">
              Quick Links
            </p>
            <ul className="space-y-2 text-xs text-sand-300">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#clinic" className="hover:text-white transition-colors">
                  Our Clinic & Reception
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Dental Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Patient Inquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Social */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-burgundy-500">
              Contact & Social
            </p>
            <ul className="space-y-2 text-xs text-sand-300">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-sand-400 shrink-0" />
                <a href={`tel:${clinicConfig.contact.primaryPhone}`} className="hover:text-white">
                  {clinicConfig.contact.primaryPhoneFormatted}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-sand-400 shrink-0" />
                <a
                  href={clinicConfig.contact.maps.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center space-x-1"
                >
                  <span>Google Maps Location</span>
                  <ExternalLink className="w-3 h-3 text-sand-400" />
                </a>
              </li>
              <li className="pt-2 flex items-center space-x-4">
                <a
                  href={clinicConfig.contact.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TikTok
                </a>
                <span className="text-charcoal-700">•</span>
                <a
                  href={clinicConfig.contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Prototype Notice & Admin Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 gap-4">
          <div>
            <p>© {new Date().getFullYear()} {clinicConfig.name}. All rights reserved.</p>
            {clinicConfig.presentationMode.isPrototypeNoticeVisible && (
              <p className="mt-1 text-[11px] text-amber-400/80">
                {clinicConfig.presentationMode.noticeText}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin"
              className="inline-flex items-center space-x-1 text-charcoal-400 hover:text-sand-200 transition-colors py-1 px-2.5 rounded bg-charcoal-800/60 border border-charcoal-700/50"
            >
              <Lock className="w-3 h-3" />
              <span>Clinic CRM & Admin</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
