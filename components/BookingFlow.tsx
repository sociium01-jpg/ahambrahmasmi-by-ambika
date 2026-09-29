"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Logo } from "@/components/ui/Logo";
import { GuidelinesModal } from "@/components/GuidelinesModal";
import {
  CALL_TIME_SLOTS,
  COURSES,
  COURSE_SESSIONS_LIST,
  CallTimeId,
  CourseId,
  getEmailHref,
} from "@/lib/site";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay?: new (options: Record<string, any>) => {
      open: () => void;
      on: (event: string, handler: (resp: unknown) => void) => void;
    };
  }
}

export type PaymentMethodId = "upi" | "card" | "net";

const PAYMENT_METHODS: { id: PaymentMethodId; label: string }[] = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Card" },
  { id: "net", label: "Netbanking" },
];

const STEP_LABELS_DESKTOP = [
  "Course & guidelines",
  "Your details",
  "Review & pay",
];

const STEP_LABELS_MOBILE = [
  "Step 1 of 3 · Course & guidelines",
  "Step 2 of 3 · Your details",
  "Step 3 of 3 · Review & pay",
  "Booked",
];

export function BookingFlow() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const choice: CourseId = "whole";
  const [slot, setSlot] = useState<CallTimeId>("evening");
  const [payMethod, setPayMethod] = useState<PaymentMethodId>("upi");

  // Step 2 form fields
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    whatsapp?: string;
    email?: string;
  }>({});

  // Payment processing state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [simulatedModalOrder, setSimulatedModalOrder] = useState<{
    bookingId: string;
    orderId: string;
    amountInr: number;
  } | null>(null);

  const chosen = COURSES[choice];
  const slotLabel =
    CALL_TIME_SLOTS.find((s) => s.id === slot)?.label + " (IST)";

  const whatsappHelpUrl = getEmailHref(
    `Enquiry — ${chosen.name} (${chosen.priceRsLabel})`
  );

  const validateStep2 = (): boolean => {
    const errors: { name?: string; whatsapp?: string; email?: string } = {};
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      errors.name = "Please enter your full name.";
    }

    const cleanDigits = whatsapp.replace(/\D/g, "").replace(/^91/, "");
    if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
      errors.whatsapp = "Please enter a valid 10-digit Indian WhatsApp number.";
    }

    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextFromStep1 = () => {
    setPaymentError(null);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromStep2 = () => {
    setPaymentError(null);
    if (validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setPaymentError(null);
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setPaymentError(null);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const verifyPaymentOnServer = async (payload: {
    bookingId: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    simulatedStatus?: "paid" | "failed";
  }) => {
    try {
      const cleanDigits = whatsapp.replace(/\D/g, "").replace(/^91/, "");
      const res = await fetch("/api/booking/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          fallbackMeta: {
            course: choice,
            name: name.trim(),
            whatsapp: `+91${cleanDigits}`,
            email: email.trim(),
            call_time: slot,
            note: note.trim(),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.verified) {
        setPaymentError(
          data.error ||
            "We couldn't confirm your payment yet. Please retry or message Ambika on WhatsApp."
        );
        setIsSubmitting(false);
        return;
      }

      setPaymentError(null);
      setIsSubmitting(false);
      setSimulatedModalOrder(null);
      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setPaymentError(
        "Network issue while verifying payment. Please message Ambika on WhatsApp before retrying."
      );
      setIsSubmitting(false);
    }
  };

  const handlePayNow = async () => {
    setPaymentError(null);
    setIsSubmitting(true);

    try {
      const cleanDigits = whatsapp.replace(/\D/g, "").replace(/^91/, "");
      const res = await fetch("/api/booking/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course: choice,
          name: name.trim(),
          whatsapp: cleanDigits,
          email: email.trim(),
          call_time: slot,
          note: note.trim(),
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        setPaymentError(
          orderData.error || "Unable to create order. Please try again."
        );
        setIsSubmitting(false);
        return;
      }

      if (orderData.simulated || !window.Razorpay) {
        setSimulatedModalOrder({
          bookingId: orderData.bookingId,
          orderId: orderData.orderId,
          amountInr: orderData.amountInr,
        });
        setIsSubmitting(false);
        return;
      }

      const rzpMethod =
        payMethod === "net"
          ? "netbanking"
          : payMethod === "card"
          ? "card"
          : "upi";

      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Ahambrahmasmi by Ambika",
        description: chosen.name,
        image: "/images/logo.png",
        order_id: orderData.orderId,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: `+91${cleanDigits}`,
          method: rzpMethod,
        },
        theme: {
          color: "#8E1B25",
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          await verifyPaymentOnServer({
            bookingId: orderData.bookingId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
      });

      rzp.on("payment.failed", async () => {
        await verifyPaymentOnServer({
          bookingId: orderData.bookingId,
          razorpay_order_id: orderData.orderId,
          razorpay_payment_id: "",
          razorpay_signature: "",
          simulatedStatus: "failed",
        });
        setPaymentError(
          "Your payment did not go through. You can try again below or message Ambika directly on WhatsApp."
        );
      });

      rzp.open();
    } catch {
      setPaymentError(
        "Could not connect to payment gateway. Please try again or reach out on WhatsApp."
      );
      setIsSubmitting(false);
    }
  };

  const handleMobilePrimaryClick = () => {
    if (step === 1) handleNextFromStep1();
    else if (step === 2) handleNextFromStep2();
    else if (step === 3) handlePayNow();
    else if (step === 4) router.push("/space");
  };

  const mobilePrimaryLabel =
    step === 1
      ? "Continue to your details →"
      : step === 2
      ? "Review & pay →"
      : step === 3
      ? isSubmitting
        ? "Opening Razorpay…"
        : `Pay ${chosen.priceLabel}`
      : "Open my seeker’s space";

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      {/* ============================================================
          DESKTOP BOOKING VIEW (>=1024px)
          ============================================================ */}
      <div className="hidden lg:grid min-h-screen w-full max-w-[1440px] mx-auto grid-cols-12 bg-cream font-sans text-ink box-border">
        {/* Left Maroon Sidebar (4 columns) */}
        <aside className="col-span-4 flex flex-col gap-[36px] bg-maroon px-[48px] py-[56px] text-cream">
          <Logo variant="booking-sidebar" href="/" />

          {/* 3-Step List */}
          <div className="flex flex-col gap-[22px]">
            {STEP_LABELS_DESKTOP.map((label, idx) => {
              const n = idx + 1;
              const isDoneStep = step > n;
              const isCurStep = step === n;
              return (
                <div key={label} className="flex items-center gap-[16px]">
                  <span
                    className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full text-[15px] font-semibold ${
                      isCurStep
                        ? "bg-gold text-ink"
                        : isDoneStep
                        ? "bg-cream text-maroon"
                        : "border-[1.5px] border-[#C9868D] text-[#F1D9D3]"
                    }`}
                  >
                    {isDoneStep ? "✓" : String(n)}
                  </span>
                  <span
                    className={`text-[16px] ${
                      isCurStep ? "font-medium text-white" : "text-[#F1D9D3]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex-grow" />

          {/* Your Enrolment Summary */}
          <div className="flex flex-col gap-[6px] border-t border-[#A8414A] pt-[24px]">
            <span className="font-cursive text-[26px] leading-none text-gold">
              One path · One to one
            </span>
            <span className="font-serif text-[24px]">{chosen.name}</span>
            <div className="flex items-baseline gap-[10px]">
              <span className="font-serif text-[38px] font-semibold">
                {chosen.priceRsLabel}
              </span>
            </div>
            <span className="text-[13px] italic text-[#F1D9D3]">
              (only Introductory Price) · All 6 sessions + 1 month WhatsApp
              support
            </span>
          </div>

          {/* Ambika WhatsApp Help */}
          <div className="flex items-center gap-[14px]">
            <Image
              src="/images/ambika.png"
              alt="Ambika"
              width={56}
              height={56}
              className="h-[56px] w-[56px] rounded-full border-2 border-gold object-cover"
            />
            <span className="text-[14px] leading-[1.5] text-[#F1D9D3]">
              Questions first?
              <br />
              <a
                href={whatsappHelpUrl}
                className="text-gold hover:underline"
              >
                Email Ambika
              </a>
            </span>
          </div>
        </aside>

        {/* Right Form Area (8 columns) */}
        <main className="col-span-8 flex flex-col gap-[28px] px-[64px] py-[48px]">
          {/* STEP 1 — Course Summary + Important to Read */}
          {step === 1 && (
            <div className="flex flex-col gap-[24px] animate-fade-up">
              <div className="flex flex-col gap-[6px]">
                <span className="font-cursive text-[34px] leading-none text-lavender-deep">
                  A journey of self discovery
                </span>
                <h1 className="m-0 font-serif text-[44px] font-normal text-ink">
                  1 to 1 · LOA Coaching Enrolment
                </h1>
                <p className="m-0 font-cormorant text-[22px] italic text-body">
                  One path. Paid in full. One to one.
                </p>
              </div>

              {/* Warm Beige Box ("The course") + Soft Lavender Box ("Fee") */}
              <div className="grid grid-cols-12 gap-[20px] items-stretch">
                <div className="col-span-7 beige-card-surface rounded-[20px] p-[24px] flex flex-col gap-[12px]">
                  <h2 className="m-0 font-playfair text-[22px] font-medium text-maroon">
                    The course
                  </h2>
                  <ul className="m-0 flex flex-col gap-[8px] pl-0 list-none">
                    {COURSE_SESSIONS_LIST.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-[10px] font-cormorant text-[19px] font-medium leading-[1.35] text-ink"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-ink"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-5 lavender-card-surface rounded-[20px] p-[24px] flex flex-col justify-between gap-[14px]">
                  <div className="flex flex-col gap-[6px]">
                    <span className="font-playfair text-[22px] font-medium text-maroon">
                      Fee
                    </span>
                    <span className="font-cormorant text-[22px] font-semibold text-ink">
                      The 5 week course
                    </span>
                    <span className="font-cormorant text-[18px] text-body">
                      All sessions above. One enrolment.
                    </span>
                  </div>
                  <div className="flex flex-col gap-[4px] pt-[8px] border-t border-lavender-border">
                    <span className="font-playfair text-[34px] font-medium leading-tight text-maroon">
                      Rs. 15,000/-
                    </span>
                    <span className="font-cormorant text-[20px] italic text-maroon">
                      (only Introductory Price)
                    </span>
                  </div>
                </div>
              </div>

              {/* Guidelines Bar + Continue Action */}
              <div className="rounded-[20px] bg-lavender-soft border border-lavender-border p-[22px] flex flex-wrap items-center justify-between gap-[16px]">
                <div className="flex flex-col gap-[4px]">
                  <span className="font-playfair text-[20px] font-medium text-maroon">
                    Programme Guidelines · Important to read
                  </span>
                  <span className="font-cormorant text-[18px] text-body">
                    5-week one-to-one programme · Please review the guidelines
                    before continuing.
                  </span>
                </div>
                <GuidelinesModal
                  buttonLabel="Guidelines · Important to read"
                  variant="pill"
                />
              </div>

              <button
                type="button"
                onClick={handleNextFromStep1}
                className="btn-3d-maroon animate-gold-shimmer min-h-[54px] self-end rounded-full px-[36px] py-[18px] font-sans text-[16px] font-semibold text-white cursor-pointer"
              >
                Continue to your details →
              </button>
            </div>
          )}

          {/* STEP 2 — Your details */}
          {step === 2 && (
            <div className="flex flex-col gap-[24px] animate-fade-up">
              <div className="flex flex-col gap-[6px]">
                <span className="font-cursive text-[32px] leading-none text-lavender-deep">
                  Step 2 of 3
                </span>
                <h1 className="m-0 font-serif text-[46px] font-normal text-ink">
                  A little about you
                </h1>
                <p className="m-0 text-[16px] text-muted">
                  Ambika will reach you on WhatsApp to share{" "}
                  <em>The Secret</em> and fix your first call.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-[18px]">
                <label className="flex flex-col gap-[8px] text-[14px] font-medium text-ink">
                  <span>Full name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (formErrors.name)
                        setFormErrors({ ...formErrors, name: undefined });
                    }}
                    className={`h-[52px] rounded-[12px] border bg-white px-[16px] text-[16px] font-normal text-ink ${
                      formErrors.name ? "border-maroon" : "border-line"
                    }`}
                  />
                  {formErrors.name && (
                    <span className="text-[13px] font-normal text-maroon">
                      {formErrors.name}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-[8px] text-[14px] font-medium text-ink">
                  <span>WhatsApp number</span>
                  <div
                    className={`flex h-[52px] items-center overflow-hidden rounded-[12px] border bg-white ${
                      formErrors.whatsapp ? "border-maroon" : "border-line"
                    }`}
                  >
                    <span className="select-none border-r border-divider px-[14px] text-[16px] font-normal text-muted">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="tel"
                      autoComplete="tel-national"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="9876543210"
                      value={whatsapp}
                      onChange={(e) => {
                        const digits = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setWhatsapp(digits);
                        if (formErrors.whatsapp)
                          setFormErrors({
                            ...formErrors,
                            whatsapp: undefined,
                          });
                      }}
                      className="h-full w-full border-none bg-transparent px-[14px] text-[16px] font-normal text-ink focus:outline-none"
                    />
                  </div>
                  {formErrors.whatsapp && (
                    <span className="text-[13px] font-normal text-maroon">
                      {formErrors.whatsapp}
                    </span>
                  )}
                </label>

                <label className="col-span-2 flex flex-col gap-[8px] text-[14px] font-medium text-ink">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formErrors.email)
                        setFormErrors({ ...formErrors, email: undefined });
                    }}
                    className={`h-[52px] rounded-[12px] border bg-white px-[16px] text-[16px] font-normal text-ink ${
                      formErrors.email ? "border-maroon" : "border-line"
                    }`}
                  />
                  {formErrors.email && (
                    <span className="text-[13px] font-normal text-maroon">
                      {formErrors.email}
                    </span>
                  )}
                </label>
              </div>

              <div className="flex flex-col gap-[10px]">
                <span className="text-[14px] font-medium text-ink">
                  Best time for calls (IST)
                </span>
                <div
                  role="radiogroup"
                  aria-label="Best time for calls (IST)"
                  className="flex gap-[10px]"
                >
                  {CALL_TIME_SLOTS.map((t) => {
                    const isOn = t.id === slot;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="radio"
                        aria-checked={isOn}
                        onClick={() => setSlot(t.id)}
                        className={`min-h-[46px] rounded-full px-[22px] py-[12px] text-[15px] cursor-pointer transition-colors ${
                          isOn
                            ? "border-[1.5px] border-maroon bg-maroon text-white"
                            : "border-[1.5px] border-lavender-border bg-lavender-soft text-ink hover:border-maroon"
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex flex-col gap-[8px] text-[14px] font-medium text-ink">
                <span>
                  What are you seeking right now?{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </span>
                <textarea
                  rows={3}
                  placeholder="Share as much or as little as you like"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="resize-none rounded-[12px] border border-line bg-white px-[16px] py-[14px] text-[16px] font-normal text-ink"
                />
              </label>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="min-h-[44px] bg-transparent px-[8px] py-[12px] font-sans text-[16px] text-maroon hover:text-maroon-dark cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNextFromStep2}
                  className="btn-3d-maroon animate-gold-shimmer min-h-[54px] rounded-full px-[36px] py-[18px] font-sans text-[16px] font-semibold text-white cursor-pointer"
                >
                  Review &amp; pay →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Review & pay */}
          {step === 3 && (
            <div className="flex flex-col gap-[24px] animate-fade-up">
              <div className="flex flex-col gap-[4px]">
                <span className="font-cursive text-[32px] leading-none text-lavender-deep">
                  Step 3 of 3
                </span>
                <h1 className="m-0 font-serif text-[46px] font-normal text-ink">
                  Review &amp; pay
                </h1>
              </div>

              <div className="flex flex-col gap-[16px] rounded-[22px] bg-lavender border border-lavender-border px-[32px] py-[28px]">
                <div className="flex justify-between text-[17px] font-semibold text-ink">
                  <span>{chosen.name}</span>
                  <span className="text-maroon">{chosen.priceRsLabel}</span>
                </div>
                <div className="flex justify-between text-[15px] text-body">
                  <span>Preferred call time</span>
                  <span>{slotLabel}</span>
                </div>
                <div className="flex justify-between text-[15px] text-body">
                  <span>Includes</span>
                  <span>{chosen.includes}</span>
                </div>
                <div className="flex items-baseline justify-between border-t border-lavender-border pt-[16px]">
                  <div className="flex flex-col">
                    <span className="font-semibold text-ink">
                      Total (Introductory Price)
                    </span>
                    <span className="text-[13px] text-lavender-deep">
                      One path · Paid in full · Non-refundable once started
                    </span>
                  </div>
                  <span className="font-serif text-[40px] font-semibold text-maroon">
                    {chosen.priceLabel}
                  </span>
                </div>
              </div>

              {/* Payment method hint chips */}
              <div className="flex flex-col gap-[10px]">
                <span className="text-[14px] font-medium text-ink">
                  Pay with
                </span>
                <div
                  role="radiogroup"
                  aria-label="Payment method"
                  className="flex gap-[10px]"
                >
                  {PAYMENT_METHODS.map((pm) => {
                    const isOn = pm.id === payMethod;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        role="radio"
                        aria-checked={isOn}
                        onClick={() => setPayMethod(pm.id)}
                        className={`min-h-[46px] rounded-full px-[22px] py-[12px] text-[15px] cursor-pointer transition-colors ${
                          isOn
                            ? "border-[1.5px] border-maroon bg-maroon text-white"
                            : "border-[1.5px] border-line bg-white text-ink hover:border-maroon"
                        }`}
                      >
                        {pm.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-[12px] text-[14px] text-muted">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8E1B25"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                UPI, cards and net banking · secure checkout via Razorpay
              </div>

              {paymentError && (
                <div
                  role="alert"
                  className="flex flex-col gap-[10px] rounded-[16px] border border-maroon/30 bg-beige-card p-[20px] text-[15px] text-ink"
                >
                  <span className="font-medium text-maroon">
                    {paymentError}
                  </span>
                  <a
                    href={whatsappHelpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[8px] font-medium text-maroon underline"
                  >
                    Book or ask directly on WhatsApp →
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="min-h-[44px] bg-transparent px-[8px] py-[12px] font-sans text-[16px] text-maroon hover:text-maroon-dark cursor-pointer disabled:opacity-50"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handlePayNow}
                  disabled={isSubmitting}
                  className="btn-3d-maroon animate-gold-shimmer min-h-[54px] rounded-full px-[36px] py-[18px] font-sans text-[16px] font-semibold text-white cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Opening Razorpay…"
                    : `Pay ${chosen.priceLabel}`}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — Confirmation */}
          {step === 4 && (
            <div className="flex flex-col items-start gap-[24px] pt-[40px] animate-fade-up">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gold">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4E3B2C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5 9-10" />
                </svg>
              </span>
              <span className="font-cursive text-[36px] leading-none text-lavender-deep">
                Welcome to your journey
              </span>
              <h1 className="m-0 font-serif text-[52px] font-normal leading-[1.05] text-ink">
                You’re on the path.
              </h1>
              <p className="m-0 max-w-[560px] text-[18px] leading-[1.7] text-body">
                Ambika will message you on WhatsApp with the link to{" "}
                <em>The Secret</em> and a time for your first call. Your
                seeker’s space is ready with your first videos.
              </p>

              <div className="flex w-full max-w-[440px] items-center gap-[14px] rounded-[20px] bg-lavender border border-lavender-border p-[18px]">
                <Image
                  src="/images/ambika.png"
                  alt="Ambika"
                  width={48}
                  height={48}
                  className="h-[48px] w-[48px] rounded-full object-cover"
                />
                <span className="flex flex-col gap-[2px]">
                  <span className="text-[15px] font-semibold text-ink">
                    Next: your first call
                  </span>
                  <span className="text-[13px] text-lavender-deep">
                    {chosen.name} · {slotLabel}
                  </span>
                </span>
              </div>

              <div className="flex gap-[14px]">
                <Link
                  href="/space"
                  className="btn-3d-maroon inline-flex min-h-[52px] items-center justify-center rounded-full px-[28px] py-[16px] font-semibold text-white no-underline"
                >
                  Open my seeker’s space
                </Link>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="min-h-[52px] rounded-full border-[1.5px] border-maroon bg-transparent px-[26px] py-[15px] font-sans text-[16px] text-maroon hover:bg-maroon hover:text-white cursor-pointer transition-colors"
                >
                  Start over
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================
          MOBILE & TABLET BOOKING VIEW (<1024px — App-Like Experience)
          ============================================================ */}
      <div className="flex lg:hidden min-h-[100dvh] w-full flex-col bg-cream font-sans text-ink box-border">
        {/* Top Header */}
        <header className="flex flex-col gap-[12px] border-b border-lavender-border/80 bg-cream px-[16px] pt-[14px] pb-[12px]">
          <div className="flex items-center justify-between">
            {step === 2 || step === 3 ? (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Back"
                className="flex h-[44px] w-[44px] items-center justify-center rounded-full border-[1.5px] border-lavender-border bg-white text-ink cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
            ) : (
              <Link
                href="/"
                aria-label="Close and return home"
                className="flex h-[44px] w-[44px] items-center justify-center rounded-full border-[1.5px] border-lavender-border bg-white text-ink"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </Link>
            )}

            <Logo variant="booking-mobile" />

            <a
              href={whatsappHelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ask on WhatsApp"
              className="h-[44px] w-[44px] overflow-hidden rounded-full border-2 border-gold box-border"
            >
              <Image
                src="/images/ambika.png"
                alt="Ambika"
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            </a>
          </div>

          <div className="flex flex-col gap-[6px]">
            <div className="flex gap-[6px]" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`h-[5px] flex-grow rounded-full transition-colors ${
                    step >= n ? "bg-maroon" : "bg-lavender-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-[12px] font-medium text-lavender-deep">
              {STEP_LABELS_MOBILE[step - 1]}
            </span>
          </div>
        </header>

        {/* Main Step Area */}
        <main className="flex flex-grow flex-col gap-[16px] px-[16px] py-[20px]">
          {/* Mobile Step 1: Unified Course + Fee + Important to Read */}
          {step === 1 && (
            <div className="flex flex-col gap-[16px] animate-fade-up">
              <div className="flex flex-col gap-[4px]">
                <span className="font-cursive text-[28px] leading-none text-lavender-deep">
                  A journey of self discovery
                </span>
                <h1 className="m-0 font-serif text-[30px] font-normal leading-[1.1] text-ink">
                  The 5-Week 1-to-1 Course
                </h1>
                <p className="m-0 font-cormorant text-[19px] italic text-body">
                  One path. Paid in full. One to one.
                </p>
              </div>

              {/* Warm Golden Beige Box: "The course" */}
              <div className="beige-card-surface rounded-[18px] p-[18px] flex flex-col gap-[10px]">
                <h2 className="m-0 font-playfair text-[20px] font-medium text-maroon">
                  The course
                </h2>
                <ul className="m-0 flex flex-col gap-[8px] pl-0 list-none">
                  {COURSE_SESSIONS_LIST.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-[10px] font-cormorant text-[18px] font-medium leading-[1.35] text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-ink"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Soft Lavender Box: "Fee" */}
              <div className="lavender-card-surface rounded-[18px] p-[18px] flex flex-col gap-[6px]">
                <div className="flex items-center justify-between">
                  <span className="font-playfair text-[20px] font-medium text-maroon">
                    Fee · The 5 week course
                  </span>
                  <span className="rounded-full bg-white/80 border border-lavender-border px-[10px] py-[3px] text-[11px] font-semibold text-lavender-deep">
                    One enrolment
                  </span>
                </div>
                <span className="font-cormorant text-[17px] text-body">
                  All sessions above. One enrolment.
                </span>
                <div className="mt-[4px] flex flex-wrap items-baseline gap-[8px]">
                  <span className="font-playfair text-[28px] font-medium text-maroon">
                    Rs. 15,000/-
                  </span>
                  <span className="font-cormorant text-[19px] italic text-maroon">
                    (only Introductory Price)
                  </span>
                </div>
              </div>

              {/* Guidelines Button Card */}
              <div className="rounded-[18px] bg-lavender-soft border border-lavender-border p-[18px] flex flex-col sm:flex-row sm:items-center justify-between gap-[12px]">
                <div className="flex flex-col gap-[2px]">
                  <span className="font-playfair text-[19px] font-medium text-maroon">
                    Programme Guidelines
                  </span>
                  <span className="font-cormorant text-[17px] text-body">
                    Tap to read the 5-week programme guidelines clearly.
                  </span>
                </div>
                <GuidelinesModal
                  buttonLabel="Guidelines · Important to read"
                  variant="pill"
                />
              </div>
            </div>
          )}

          {/* Mobile Step 2 */}
          {step === 2 && (
            <div className="flex flex-col gap-[14px] animate-fade-up">
              <div className="flex flex-col gap-[2px]">
                <span className="font-cursive text-[26px] leading-none text-lavender-deep">
                  Your details
                </span>
                <h1 className="m-0 font-serif text-[30px] font-normal leading-[1.1] text-ink">
                  A little about you
                </h1>
              </div>
              <p className="m-0 text-[14px] text-muted">
                Ambika will message you on WhatsApp to share{" "}
                <em>The Secret</em> and fix your first call.
              </p>

              <label className="flex flex-col gap-[6px] text-[13px] font-medium text-ink">
                <span>Full name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (formErrors.name)
                      setFormErrors({ ...formErrors, name: undefined });
                  }}
                  className={`h-[50px] rounded-[12px] border bg-white px-[14px] text-[16px] font-normal text-ink ${
                    formErrors.name ? "border-maroon" : "border-line"
                  }`}
                />
                {formErrors.name && (
                  <span className="text-[12px] font-normal text-maroon">
                    {formErrors.name}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-[6px] text-[13px] font-medium text-ink">
                <span>WhatsApp number</span>
                <div
                  className={`flex h-[50px] items-center overflow-hidden rounded-[12px] border bg-white ${
                    formErrors.whatsapp ? "border-maroon" : "border-line"
                  }`}
                >
                  <span className="select-none border-r border-divider px-[12px] text-[16px] font-normal text-muted">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="tel"
                    autoComplete="tel-national"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="9876543210"
                    value={whatsapp}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setWhatsapp(digits);
                      if (formErrors.whatsapp)
                        setFormErrors({ ...formErrors, whatsapp: undefined });
                    }}
                    className="h-full w-full border-none bg-transparent px-[12px] text-[16px] font-normal text-ink focus:outline-none"
                  />
                </div>
                {formErrors.whatsapp && (
                  <span className="text-[12px] font-normal text-maroon">
                    {formErrors.whatsapp}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-[6px] text-[13px] font-medium text-ink">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formErrors.email)
                      setFormErrors({ ...formErrors, email: undefined });
                  }}
                  className={`h-[50px] rounded-[12px] border bg-white px-[14px] text-[16px] font-normal text-ink ${
                    formErrors.email ? "border-maroon" : "border-line"
                  }`}
                />
                {formErrors.email && (
                  <span className="text-[12px] font-normal text-maroon">
                    {formErrors.email}
                  </span>
                )}
              </label>

              <div className="flex flex-col gap-[8px]">
                <span className="text-[13px] font-medium text-ink">
                  Best time for calls (IST)
                </span>
                <div className="grid grid-cols-3 gap-[8px]">
                  {CALL_TIME_SLOTS.map((t) => {
                    const isOn = t.id === slot;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSlot(t.id)}
                        className={`h-[46px] rounded-[12px] text-[14px] cursor-pointer transition-colors ${
                          isOn
                            ? "border-[1.5px] border-maroon bg-maroon text-white"
                            : "border-[1.5px] border-lavender-border bg-lavender-soft text-ink"
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex flex-col gap-[6px] text-[13px] font-medium text-ink">
                <span>
                  What are you seeking right now?{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </span>
                <textarea
                  rows={2}
                  placeholder="Share as much or as little as you like"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="resize-none rounded-[12px] border border-line bg-white px-[14px] py-[12px] text-[15px] font-normal text-ink"
                />
              </label>
            </div>
          )}

          {/* Mobile Step 3 */}
          {step === 3 && (
            <div className="flex flex-col gap-[14px] animate-fade-up">
              <div className="flex flex-col gap-[2px]">
                <span className="font-cursive text-[26px] leading-none text-lavender-deep">
                  Final step
                </span>
                <h1 className="m-0 font-serif text-[30px] font-normal leading-[1.1] text-ink">
                  Review &amp; pay
                </h1>
              </div>

              <div className="flex flex-col gap-[12px] rounded-[20px] bg-lavender border border-lavender-border p-[18px]">
                <div className="flex justify-between text-[15px] font-semibold text-ink">
                  <span>{chosen.mobileName}</span>
                  <span className="text-maroon">{chosen.priceRsLabel}</span>
                </div>
                <div className="flex justify-between gap-[12px] text-[13px] text-body">
                  <span>Includes</span>
                  <span className="text-right">{chosen.includes}</span>
                </div>
                <div className="flex justify-between text-[13px] text-body">
                  <span>Call time</span>
                  <span>{slotLabel}</span>
                </div>
                <div className="flex items-baseline justify-between border-t border-lavender-border pt-[12px]">
                  <span className="font-semibold text-ink">
                    Total (Introductory Price)
                  </span>
                  <span className="font-serif text-[30px] text-maroon">
                    {chosen.priceLabel}
                  </span>
                </div>
              </div>

              <span className="text-[13px] font-medium text-ink">Pay with</span>
              <div className="grid grid-cols-3 gap-[8px]">
                {PAYMENT_METHODS.map((pm) => {
                  const isOn = pm.id === payMethod;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPayMethod(pm.id)}
                      className={`h-[46px] rounded-[12px] text-[14px] cursor-pointer transition-colors ${
                        isOn
                          ? "border-[1.5px] border-maroon bg-maroon text-white"
                          : "border-[1.5px] border-line bg-white text-ink"
                      }`}
                    >
                      {pm.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-[10px] text-[13px] text-muted">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8E1B25"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                Secure checkout via Razorpay
              </div>

              {paymentError && (
                <div
                  role="alert"
                  className="flex flex-col gap-[8px] rounded-[16px] border border-maroon/30 bg-beige-card p-[16px] text-[14px] text-ink"
                >
                  <span className="font-medium text-maroon">
                    {paymentError}
                  </span>
                  <a
                    href={whatsappHelpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-maroon underline"
                  >
                    Ask or book on WhatsApp →
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Mobile Step 4 (Confirmation) */}
          {step === 4 && (
            <div className="flex flex-col items-center gap-[16px] pt-[32px] text-center animate-fade-up">
              <span className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gold">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4E3B2C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5 9-10" />
                </svg>
              </span>
              <span className="font-cursive text-[30px] leading-none text-lavender-deep">
                Welcome to your journey
              </span>
              <h1 className="m-0 font-serif text-[34px] font-normal leading-[1.08] text-ink">
                You’re on the path.
              </h1>
              <p className="m-0 text-[15px] leading-[1.65] text-body">
                Ambika will message you on WhatsApp with the link to{" "}
                <em>The Secret</em> and a time for your first call.
              </p>
              <div className="flex w-full items-center gap-[12px] rounded-[20px] bg-lavender border border-lavender-border p-[16px] text-left box-border">
                <Image
                  src="/images/ambika.png"
                  alt="Ambika"
                  width={48}
                  height={48}
                  className="h-[48px] w-[48px] rounded-full object-cover"
                />
                <span className="flex flex-col gap-[2px]">
                  <span className="text-[15px] font-semibold text-ink">
                    Next: your first call
                  </span>
                  <span className="text-[13px] text-lavender-deep">
                    {chosen.mobileName} · {slotLabel}
                  </span>
                </span>
              </div>
              <button
                type="button"
                onClick={handleRestart}
                className="min-h-[44px] rounded-full border-[1.5px] border-maroon px-[22px] py-[10px] text-[14px] font-medium text-maroon"
              >
                Start over
              </button>
            </div>
          )}
        </main>

        {/* Sticky Bottom Footer Bar */}
        <footer className="sticky bottom-0 flex items-center justify-between gap-[12px] border-t border-lavender-border bg-white/95 backdrop-blur-md px-[16px] pt-[12px] pb-[max(20px,env(safe-area-inset-bottom))]">
          {step !== 4 && (
            <span className="flex flex-col">
              <span className="text-[12px] text-lavender-deep">
                {chosen.mobileName}
              </span>
              <span className="font-serif text-[24px] leading-tight text-maroon">
                {chosen.priceLabel}
              </span>
            </span>
          )}
          <button
            type="button"
            onClick={handleMobilePrimaryClick}
            disabled={isSubmitting}
            className={`btn-3d-maroon animate-gold-shimmer h-[52px] rounded-full px-[24px] font-sans text-[15px] font-semibold text-white cursor-pointer disabled:opacity-60 ${
              step === 4 ? "flex-grow" : ""
            }`}
          >
            {mobilePrimaryLabel}
          </button>
        </footer>
      </div>

      {/* ============================================================
          RAZORPAY TEST CHECKOUT SIMULATOR MODAL
          ============================================================ */}
      {simulatedModalOrder && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Razorpay Test Checkout"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-[16px]"
        >
          <div className="flex w-full max-w-[400px] flex-col overflow-hidden rounded-[24px] bg-white shadow-floating-lg">
            <div className="flex items-center justify-between bg-maroon px-[24px] py-[20px] text-white">
              <div className="flex items-center gap-[12px]">
                <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white">
                  <Image
                    src="/images/logo.png"
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="font-serif text-[18px] leading-tight">
                    Ahambrahmasmi
                  </span>
                  <span className="text-[12px] text-gold">
                    Razorpay Test Mode ({payMethod.toUpperCase()})
                  </span>
                </div>
              </div>
              <span className="font-serif text-[24px]">
                {chosen.priceLabel}
              </span>
            </div>

            <div className="flex flex-col gap-[16px] p-[24px] text-ink">
              <div className="rounded-[14px] bg-lavender-soft border border-lavender-border p-[14px] text-[13px] text-body">
                <p className="m-0 font-medium text-ink">
                  Order: {simulatedModalOrder.orderId}
                </p>
                <p className="m-0 mt-[4px]">
                  Seeker: {name} (+91 {whatsapp})
                </p>
                <p className="m-0 mt-[4px]">
                  Method: {payMethod.toUpperCase()} · Test Environment
                </p>
              </div>

              <div className="flex flex-col gap-[10px]">
                <button
                  type="button"
                  onClick={() =>
                    verifyPaymentOnServer({
                      bookingId: simulatedModalOrder.bookingId,
                      razorpay_order_id: simulatedModalOrder.orderId,
                      razorpay_payment_id: `pay_test_${Date.now()}`,
                      razorpay_signature: "simulated_valid_signature",
                      simulatedStatus: "paid",
                    })
                  }
                  className="btn-3d-maroon min-h-[50px] w-full rounded-full px-[20px] py-[14px] text-[15px] font-semibold text-white cursor-pointer"
                >
                  Simulate Successful Test Payment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSimulatedModalOrder(null);
                    verifyPaymentOnServer({
                      bookingId: simulatedModalOrder.bookingId,
                      razorpay_order_id: simulatedModalOrder.orderId,
                      razorpay_payment_id: `pay_fail_${Date.now()}`,
                      razorpay_signature: "invalid",
                      simulatedStatus: "failed",
                    });
                  }}
                  className="min-h-[46px] w-full rounded-full border-[1.5px] border-line bg-white px-[20px] py-[12px] text-[14px] font-medium text-ink hover:border-maroon cursor-pointer"
                >
                  Simulate Failed Payment
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedModalOrder(null)}
                  className="min-h-[44px] w-full text-[13px] text-muted hover:text-ink cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
