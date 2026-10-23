"use client";

import React from "react";
import { clinicConfig } from "@/config/clinic";
import { Phone, MessageCircle } from "lucide-react";

export function MobileBottomBar() {
  const primaryNumber = clinicConfig.contact.primaryPhone;
  const waNumber = primaryNumber.replace(/[^0-9]/g, "");

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-mist-200 p-2.5 px-4 shadow-floating">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        
        {/* Direct Phone Call */}
        <a
          href={`tel:${primaryNumber}`}
          className="flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-sm font-semibold text-slate-900 bg-mist-100 hover:bg-mist-200 border border-mist-300 active:scale-95 transition-all min-h-[48px]"
        >
          <Phone className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Call Clinic</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary-glow flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-sm font-semibold rounded-xl active:scale-95 transition-all shadow-subtle min-h-[48px]"
        >
          <MessageCircle className="w-4 h-4 text-mint-300 shrink-0" />
          <span>WhatsApp Chat</span>
        </a>

      </div>
    </div>
  );
}
