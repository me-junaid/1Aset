"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  Smartphone,
} from "lucide-react";
import { requestWhatsAppOtp, verifyWhatsAppOtp, submitLead } from "@/lib/api";
import { submitLeadToNeoDove } from "@/lib/webhook";
import type { LeadSubmitPayload } from "@repo/types";

type OtpStep =
  | "REQUESTING_OTP"
  | "OTP_SENT"
  | "VERIFYING_OTP"
  | "OTP_VERIFIED"
  | "ENQUIRY_SUBMITTED"
  | "ERROR";

interface OtpVerificationModalProps {
  isOpen: boolean;
  phoneNumber: string;
  leadPayload: Omit<LeadSubmitPayload, "whatsappVerificationId">;
  onClose: () => void;
  onSuccess: () => void;
}

export function OtpVerificationModal({
  isOpen,
  phoneNumber,
  leadPayload,
  onClose,
  onSuccess,
}: OtpVerificationModalProps) {
  const [step, setStep] = useState<OtpStep>("REQUESTING_OTP");
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [maskedPhone, setMaskedPhone] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationId, setVerificationId] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ── Send OTP on modal open ──
  useEffect(() => {
    if (isOpen) {
      setStep("REQUESTING_OTP");
      setOtpValues(["", "", "", "", "", ""]);
      setErrorMessage("");
      setVerificationId("");
      sendOtp();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Resend countdown timer ──
  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resendTimer]);

  const sendOtp = useCallback(async () => {
    try {
      setStep("REQUESTING_OTP");
      setErrorMessage("");

      const response = await requestWhatsAppOtp({ phoneNumber });
      setMaskedPhone(response.data.maskedPhone);
      setResendTimer(response.data.resendAvailableInSeconds);
      setStep("OTP_SENT");

      // Focus first input
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to send OTP");
      setStep("ERROR");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber]);

  const handleVerify = useCallback(
    async (otp: string) => {
      try {
        setStep("VERIFYING_OTP");
        setErrorMessage("");

        const response = await verifyWhatsAppOtp({ phoneNumber, otp });

        if (response.data.verified) {
          setVerificationId(response.data.verificationId);
          setStep("OTP_VERIFIED");

          // Auto-submit the lead
          try {
            await submitLead({
              ...leadPayload,
              whatsappVerificationId: response.data.verificationId,
            });
            setStep("ENQUIRY_SUBMITTED");
            setTimeout(() => onSuccess(), 2000);
          } catch (submitError: any) {
            // Fallback: send directly to NeoDove if backend API is unreachable
            submitLeadToNeoDove({
              fullName: leadPayload.name,
              phoneNumber: leadPayload.phoneNumber,
              emailAddress: leadPayload.email,
              language: leadPayload.language,
              budget: leadPayload.budgetRange,
              siteVisit: leadPayload.siteVisit,
              interestedIn: leadPayload.interestedIn,
              preferredLocation: leadPayload.preferredLocation,
              source: leadPayload.source,
            }).catch(() => {});

            setErrorMessage(submitError.message || "Failed to submit enquiry");
            setStep("ERROR");
          }
        }
      } catch (error: any) {
        setErrorMessage(error.message || "Verification failed");
        setStep("OTP_SENT");
        setOtpValues(["", "", "", "", "", ""]);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [phoneNumber, leadPayload, onSuccess],
  );

  // ── OTP Input Handlers ──

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const newValues = [...otpValues];
    newValues[index] = digit;
    setOtpValues(newValues);

    // Auto-advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    const fullOtp = newValues.join("");
    if (fullOtp.length === 6 && newValues.every((v) => v !== "")) {
      handleVerify(fullOtp);
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length === 0) return;

    const newValues = [...otpValues];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newValues[i] = pastedData[i];
    }
    setOtpValues(newValues);

    // Focus the next empty input or last input
    const nextEmpty = newValues.findIndex((v) => v === "");
    if (nextEmpty !== -1) {
      inputRefs.current[nextEmpty]?.focus();
    } else {
      inputRefs.current[5]?.focus();
      // Auto-submit
      const fullOtp = newValues.join("");
      if (fullOtp.length === 6) {
        handleVerify(fullOtp);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === "REQUESTING_OTP" || step === "VERIFYING_OTP" || step === "OTP_VERIFIED" ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        {step !== "REQUESTING_OTP" && step !== "VERIFYING_OTP" && step !== "OTP_VERIFIED" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Header */}
        <div className="bg-gradient-to-br from-[#0b4eb7] via-[#0a45a5] to-[#073582] px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">WhatsApp Verification</h3>
              <p className="text-blue-200 text-xs">
                Verify your phone to submit your enquiry
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* ── REQUESTING OTP ── */}
          {step === "REQUESTING_OTP" && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <Loader2 className="h-7 w-7 text-[#0b4eb7] animate-spin" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-slate-800">
                  Sending Verification Code
                </p>
                <p className="text-xs text-slate-500">
                  Sending a 6-digit code to your WhatsApp...
                </p>
              </div>
            </div>
          )}

          {/* ── OTP SENT — Input ── */}
          {step === "OTP_SENT" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-sm text-slate-600">
                  We&apos;ve sent a verification code to
                </p>
                <p className="text-base font-bold text-slate-900 tracking-wide">
                  {maskedPhone || phoneNumber}
                </p>
                <p className="text-xs text-slate-400">via WhatsApp</p>
              </div>

              {/* Error message inline */}
              {errorMessage && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                  <p className="text-xs text-red-700 font-medium">{errorMessage}</p>
                </div>
              )}

              {/* 6-digit OTP input */}
              <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-11 h-13 text-center text-lg font-bold text-slate-900 bg-slate-50/80 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#0b4eb7] focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
                  />
                ))}
              </div>

              {/* Verify button */}
              <button
                onClick={() => {
                  const otp = otpValues.join("");
                  if (otp.length === 6) handleVerify(otp);
                }}
                disabled={otpValues.some((v) => v === "")}
                className="w-full bg-[#0b4eb7] hover:bg-[#083c91] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                Verify & Submit Enquiry
              </button>

              {/* Resend / Change phone */}
              <div className="flex items-center justify-between text-xs">
                <button
                  onClick={sendOtp}
                  disabled={resendTimer > 0}
                  className="flex items-center gap-1.5 text-[#0b4eb7] font-semibold hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed cursor-pointer transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {resendTimer > 0
                    ? `Resend in ${resendTimer}s`
                    : "Resend Code"}
                </button>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-slate-700 font-medium cursor-pointer transition"
                >
                  Change Phone Number
                </button>
              </div>
            </div>
          )}

          {/* ── VERIFYING OTP ── */}
          {step === "VERIFYING_OTP" && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <Loader2 className="h-7 w-7 text-[#0b4eb7] animate-spin" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-slate-800">
                  Verifying Code
                </p>
                <p className="text-xs text-slate-500">
                  Please wait while we verify your code...
                </p>
              </div>
            </div>
          )}

          {/* ── OTP VERIFIED — Submitting Lead ── */}
          {step === "OTP_VERIFIED" && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                <Loader2 className="h-7 w-7 text-emerald-600 animate-spin" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-slate-800">
                  Phone Verified!
                </p>
                <p className="text-xs text-slate-500">
                  Submitting your enquiry...
                </p>
              </div>
            </div>
          )}

          {/* ── ENQUIRY SUBMITTED ── */}
          {step === "ENQUIRY_SUBMITTED" && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="h-9 w-9 text-emerald-600" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-serif font-bold text-slate-900">
                  Enquiry Submitted!
                </p>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  A dedicated 1ASET investment advisor will contact you within 24 business hours.
                </p>
              </div>
            </div>
          )}

          {/* ── ERROR ── */}
          {step === "ERROR" && (
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="h-7 w-7 text-red-500" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-bold text-slate-800">
                  Something Went Wrong
                </p>
                <p className="text-xs text-slate-500 max-w-xs">
                  {errorMessage}
                </p>
              </div>
              <button
                onClick={sendOtp}
                className="bg-[#0b4eb7] hover:bg-[#083c91] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Footer trust badge */}
        {(step === "OTP_SENT" || step === "REQUESTING_OTP") && (
          <div className="px-6 pb-5">
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="h-3 w-3" />
              <span>End-to-end encrypted · Your data is secure with 1ASET</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
