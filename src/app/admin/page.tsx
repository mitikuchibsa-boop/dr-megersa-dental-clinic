"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { clinicConfig } from "@/config/clinic";
import {
  Lock,
  KeyRound,
  LogOut,
  Phone,
  MessageCircle,
  Calendar,
  User,
  Clock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Send,
  X,
  ShieldCheck,
} from "lucide-react";

interface Lead {
  id: string;
  fullName: string;
  phone: string;
  telegramUsername: string | null;
  service: string;
  preferredDate: string | null;
  createdAt: string;
  status: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Leads list
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsError, setLeadsError] = useState<string | null>(null);

  // Selected lead modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Change password modal/view
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<string | null>(null);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);

  // Check initial authentication
  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check-auth");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchLeads();
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchLeads = async () => {
    setLeadsLoading(true);
    setLeadsError(null);
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          return;
        }
        throw new Error("Failed to load leads");
      }
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err: any) {
      setLeadsError(err.message || "Failed to load leads list");
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      setIsAuthenticated(true);
      setPassword("");
      fetchLeads();
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
      setLeads([]);
      setSelectedLead(null);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError(null);
    setPasswordChangeSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordChangeError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordChangeError("New password must be at least 8 characters long.");
      return;
    }

    setPasswordChangeLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      setPasswordChangeSuccess("Password updated successfully! Please keep it secure.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordChangeError(err.message || "Error changing password");
    } finally {
      setPasswordChangeLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  // Loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="flex items-center space-x-3 text-charcoal-700">
          <RefreshCw className="w-5 h-5 animate-spin text-burgundy-700" />
          <span className="text-sm font-medium">Checking admin session...</span>
        </div>
      </div>
    );
  }

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cream-100/80">
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
          
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-charcoal-600 hover:text-burgundy-700 mb-6 bg-sand-200/60 px-3 py-1.5 rounded-full transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Clinic Website</span>
            </Link>

            <div className="mx-auto w-12 h-12 rounded-full bg-burgundy-50 border border-burgundy-100 flex items-center justify-center text-burgundy-700 mb-3 shadow-subtle">
              <Lock className="w-6 h-6" />
            </div>

            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal-900">
              Clinic Administration
            </h1>
            <p className="text-xs text-charcoal-600 mt-1">
              {clinicConfig.name} · Simple CRM
            </p>
          </div>

          <div className="bg-cream-50 py-8 px-6 sm:px-10 rounded-2xl border border-sand-300 shadow-card">
            
            {loginError && (
              <div className="mb-6 p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-2"
                >
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter clinic admin password"
                    className="w-full pl-4 pr-10 py-3 rounded-lg bg-cream-50 border border-sand-300 text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-charcoal-400 hover:text-charcoal-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 disabled:bg-burgundy-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-600 transition-colors"
              >
                {loginLoading ? "Authenticating..." : "Sign In to Lead Manager"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-sand-200 text-center">
              <p className="text-[11px] text-charcoal-500">
                Initial password set via <code className="font-mono bg-sand-200/60 px-1 py-0.5 rounded text-charcoal-700">ADMIN_INITIAL_PASSWORD</code>.
                Change your password inside after first login.
              </p>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-cream-100/60 flex flex-col">
      
      {/* Top Admin Navbar */}
      <nav className="bg-cream-50 border-b border-sand-300 sticky top-0 z-30 shadow-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="text-charcoal-600 hover:text-burgundy-700 p-1.5 rounded hover:bg-sand-100 transition-colors"
              title="View Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="font-editorial text-lg font-bold text-charcoal-900 block leading-tight">
                {clinicConfig.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-burgundy-800 font-semibold">
                Patient Leads & CRM
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => {
                setShowPasswordModal(true);
                setPasswordChangeSuccess(null);
                setPasswordChangeError(null);
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-charcoal-700 bg-sand-100 hover:bg-sand-200 border border-sand-300 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-burgundy-700" />
              <span className="hidden sm:inline">Change Password</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Admin Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal-900">
              Patient Inquiries ({leads.length})
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Real patient inquiries saved from the website. Click any row to view complete details.
            </p>
          </div>

          <button
            onClick={fetchLeads}
            disabled={leadsLoading}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-charcoal-800 bg-cream-50 hover:bg-sand-100 border border-sand-300 shadow-subtle transition-colors shrink-0 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-burgundy-700 ${leadsLoading ? "animate-spin" : ""}`} />
            <span>Refresh Leads</span>
          </button>
        </div>

        {/* Error Notification */}
        {leadsError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-sm flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{leadsError}</span>
          </div>
        )}

        {/* Leads Table / Cards */}
        {leadsLoading && leads.length === 0 ? (
          <div className="bg-cream-50 rounded-2xl border border-sand-300 p-12 text-center shadow-subtle">
            <RefreshCw className="w-6 h-6 animate-spin text-burgundy-700 mx-auto mb-3" />
            <p className="text-sm font-medium text-charcoal-700">Loading inquiries from persistent database...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-cream-50 rounded-2xl border border-sand-300 p-12 text-center shadow-subtle">
            <div className="w-12 h-12 rounded-full bg-sand-100 border border-sand-200 flex items-center justify-center text-charcoal-500 mx-auto mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-charcoal-900 mb-1">
              No inquiries yet
            </h3>
            <p className="text-xs text-charcoal-600 max-w-sm mx-auto mb-6">
              When visitors submit the inquiry form on the website, their details will appear here immediately.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 transition-colors"
            >
              <span>Test Inquiry Form on Website</span>
            </Link>
          </div>
        ) : (
          <div className="bg-cream-50 rounded-2xl border border-sand-300 shadow-card overflow-hidden">
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sand-100/70 border-b border-sand-200 text-[11px] font-semibold text-charcoal-600 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Patient Name</th>
                    <th className="py-3.5 px-6">Phone Number</th>
                    <th className="py-3.5 px-6">Requested Service</th>
                    <th className="py-3.5 px-6">Preferred Date</th>
                    <th className="py-3.5 px-6">Received</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200 text-sm">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-sand-100/50 cursor-pointer transition-colors group"
                    >
                      <td className="py-4 px-6 font-semibold text-charcoal-900">
                        {lead.fullName}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-charcoal-800">
                        {lead.phone}
                      </td>
                      <td className="py-4 px-6 text-charcoal-700">
                        <span className="inline-block px-2.5 py-1 rounded bg-sand-100 text-charcoal-800 text-xs font-medium border border-sand-200">
                          {lead.service}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-charcoal-600">
                        {lead.preferredDate ? (
                          <span className="inline-flex items-center space-x-1 text-charcoal-800">
                            <Calendar className="w-3.5 h-3.5 text-burgundy-700" />
                            <span>{lead.preferredDate}</span>
                          </span>
                        ) : (
                          <span className="text-charcoal-400 italic">None requested</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-xs text-charcoal-500">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="text-xs font-semibold text-burgundy-700 group-hover:underline px-2 py-1"
                        >
                          View Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-sand-200">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="p-5 hover:bg-sand-100/40 transition-colors active:bg-sand-200/50 cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-base text-charcoal-900">
                        {lead.fullName}
                      </h3>
                      <p className="text-xs font-mono text-charcoal-600 mt-0.5">
                        {lead.phone}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium text-charcoal-500 bg-sand-100 px-2 py-0.5 rounded border border-sand-200">
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-sand-100 text-charcoal-800 px-2.5 py-1 rounded border border-sand-200 font-medium">
                      {lead.service}
                    </span>
                    {lead.preferredDate && (
                      <span className="bg-cream-50 text-charcoal-700 px-2 py-1 rounded border border-sand-200 flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-burgundy-700" />
                        <span>{lead.preferredDate}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-cream-50 rounded-2xl border border-sand-300 shadow-dropdown max-w-lg w-full p-6 sm:p-8 overflow-hidden relative animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-sand-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-burgundy-50 border border-burgundy-100 flex items-center justify-center text-burgundy-700">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-charcoal-900">
                    Patient Inquiry Details
                  </h3>
                  <p className="text-[11px] text-charcoal-500">
                    ID: {selectedLead.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-charcoal-500 hover:text-charcoal-800 hover:bg-sand-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4 text-sm">
              
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500 block mb-1">
                  Full Name
                </span>
                <p className="text-base font-bold text-charcoal-900">
                  {selectedLead.fullName}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500 block mb-1">
                  Phone Number
                </span>
                <div className="flex items-center space-x-3">
                  <span className="text-base font-mono font-medium text-charcoal-900">
                    {selectedLead.phone}
                  </span>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 px-3 py-1.5 rounded transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Patient</span>
                  </a>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {selectedLead.telegramUsername && (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500 block mb-1">
                    Telegram Username
                  </span>
                  <a
                    href={`https://t.me/${selectedLead.telegramUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-burgundy-700 font-mono hover:underline inline-flex items-center space-x-1"
                  >
                    <span>@{selectedLead.telegramUsername}</span>
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500 block mb-1">
                  Requested Service / Reason
                </span>
                <p className="text-sm font-medium text-charcoal-800 bg-sand-100 p-3 rounded-lg border border-sand-200">
                  {selectedLead.service}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500 block mb-1">
                  Preferred Contact / Visit Date
                </span>
                <p className="text-sm text-charcoal-800">
                  {selectedLead.preferredDate ? (
                    <span className="font-medium text-charcoal-900">
                      {selectedLead.preferredDate} (Requested date, not yet confirmed)
                    </span>
                  ) : (
                    <span className="text-charcoal-500 italic">No specific date requested</span>
                  )}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500 block mb-1">
                  Submission Timestamp
                </span>
                <p className="text-xs text-charcoal-600 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-sand-400" />
                  <span>{formatDate(selectedLead.createdAt)} (UTC: {selectedLead.createdAt})</span>
                </p>
              </div>

            </div>

            <div className="pt-4 border-t border-sand-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-charcoal-700 bg-sand-100 hover:bg-sand-200 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-cream-50 rounded-2xl border border-sand-300 shadow-dropdown max-w-md w-full p-6 sm:p-8 relative animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-sand-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-burgundy-50 border border-burgundy-100 flex items-center justify-center text-burgundy-700">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-lg font-bold text-charcoal-900">
                  Change Admin Password
                </h3>
              </div>

              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1.5 rounded-lg text-charcoal-500 hover:text-charcoal-800 hover:bg-sand-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passwordChangeSuccess && (
              <div className="my-4 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{passwordChangeSuccess}</span>
              </div>
            )}

            {passwordChangeError && (
              <div className="my-4 p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{passwordChangeError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-cream-50 border border-sand-300 text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                  New Password (min 8 chars)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-cream-50 border border-sand-300 text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-cream-50 border border-sand-300 text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-charcoal-700 bg-sand-100 hover:bg-sand-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordChangeLoading}
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-burgundy-700 hover:bg-burgundy-800 disabled:bg-burgundy-500 transition-colors"
                >
                  {passwordChangeLoading ? "Updating..." : "Save New Password"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
