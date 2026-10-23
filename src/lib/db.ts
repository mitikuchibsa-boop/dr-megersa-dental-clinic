import { createClient, Client } from "@libsql/client";
import bcrypt from "bcryptjs";

let clientInstance: Client | null = null;
let tablesInitialized = false;

export function getDbClient(): Client {
  if (clientInstance) {
    return clientInstance;
  }

  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

  if (tursoUrl && tursoAuthToken) {
    clientInstance = createClient({
      url: tursoUrl,
      authToken: tursoAuthToken,
    });
  } else {
    // Local SQLite database file
    clientInstance = createClient({
      url: "file:leads.db",
    });
  }

  return clientInstance;
}

export async function initDb(): Promise<void> {
  if (tablesInitialized) return;

  const db = getDbClient();

  // Create leads table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      telegram_username TEXT,
      service TEXT NOT NULL,
      preferred_date TEXT,
      created_at TEXT NOT NULL,
      status TEXT DEFAULT 'new'
    )
  `);

  // Create settings / admin state table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS admin_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  // Ensure initial admin password hash is seeded if not present
  const adminCheck = await db.execute({
    sql: "SELECT value FROM admin_settings WHERE key = ?",
    args: ["admin_password_hash"],
  });

  if (adminCheck.rows.length === 0) {
    const initialPlainPassword = process.env.ADMIN_INITIAL_PASSWORD || "MegersaDental2026!Adama";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(initialPlainPassword, salt);
    await db.execute({
      sql: "INSERT INTO admin_settings (key, value, updated_at) VALUES (?, ?, ?)",
      args: ["admin_password_hash", hash, new Date().toISOString()],
    });
  }

  tablesInitialized = true;
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  telegramUsername: string | null;
  service: string;
  preferredDate: string | null;
  createdAt: string;
  status: string;
}

export async function getLeads(): Promise<Lead[]> {
  await initDb();
  const db = getDbClient();

  const result = await db.execute(
    "SELECT id, full_name, phone, telegram_username, service, preferred_date, created_at, status FROM leads ORDER BY datetime(created_at) DESC"
  );

  return result.rows.map((row) => ({
    id: String(row.id),
    fullName: String(row.full_name),
    phone: String(row.phone),
    telegramUsername: row.telegram_username ? String(row.telegram_username) : null,
    service: String(row.service),
    preferredDate: row.preferred_date ? String(row.preferred_date) : null,
    createdAt: String(row.created_at),
    status: String(row.status || "new"),
  }));
}

export async function createLead(data: {
  fullName: string;
  phone: string;
  telegramUsername?: string | null;
  service: string;
  preferredDate?: string | null;
}): Promise<Lead> {
  await initDb();
  const db = getDbClient();

  // Basic deduplication check within 30 seconds for identical name + phone + service
  const thirtySecAgo = new Date(Date.now() - 30 * 1000).toISOString();
  const duplicateCheck = await db.execute({
    sql: `SELECT id FROM leads WHERE full_name = ? AND phone = ? AND service = ? AND created_at > ? LIMIT 1`,
    args: [data.fullName, data.phone, data.service, thirtySecAgo],
  });

  if (duplicateCheck.rows.length > 0) {
    const existing = duplicateCheck.rows[0];
    const existingLead = await db.execute({
      sql: "SELECT id, full_name, phone, telegram_username, service, preferred_date, created_at, status FROM leads WHERE id = ?",
      args: [existing.id],
    });
    const row = existingLead.rows[0];
    return {
      id: String(row.id),
      fullName: String(row.full_name),
      phone: String(row.phone),
      telegramUsername: row.telegram_username ? String(row.telegram_username) : null,
      service: String(row.service),
      preferredDate: row.preferred_date ? String(row.preferred_date) : null,
      createdAt: String(row.created_at),
      status: String(row.status || "new"),
    };
  }

  const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const createdAt = new Date().toISOString();

  await db.execute({
    sql: `
      INSERT INTO leads (id, full_name, phone, telegram_username, service, preferred_date, created_at, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'new')
    `,
    args: [
      id,
      data.fullName,
      data.phone,
      data.telegramUsername || null,
      data.service,
      data.preferredDate || null,
      createdAt,
    ],
  });

  return {
    id,
    fullName: data.fullName,
    phone: data.phone,
    telegramUsername: data.telegramUsername || null,
    service: data.service,
    preferredDate: data.preferredDate || null,
    createdAt,
    status: "new",
  };
}

export async function getAdminPasswordHash(): Promise<string> {
  await initDb();
  const db = getDbClient();

  const res = await db.execute({
    sql: "SELECT value FROM admin_settings WHERE key = ?",
    args: ["admin_password_hash"],
  });

  if (res.rows.length === 0) {
    throw new Error("Admin password not initialized");
  }

  return String(res.rows[0].value);
}

export async function setAdminPasswordHash(newHash: string): Promise<void> {
  await initDb();
  const db = getDbClient();

  await db.execute({
    sql: "INSERT OR REPLACE INTO admin_settings (key, value, updated_at) VALUES (?, ?, ?)",
    args: ["admin_password_hash", newHash, new Date().toISOString()],
  });
}
