"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
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
    <div className="min-h-screen flex flex-col bg-cream-50 text-charcoal-900 selection:bg-burgundy-100 selection:text-burgundy-900">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onContactClick={() => scrollToSection("contact")}
          onExploreClick={() => scrollToSection("services")}
        />

        {/* Clinic Introduction (Reception image) */}
        <ClinicIntro onContactClick={() => scrollToSection("contact")} />

        {/* Doctor Introduction (Dr Megersa portrait) */}
        <DoctorIntro onContactClick={() => scrollToSection("contact")} />

        {/* Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Patient Experience Guidance */}
        <PatientExperience onContactClick={() => scrollToSection("contact")} />

        {/* Gallery / Clinic Work (Reception, Doctor, Treatment) */}
        <GallerySection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact & Real Inquiry Form */}
        <ContactSection selectedService={selectedService} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <MobileBottomBar />
    </div>
  );
}
