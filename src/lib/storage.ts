/**
 * Showcase Demo Inquiry Storage (Browser LocalStorage)
 *
 * For zero-database showcase deployments on Vercel.
 * Strictly enforces a 10-inquiry maximum and prevents fake persistence claims.
 */

export interface DemoInquiry {
  id: string;
  fullName: string;
  phone: string;
  telegramUsername: string | null;
  service: string;
  preferredDate: string | null;
  createdAt: string;
  isDemoSample?: boolean;
}

const STORAGE_KEY = "drmegersa_demo_inquiries_v2";
export const MAX_DEMO_INQUIRIES = 10;

// Default initial sample inquiries so demo has immediate visual data
const DEFAULT_SAMPLE_INQUIRIES: DemoInquiry[] = [
  {
    id: "demo_init_01",
    fullName: "Chaltu Dibaba",
    phone: "+251921489071",
    telegramUsername: "chaltu_d",
    service: "Teeth Cleaning",
    preferredDate: "2026-11-05",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    isDemoSample: true,
  },
  {
    id: "demo_init_02",
    fullName: "Abebe Kebede",
    phone: "+251911223344",
    telegramUsername: null,
    service: "Dental Check-up",
    preferredDate: null,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    isDemoSample: true,
  },
];

export function getStoredInquiries(): DemoInquiry[] {
  if (typeof window === "undefined") {
    return DEFAULT_SAMPLE_INQUIRIES;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial sample inquiries
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_INQUIRIES));
      return DEFAULT_SAMPLE_INQUIRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error reading localStorage inquiries:", e);
    return [];
  }
}

export function saveStoredInquiry(data: {
  fullName: string;
  phone: string;
  telegramUsername?: string | null;
  service: string;
  preferredDate?: string | null;
}): { success: boolean; inquiry?: DemoInquiry; error?: string; limitReached?: boolean } {
  if (typeof window === "undefined") {
    return { success: false, error: "Storage unavailable in server environment." };
  }

  try {
    const current = getStoredInquiries();

    // Check limit
    if (current.length >= MAX_DEMO_INQUIRIES) {
      return {
        success: false,
        limitReached: true,
        error: `Demo showcase limit reached (${MAX_DEMO_INQUIRIES}/${MAX_DEMO_INQUIRIES} inquiries stored). Please manage or clear inquiries in the Demo Admin area.`,
      };
    }

    const newInquiry: DemoInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      fullName: data.fullName,
      phone: data.phone,
      telegramUsername: data.telegramUsername || null,
      service: data.service,
      preferredDate: data.preferredDate || null,
      createdAt: new Date().toISOString(),
      isDemoSample: false,
    };

    const updated = [newInquiry, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return {
      success: true,
      inquiry: newInquiry,
    };
  } catch (e: any) {
    return { success: false, error: e.message || "Failed to save inquiry to local storage." };
  }
}

export function deleteStoredInquiry(id: string): DemoInquiry[] {
  if (typeof window === "undefined") return [];
  const current = getStoredInquiries();
  const updated = current.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function resetStoredInquiries(): DemoInquiry[] {
  if (typeof window === "undefined") return [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_INQUIRIES));
  return DEFAULT_SAMPLE_INQUIRIES;
}

export function clearAllStoredInquiries(): DemoInquiry[] {
  if (typeof window === "undefined") return [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
}
