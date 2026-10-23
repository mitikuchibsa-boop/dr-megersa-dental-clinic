/**
 * Central Clinic Configuration
 * 
 * All business details, contact information, services, and presentation settings
 * are stored here so they can be reviewed and edited in one place without searching
 * through the codebase.
 */

export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  isVerifiedByClinic: boolean; // Flag marking if service is verified vs suggested prototype
}

export interface ClinicConfig {
  name: string;
  doctorName: string;
  doctorTitle: string;
  brandPhrases: {
    afaanOromo: string;
    amharic: string;
  };
  contact: {
    primaryPhone: string;
    primaryPhoneFormatted: string;
    allPhones: {
      number: string;
      formatted: string;
      supportsWhatsApp: boolean;
    }[];
    email: string;
    address: {
      text: string;
      city: string;
      country: string;
      isVerifiedByClinic: boolean; // Flag to confirm prior to official launch
      confirmationNote: string;
    };
    maps: {
      shareUrl: string;
      embedUrl: string;
    };
    social: {
      tiktok: string;
      facebook: string;
      domain: string;
    };
  };
  services: ServiceItem[];
  presentationMode: {
    isPrototypeNoticeVisible: boolean;
    noticeText: string;
  };
}

export const clinicConfig: ClinicConfig = {
  name: "Dr Megersa Dental Clinic",
  doctorName: "Dr Megersa",
  doctorTitle: "Doctor of Dental Surgery",
  brandPhrases: {
    afaanOromo: "Hakiima Ilkaan Keessanii",
    amharic: "የ ጥርስዎ ሀኪም",
  },
  contact: {
    primaryPhone: "+251921489071",
    primaryPhoneFormatted: "0921 48 90 71",
    allPhones: [
      {
        number: "+251921489071",
        formatted: "0921 48 90 71",
        supportsWhatsApp: true,
      },
      {
        number: "+251922650000",
        formatted: "0922 65 00 00",
        supportsWhatsApp: false,
      },
      {
        number: "+251922120000",
        formatted: "0922 12 00 00",
        supportsWhatsApp: false,
      },
      {
        number: "+251922640000",
        formatted: "0922 64 00 00",
        supportsWhatsApp: false,
      },
    ],
    email: "babila875@gmail.com",
    address: {
      text: "Nafran Mall, 3rd Floor, near Post Office & Karamara Hotel",
      city: "Adama",
      country: "Ethiopia",
      isVerifiedByClinic: false,
      confirmationNote: "Address listed from public records. Please verify before official clinic launch.",
    },
    maps: {
      shareUrl: "https://maps.app.goo.gl/dFANPMC8Z6gv4NZd9",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d445516.84505504!2d38.630530153513995!3d8.821072174800042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b4e9c445e3e1af%3A0x9e924ee6b0144a1b!2sDr%20Megersa%20Dental%20Clinic!5e1!3m2!1sen!2set!4v1792781500130!5m2!1sen!2set",
    },
    social: {
      tiktok: "https://www.tiktok.com/@dr_megersadentalclinic",
      facebook: "https://web.facebook.com/profile.php?id=100063796840993",
      domain: "https://calcalliifayyaa.com",
    },
  },
  services: [
    {
      id: "checkup",
      name: "Dental Check-up",
      shortDescription: "A thorough examination of your teeth, gums, and oral health to identify any concerns early.",
      isVerifiedByClinic: false,
    },
    {
      id: "cleaning",
      name: "Teeth Cleaning",
      shortDescription: "Professional cleaning to remove plaque, tartar, and surface stains for fresh, healthy teeth.",
      isVerifiedByClinic: false,
    },
    {
      id: "filling",
      name: "Tooth Filling",
      shortDescription: "Restoring decayed or broken teeth using durable, natural-looking filling materials.",
      isVerifiedByClinic: false,
    },
    {
      id: "root-canal",
      name: "Root Canal Treatment",
      shortDescription: "Gentle treatment to save an infected or damaged tooth and relieve discomfort.",
      isVerifiedByClinic: false,
    },
    {
      id: "replacement",
      name: "Tooth Replacement",
      shortDescription: "Options to replace missing teeth and restore your bite, comfort, and smile.",
      isVerifiedByClinic: false,
    },
    {
      id: "alignment",
      name: "Braces & Teeth Alignment",
      shortDescription: "Orthodontic consultation to gently straighten teeth and improve bite alignment.",
      isVerifiedByClinic: false,
    },
  ],
  presentationMode: {
    isPrototypeNoticeVisible: true,
    noticeText: "Prototype website preview prepared for Dr Megersa Dental Clinic. Content marked for clinic confirmation before official launch.",
  },
};
