"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { clinicConfig } from "@/config/clinic";
import {
  getStoredInquiries,
  deleteStoredInquiry,
  clearAllStoredInquiries,
  resetStoredInquiries,
  DemoInquiry,
  MAX_DEMO_INQUIRIES,
} from "@/lib/storage";
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
  Trash2,
  Info,
  Sparkles,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showRecoveryHelp, setShowRecoveryHelp] = useState(false);

  // Inquiries from browser storage
  const [inquiries, setInquiries] = useState<DemoInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<DemoInquiry | null>(null);

  // Change password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<string | null>(null);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
    loadInquiries();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check-auth");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const loadInquiries = () => {
    const list = getStoredInquiries();
    setInquiries(list);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      setIsAuthenticated(true);
      setPassword("");
      loadInquiries();
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
      setSelectedInquiry(null);
    }
  };

  const handleDeleteInquiry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteStoredInquiry(id);
    setInquiries(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all stored demo inquiries?")) {
      const updated = clearAllStoredInquiries();
      setInquiries(updated);
      setSelectedInquiry(null);
    }
  };

  const handleResetSamples = () => {
    const updated = resetStoredInquiries();
    setInquiries(updated);
    setSelectedInquiry(null);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError(null);
    setPasswordChangeSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordChangeError("New password and confirmation do not match.");
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
        throw new Error(data.error || "Failed to update password");
      }

      setPasswordChangeSuccess("Password updated successfully.");
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

  // Auth checking loading indicator
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mist-50">
        <div className="flex items-center space-x-3 text-slate-700">
          <RefreshCw className="w-5 h-5 animate-spin text-teal-600" />
          <span className="text-sm font-medium">Verifying admin session...</span>
        </div>
      </div>
    );
  }

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-mist-50/80 relative">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700 mb-6 bg-white px-3.5 py-1.5 rounded-full border border-mist-300 shadow-subtle transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Clinic Website</span>
            </Link>

            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-100 to-mint-100 border border-mint-300 flex items-center justify-center text-teal-700 mb-3 shadow-subtle">
              <Lock className="w-6 h-6" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Clinic Showcase CRM
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {clinicConfig.name} · Showcase Administration
            </p>
          </div>

          <div className="glass-panel py-8 px-6 sm:px-10 rounded-3xl border border-white/90 shadow-floating">
            
            {loginError && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Admin Password or Recovery Key
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password or recovery key"
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-mist-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-subtle"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="btn-primary-glow w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
              >
                {loginLoading ? "Verifying..." : "Sign In to Showcase Admin"}
              </button>
            </form>

            {/* Documented Password & Recovery Help Accordion */}
            <div className="mt-6 pt-5 border-t border-mist-200">
              <button
                type="button"
                onClick={() => setShowRecoveryHelp(!showRecoveryHelp)}
                className="w-full flex items-center justify-between text-left text-xs font-semibold text-teal-700 hover:text-teal-800 focus:outline-none"
              >
                <span className="flex items-center space-x-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                  <span>Documented Login & Recovery Help</span>
                </span>
                <span>{showRecoveryHelp ? "Hide" : "Show"}</span>
              </button>

              {showRecoveryHelp && (
                <div className="mt-3 p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-200 text-xs text-slate-700 space-y-2 animate-in fade-in">
                  <p className="font-semibold text-slate-900">Documented Credentials:</p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
                    <li>
                      <span className="font-medium text-slate-800">Initial Password:</span>{" "}
                      <code className="bg-white px-1 py-0.5 rounded border border-cyan-200 font-mono text-teal-700">
                        MegersaDental2026!Adama
                      </code>
                    </li>
                    <li>
                      <span className="font-medium text-slate-800">Emergency Recovery Key:</span>{" "}
                      <code className="bg-white px-1 py-0.5 rounded border border-cyan-200 font-mono text-teal-700">
                        MegersaRecovery2026!Adama
                      </code>
                    </li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-1">
                    Entering either credential above will authenticate access immediately without requiring server redeployment.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-mist-50/60 flex flex-col">
      
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-mist-200 sticky top-0 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="text-slate-600 hover:text-teal-700 p-1.5 rounded-lg hover:bg-mist-100 transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="font-serif text-base sm:text-lg font-bold text-slate-900 block leading-tight">
                {clinicConfig.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-teal-700 font-semibold">
                Showcase CRM · Demo Mode
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => {
                setShowPasswordModal(true);
                setPasswordChangeSuccess(null);
                setPasswordChangeError(null);
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-mist-100 border border-mist-300 transition-colors shadow-subtle"
            >
              <KeyRound className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">Change Password</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Showcase Notice Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-50 via-mint-50 to-white border border-mint-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-subtle">
          <div className="flex items-start sm:items-center space-x-2.5">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-semibold text-slate-900">Showcase Demonstration Storage:</span>{" "}
              Inquiries are stored in this browser's local storage (maximum {MAX_DEMO_INQUIRIES} demo entries).
              Submissions from other devices will not automatically sync without a connected shared cloud database.
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleResetSamples}
              className="px-2.5 py-1 text-[11px] font-semibold text-teal-800 bg-white hover:bg-mint-100 rounded-md border border-mint-300 transition-colors"
            >
              Reset Samples
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-white hover:bg-rose-50 rounded-md border border-rose-200 transition-colors"
            >
              Clear Inquiries
            </button>
          </div>
        </div>

        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Patient Inquiries ({inquiries.length}/{MAX_DEMO_INQUIRIES})
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Click any inquiry to review complete details or contact the patient directly.
            </p>
          </div>

          <button
            onClick={loadInquiries}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-mist-100 border border-mist-300 shadow-subtle transition-colors shrink-0 self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 text-teal-600" />
            <span>Refresh Storage</span>
          </button>
        </div>

        {/* Empty State */}
        {inquiries.length === 0 ? (
          <div className="glass-panel rounded-3xl border border-white/90 p-12 text-center shadow-floating">
            <div className="w-12 h-12 rounded-2xl bg-mist-100 border border-mist-200 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
              No inquiries in local storage
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              When visitors submit the form on this device, entries will appear here (up to 10 max).
            </p>
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={handleResetSamples}
                className="btn-primary-glow px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Load Sample Demo Inquiries
              </button>
              <Link
                href="/#contact"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-mist-100 border border-mist-300"
              >
                Test Inquiry Form
              </Link>
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-3xl border border-white/90 shadow-floating overflow-hidden">
            
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-mist-100/80 border-b border-mist-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Patient Name</th>
                    <th className="py-3.5 px-6">Phone Number</th>
                    <th className="py-3.5 px-6">Requested Service</th>
                    <th className="py-3.5 px-6">Preferred Date</th>
                    <th className="py-3.5 px-6">Submitted</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist-200 text-sm">
                  {inquiries.map((inq) => (
                    <tr
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className="hover:bg-cyan-50/30 cursor-pointer transition-colors group"
                    >
                      <td className="py-4 px-6 font-semibold text-slate-900">
                        <div className="flex items-center space-x-2">
                          <span>{inq.fullName}</span>
                          {inq.isDemoSample && (
                            <span className="text-[10px] text-teal-700 bg-mint-100 px-1.5 py-0.2 rounded font-normal">
                              Sample
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-800">
                        {inq.phone}
                      </td>
                      <td className="py-4 px-6 text-slate-700">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-mist-100 text-slate-800 text-xs font-medium border border-mist-200">
                          {inq.service}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-600">
                        {inq.preferredDate ? (
                          <span className="inline-flex items-center space-x-1 text-slate-800">
                            <Calendar className="w-3.5 h-3.5 text-teal-600" />
                            <span>{inq.preferredDate}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">None specified</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {formatDate(inq.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInquiry(inq);
                            }}
                            className="text-xs font-semibold text-teal-700 group-hover:underline"
                          >
                            View →
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteInquiry(inq.id, e)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Delete demo inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-mist-200">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className="p-5 hover:bg-cyan-50/20 transition-colors active:bg-mist-100 cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-base text-slate-900">
                        {inq.fullName}
                      </h3>
                      <p className="text-xs font-mono text-slate-600 mt-0.5">
                        {inq.phone}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-medium text-slate-500 bg-mist-100 px-2 py-0.5 rounded border border-mist-200">
                        {formatDate(inq.createdAt)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteInquiry(inq.id, e)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-mist-100 text-slate-800 px-2.5 py-1 rounded-md border border-mist-200 font-medium">
                      {inq.service}
                    </span>
                    {inq.preferredDate && (
                      <span className="bg-white text-slate-700 px-2 py-1 rounded-md border border-mist-200 flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-teal-600" />
                        <span>{inq.preferredDate}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel bg-white/95 rounded-3xl border border-white max-w-lg w-full p-6 sm:p-8 relative shadow-floating animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-4 border-b border-mist-200">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-teal-700">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Patient Inquiry Details
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    ID: {selectedInquiry.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-mist-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4 text-sm">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Full Name
                </span>
                <p className="text-base font-bold text-slate-900">
                  {selectedInquiry.fullName}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Phone Number
                </span>
                <div className="flex items-center space-x-3">
                  <span className="text-base font-mono font-medium text-slate-900">
                    {selectedInquiry.phone}
                  </span>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="btn-primary-glow inline-flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-teal-800 bg-mint-100 hover:bg-mint-200 px-3 py-1.5 rounded-lg border border-mint-300"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {selectedInquiry.telegramUsername && (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    Telegram Username
                  </span>
                  <a
                    href={`https://t.me/${selectedInquiry.telegramUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 font-mono hover:underline inline-flex items-center space-x-1 text-sm font-medium"
                  >
                    <span>@{selectedInquiry.telegramUsername}</span>
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Requested Service / Reason
                </span>
                <p className="text-sm font-medium text-slate-800 bg-mist-100 p-3 rounded-xl border border-mist-200">
                  {selectedInquiry.service}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Preferred Contact / Visit Date
                </span>
                <p className="text-sm text-slate-800">
                  {selectedInquiry.preferredDate ? (
                    <span className="font-medium text-slate-900">
                      {selectedInquiry.preferredDate} (Requested date, pending confirmation)
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">No specific date requested</span>
                  )}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Submission Timestamp
                </span>
                <p className="text-xs text-slate-600 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatDate(selectedInquiry.createdAt)}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-mist-200 flex justify-between items-center">
              <button
                type="button"
                onClick={(e) => handleDeleteInquiry(selectedInquiry.id, e)}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Entry</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-mist-100 hover:bg-mist-200 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel bg-white/95 rounded-3xl border border-white max-w-md w-full p-6 sm:p-8 relative shadow-floating animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-4 border-b border-mist-200">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-mint-100 border border-mint-200 flex items-center justify-center text-teal-700">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Change Admin Password
                </h3>
              </div>

              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-mist-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passwordChangeSuccess && (
              <div className="my-4 p-3.5 rounded-xl bg-mint-50 border border-mint-200 text-teal-900 text-xs flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{passwordChangeSuccess}</span>
              </div>
            )}

            {passwordChangeError && (
              <div className="my-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{passwordChangeError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mist-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  New Password (min 8 chars)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mist-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mist-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-mist-100 hover:bg-mist-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordChangeLoading}
                  className="btn-primary-glow px-4 py-2.5 rounded-xl text-xs font-semibold disabled:opacity-50"
                >
                  {passwordChangeLoading ? "Updating..." : "Save Password"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
