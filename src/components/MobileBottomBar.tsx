"use client";

import React from "react";
import { clinicConfig } from "@/config/clinic";
import { Phone, MessageCircle } from "lucide-react";

export function MobileBottomBar() {
  const primaryNumber = clinicConfig.contact.primaryPhone;
  const waNumber = primaryNumber.replace(/[^0-9]/g, "");

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-cream-50/95 backdrop-blur-md border-t border-sand-300 p-2.5 px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        
        {/* Direct Phone Call */}
        <a
          href={`tel:${primaryNumber}`}
          className="flex items-center justify-center space-x-2 py-3 px-3 rounded-lg text-sm font-semibold text-charcoal-900 bg-sand-100 hover:bg-sand-200 border border-sand-300 active:scale-95 transition-all min-h-[48px]"
        >
          <Phone className="w-4 h-4 text-burgundy-700 shrink-0" />
          <span>Call Clinic</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 py-3 px-3 rounded-lg text-sm font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 active:scale-95 transition-all shadow-sm min-h-[48px]"
        >
          <MessageCircle className="w-4 h-4 text-white shrink-0" />
          <span>Inquire via WhatsApp</span>
        </a>

      </div>
    </div>
  );
}
