"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const PROGRAMS = [
  {
    title: "Become a Reseller",
    desc: "Sell Lamonte with no stock pressure. Reseller pricing, ready-to-share content, one-click WhatsApp product sharing.",
    tag: "START SMALL",
  },
  {
    title: "Become an Agent",
    desc: "Hold light stock, serve your city. Agent price list, repeat orders and marketing materials included.",
    tag: "GROW LOCAL",
  },
  {
    title: "Become a Distributor",
    desc: "Territory-level partnership. Distributor pricing, bulk quick order, MOQ clarity and dedicated support.",
    tag: "SCALE UP",
  },
  {
    title: "Affiliate Program",
    desc: "Share your unique link, earn on every qualified order. Transparent commission lifecycle and real-time dashboard.",
    tag: "EARN ONLINE",
  },
  {
    title: "Marketer Program",
    desc: "Run campaigns with Lamonte assets. Performance-based commission, campaign tracking, monthly payouts.",
    tag: "PERFORMANCE",
  },
  {
    title: "Corporate Orders",
    desc: "Uniforms and apparel for companies — polo shirts, jackets, hospitality and healthcare lines, custom branding.",
    tag: "B2B",
  },
  {
    title: "Government Procurement",
    desc: "Uniform & apparel procurement for institutions, education and public sector. RFQ workflow, powered by LMI Indonesia.",
    tag: "B2G",
  },
];

export default function Business() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="pb-24">
      {/* hero */}
      <section className="bg-[#0a0a0a] text-white py-24 md:py-36 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="label-caps-lg text-[#9a9a9a] mb-6">LAMONTE FOR BUSINESS</p>
            <h1 className="font-editorial font-light text-5xl md:text-7xl leading-[1.02]">
              Grow with <em>Lamonte.</em>
            </h1>
            <p className="text-[#b5b5b5] mt-8 max-w-xl mx-auto leading-relaxed">
              One brand, many ways to build with us — resale, distribution,
              affiliate growth, and enterprise procurement on shared commerce
              infrastructure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* programs */}
      <section className="px-6 md:px-10 max-w-[1600px] mx-auto -mt-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="bg-white border border-[#e6e6e6] p-8 h-full flex flex-col hover:border-[#0a0a0a] transition-colors">
                <p className="label-caps !text-[9px] text-muted">{p.tag}</p>
                <h2 className="font-editorial text-3xl mt-3">{p.title}</h2>
                <p className="text-[13px] text-muted mt-4 leading-relaxed flex-1">
                  {p.desc}
                </p>
                <a href="#apply" className="label-caps link-underline mt-6 self-start">
                  LEARN MORE →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* procurement strip */}
      <section className="px-6 md:px-10 max-w-[1600px] mx-auto mt-24">
        <Reveal>
          <div className="bg-cream p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="label-caps text-muted">LAMONTE PROCUREMENT — POWERED BY LMI INDONESIA</p>
              <h2 className="font-editorial font-light text-4xl md:text-5xl mt-4 leading-tight">
                Uniform & apparel procurement, end to end.
              </h2>
              <p className="text-muted mt-6 leading-relaxed max-w-md">
                From RFQ to delivery: specification, sampling, quotation,
                production, QC and documentation — tracked in one transparent
                project timeline.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#apply" className="bg-[#0a0a0a] text-white label-caps px-8 py-4">
                  REQUEST QUOTATION
                </a>
                <a href="#apply" className="border border-[#0a0a0a] label-caps px-8 py-4">
                  SUBMIT RFQ
                </a>
              </div>
            </div>
            <div className="space-y-0 text-[13px]">
              {[
                ["Specification", true],
                ["Sampling", true],
                ["Quotation", true],
                ["PO / SPK", true],
                ["Production", false],
                ["QC & Delivery", false],
              ].map(([label, done], i) => (
                <div key={i} className="flex items-center gap-4 border-b border-[#dcdad4] py-4">
                  <span
                    className={`w-5 h-5 border flex items-center justify-center text-[10px] ${
                      done ? "bg-[#0a0a0a] border-[#0a0a0a] text-white" : "border-[#b5b5b5]"
                    }`}
                  >
                    {done ? "✓" : ""}
                  </span>
                  <span className={done ? "" : "text-muted"}>{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* application form */}
      <section id="apply" className="px-6 md:px-10 max-w-2xl mx-auto mt-24 scroll-mt-24">
        <Reveal>
          <p className="label-caps text-muted text-center">PARTNER APPLICATION — STEP 1 OF 3</p>
          <h2 className="font-editorial font-light text-4xl md:text-5xl text-center mt-4">
            Start the conversation.
          </h2>
          {submitted ? (
            <div className="text-center mt-12 border border-[#e6e6e6] p-12">
              <p className="font-editorial italic text-3xl">Application received.</p>
              <p className="text-muted mt-4 text-sm leading-relaxed">
                Our partnership team will contact you via WhatsApp within 2
                business days for qualification.
              </p>
            </div>
          ) : (
            <form
              className="mt-12 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid grid-cols-2 gap-5">
                <BizField label="FULL NAME" placeholder="Your name" />
                <BizField label="WHATSAPP" placeholder="+62" />
              </div>
              <BizField label="EMAIL" type="email" placeholder="you@company.com" />
              <div className="grid grid-cols-2 gap-5">
                <BizField label="CITY" placeholder="Jakarta" />
                <label className="block">
                  <span className="label-caps !text-[10px] text-muted">INTERESTED PROGRAM</span>
                  <select className="w-full mt-2 border border-[#d4d4d4] focus:border-[#0a0a0a] outline-none px-4 py-3 text-sm bg-white">
                    {PROGRAMS.map((p) => (
                      <option key={p.title}>{p.title}</option>
                    ))}
                  </select>
                </label>
              </div>
              <button className="w-full bg-[#0a0a0a] text-white label-caps py-5 hover:bg-[#2a2a2a] transition-colors">
                SUBMIT APPLICATION
              </button>
              <p className="text-[11px] text-muted text-center">
                Role and price list are activated after review and approval.
              </p>
            </form>
          )}
        </Reveal>
      </section>
    </main>
  );
}

function BizField({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="label-caps !text-[10px] text-muted">{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="w-full mt-2 border border-[#d4d4d4] focus:border-[#0a0a0a] outline-none px-4 py-3 text-sm transition-colors"
      />
    </label>
  );
}
