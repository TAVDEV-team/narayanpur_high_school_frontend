// src/pages/AdmissionDocuments.jsx
import React from "react";
import { AlertTriangle, Banknote, Clock, FileText, Files } from "lucide-react";

// common fees
const commonFees = [
  { label: "Admission Form Fee", amount: 100 },
  { label: "Teacher Welfare Fee", amount: 100 },
  { label: "Sports Fee", amount: 200 },
  { label: "Scout Fee", amount: 25 },
  { label: "Library Fee", amount: 75 },
  { label: "Development Fee", amount: 400 },
  { label: "Science Lab Fee", amount: 75 },
  { label: "Red Crescent & BNCC Fee", amount: 25 },
];

const commonFeesTotal = commonFees.reduce((sum, fee) => sum + fee.amount, 0);

// each class fees
const classFees = [
  { label: "Class 6", monthly: 200, admission: 100 },
  { label: "Class 7", monthly: 250, admission: 150 },
  { label: "Class 8", monthly: 300, admission: 200 },
  { label: "Class 9", monthly: 350, admission: 250 },
  { label: "Class 10", monthly: 350, admission: 250 },
];

const requiredDocuments = [
  {
    title: "Birth Certificate",
    description: "Photocopy of the student’s birth registration.",
  },
  {
    title: "Transfer Certificate",
    description: "From the previous school (if transferring).",
  },
  {
    title: "Report Card / Progress Report",
    description: "Last academic year’s result sheet.",
  },
  {
    title: "Student’s Photographs",
    description: "2 recent passport-size color photographs.",
  },
  {
    title: "Parent/Guardian’s National ID",
    description: "Photocopy for verification.",
  },
  {
    title: "Medical Fitness Certificate",
    description: "From a registered doctor (if required).",
  },
  {
    title: "Proof of Address",
    description: "Utility bill copy / rent agreement (if applicable).",
  },
];

const importantNotes = [
  "All documents must be submitted in a clear and legible format.",
  "Incomplete applications will not be accepted.",
  "Keep a photocopy of all submitted documents for your own record.",
];


const serif = "font-['Playfair_Display',Georgia,serif]";

const taka = (amount) => `৳${amount}`;

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="mt-10 mb-3 flex items-center gap-2">
      <Icon className="h-5 w-5 text-[#9A6B00]" aria-hidden="true" />
      <h2 className={`${serif} text-xl font-bold text-[#0A1F6B] sm:text-2xl`}>
        {children}
      </h2>
    </div>
  );
}

// A list item with a small gold dot instead of the default bullet.
function BulletItem({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C99A1E]" />
      <span>{children}</span>
    </li>
  );
}


export default function AdmissionDocuments() {
  return (
    <section className="bg-[#F7F8FC] px-4 py-10 font-['Inter',sans-serif] sm:px-6 sm:py-16 md:px-20">
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#E3E7F2] bg-white p-6 shadow-sm sm:p-8 md:p-12">
        {/* Page heading */}
        <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#9A6B00]">
          <span className="h-px w-8 bg-[#9A6B00]" />
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>Admission</span>
          <span className="h-px w-8 bg-[#9A6B00]" />
        </div>

        <h1
          className={`${serif} mt-3 text-center text-2xl font-bold text-[#0A1F6B] sm:text-3xl md:text-4xl`}
        >
          Admission Information
        </h1>

        <p className="mt-3 text-center text-sm leading-relaxed text-[#4A5373] sm:text-base">
          To complete the admission process at{" "}
          <strong className="font-semibold text-[#0A1F6B]">
            Narayanpur High School
          </strong>
          , please follow these necessary steps while submitting the admission
          form.
        </p>

        {/* Admission fees */}
        <div className="mt-8 overflow-hidden rounded-xl border border-[#D5DBEE]">
          <div className="flex items-center gap-2 bg-[#00237A] px-4 py-3">
            <Banknote className="h-5 w-5 text-[#F5C518]" aria-hidden="true" />
            <h2 className={`${serif} text-base font-bold text-white sm:text-lg`}>
              Admission Fee for all classes
            </h2>
          </div>

          {classFees.map((item) => {
            const total = item.monthly + item.admission + commonFeesTotal;

            return (
              <div
                key={item.label}
                className="flex flex-col gap-2 border-t border-[#E3E7F2] px-4 py-3 first:border-t-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-[#0A1F6B]">{item.label}</p>
                  <p className="text-xs text-[#5A6280] sm:text-sm">
                    Monthly Fee {taka(item.monthly)} · Admission Fee{" "}
                    {taka(item.admission)} · Common Fees{" "}
                    {taka(commonFeesTotal)}
                  </p>
                </div>

                <span className="self-start whitespace-nowrap rounded-md bg-[#EEF1FA] px-3 py-1 text-sm font-semibold text-[#00237A] sm:self-auto">
                  Total {taka(total)}
                </span>
              </div>
            );
          })}

          {/* Common fees */}
          <div className="border-t border-[#D5DBEE] bg-[#F1F4FC] px-4 py-4">
            <h3 className="mb-2 text-sm font-semibold text-[#00237A] sm:text-base">
              Common Fees (Applicable for All Classes)
            </h3>
            <ul className="grid gap-x-6 gap-y-1 text-sm text-[#2B365F] sm:grid-cols-2">
              {commonFees.map((fee) => (
                <BulletItem key={fee.label}>
                  {fee.label}: {taka(fee.amount)}
                </BulletItem>
              ))}
            </ul>
          </div>
        </div>

        {/* Required documents */}
        <SectionTitle icon={Files}>Required Documents</SectionTitle>
        <ul>
          {requiredDocuments.map((doc, index) => (
            <li
              key={doc.title}
              className="flex gap-3 border-b border-[#E8ECF6] py-3 last:border-b-0"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00237A] text-xs font-semibold text-white">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-[#0A1F6B]">{doc.title}</p>
                <p className="text-sm text-[#5A6280]">{doc.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Submission details */}
        <SectionTitle icon={Clock}>Submission Details</SectionTitle>
        <ul className="space-y-1 text-sm text-[#2B365F] sm:text-base">
          <BulletItem>
            <strong className="font-semibold text-[#0A1F6B]">
              Where to Submit:
            </strong>{" "}
            School Office (Administration Desk)
          </BulletItem>
          <BulletItem>
            <strong className="font-semibold text-[#0A1F6B]">
              Office Hours:
            </strong>{" "}
            Sunday – Thursday, 8:00 AM – 4:00 PM
          </BulletItem>
          <BulletItem>
            <strong className="font-semibold text-[#0A1F6B]">Contact:</strong>{" "}
            +8801819823733 |{" "}
            <a
              href="mailto:sn105409@gmail.com"
              className="text-[#00237A] underline underline-offset-2 hover:text-[#9A6B00]"
            >
              sn105409@gmail.com
            </a>
          </BulletItem>
        </ul>

        {/* Important notes */}
        <div className="mt-10 border-l-4 border-[#E0A800] bg-[#FFF8E1] p-4 sm:p-5">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-[#7A5200] sm:text-xl">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            Important Notes
          </h2>
          <ul className="space-y-1 text-sm text-[#7A5200] sm:text-base">
            {importantNotes.map((note) => (
              <BulletItem key={note}>{note}</BulletItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
