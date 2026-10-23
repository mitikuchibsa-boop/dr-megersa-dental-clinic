"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ClinicIntro } from "@/components/ClinicIntro";
import { DoctorIntro } from "@/components/DoctorIntro";
import { ServicesSection } from "@/components/ServicesSection";
import { PatientExperience } from "@/components/PatientExperience";
import { GallerySection } from "@/components/GallerySection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { MobileBottomBar } from "@/components/MobileBottomBar";

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToSection("contact");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-mint-200 selection:text-slate-900">
      
      {/* 1. Elegant floating navigation */}
      <Header />

      <main className="flex-1">
        {/* 2. Visually striking hero */}
        <Hero
          onContactClick={() => scrollToSection("contact")}
          onExploreClick={() => scrollToSection("services")}
        />

        {/* 3. Compact trust/identity strip (Afaan Oromo & Amharic brand phrases) */}
        <TrustStrip />

        {/* 4. Clinic introduction (Real reception photograph) */}
        <ClinicIntro onContactClick={() => scrollToSection("contact")} />

        {/* 5. Doctor profile (Dr Megersa actual photograph) */}
        <DoctorIntro onContactClick={() => scrollToSection("contact")} />

        {/* 6. Dental services responsive grid */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 7. Patient inquiry call-to-action */}
        <PatientExperience onContactClick={() => scrollToSection("contact")} />

        {/* 8. Editorial-style gallery (Three real clinic photos) */}
        <GallerySection />

        {/* 9. Clean, well-designed FAQs */}
        <FaqSection />

        {/* 10. Contact section with inquiry form, phones, email, social & map */}
        <ContactSection selectedService={selectedService} />
      </main>

      {/* 11. Refined footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileBottomBar />

    </div>
  );
}
