import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr Megersa Dental Clinic · Adama, Ethiopia",
  description:
    "Dr Megersa Dental Clinic (Doctor of Dental Surgery) in Adama, Ethiopia. Dedicated to understanding your dental needs with comfortable, personalized care.",
  keywords: [
    "Dr Megersa Dental Clinic",
    "Dentist Adama",
    "Dental Clinic Ethiopia",
    "Hakiima Ilkaan Keessanii",
    "የ ጥርስዎ ሀኪም",
    "Adama Dental",
    "Nafran Mall Dentist",
  ],
  authors: [{ name: "Dr Megersa Dental Clinic" }],
  openGraph: {
    title: "Dr Megersa Dental Clinic · Adama, Ethiopia",
    description: "A healthy smile starts with the right care. Learn about our dental services in Adama.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-cream-50 text-charcoal-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
