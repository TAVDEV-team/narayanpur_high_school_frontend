// src/pages/AdmissionDocuments.jsx
import React from "react";

export default function AdmissionDocuments() {
  const documents = [
    {
      title: "Birth Certificate Photocopy",
      note: "( 2 copies)",
      desc: "Photocopy of the student's birth registration.",
    },
    {
      title: "Transfer Certificate",
      desc: "From the previous school (if transferring).",
    },
    {
      title: "Report Card / Progress Report",
      desc: "Last academic year's result sheet.",
    },
    {
      title: "Student's Photographs",
      desc: "2 recent passport-size color photographs.",
    },
    {
      title: "Parent/Guardian's National ID",
      desc: "Photocopy for verification.",
    },
    {
      title: "Medical Fitness Certificate",
      desc: "From a registered doctor (if required).",
    },
    {
      title: "Proof of Address",
      desc: "Utility bill copy / rent agreement (if applicable).",
    },
  ];

  const fees = [
    { cls: "Class 6", monthly: 200, admission: 100, common: 1000, total: 1300 },
    { cls: "Class 7", monthly: 250, admission: 150, common: 1000, total: 1400 },
    { cls: "Class 8", monthly: 300, admission: 200, common: 1000, total: 1500 },
    { cls: "Class 9", monthly: 350, admission: 250, common: 1000, total: 1600 },
    { cls: "Class 10", monthly: 350, admission: 250, common: 1000, total: 1600 },
  ];

  return (
    <section className="bg-gray-50 py-10 sm:py-16 px-4 sm:px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          📄 Admission
        </h1>

        {/* Admission Fee Structure */}
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            💰 Admission fees
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-300 border border-gray-300 rounded-lg overflow-hidden text-sm sm:text-base">
            {fees.map((fee, index) => (
              <div key={index} className="p-4 text-gray-700">
                <p className="font-bold text-gray-800 text-center border-b pb-2 mb-3">
                  {fee.cls}
                </p>
                <p>Monthly fee = ৳{fee.monthly}</p>
                <p>Admission fee = ৳{fee.admission}</p>
                <p>Common fees = ৳{fee.common}</p>
                <p className="font-bold border-t mt-2 pt-2">Total = ৳{fee.total}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-800 mb-2">
              Common fees includes (Applicable for all classes)
            </h3>
            <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm sm:text-base">
              <li>Admission Form Fee: ৳100</li>
              <li>Teacher Welfare Fee: ৳100</li>
              <li>Sports Fee: ৳200</li>
              <li>Scout Fee: ৳25</li>
              <li>Library Fee: ৳75</li>
              <li>Development Fee: ৳400</li>
              <li>Science Lab Fee: ৳75</li>
              <li>Red Crescent & BNCC Fee: ৳25</li>
            </ul>
            <p className="mt-3 pt-3 border-t border-blue-200 font-bold text-blue-800">
              Total: ৳1000
            </p>
          </div>
        </div>

        {/* Documents List */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 mt-16">
          Documents required to Apply
        </h2>
        <ul className="space-y-4">
          {documents.map((item, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 border-b pb-3"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold mb-1 sm:mb-0">
                {index + 1}
              </span>
              <div>
                <p className="text-gray-800 font-bold text-sm sm:text-base">
                  {item.title}
                  {item.note ? ` ${item.note}` : ""}
                </p>
                <p className="text-gray-600 text-sm sm:text-base font-normal">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Submission Details */}
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
            🕒 Submission Details
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-4 text-sm sm:text-base">
            <li>
              <strong>Where to Submit:</strong>
              <br />
              <span className="ml-5">School Office (Administration Desk)</span>
            </li>
            <li>
              <strong>Office Hours:</strong>
              <br />
              <span className="ml-5">Sunday – Thursday, 8:00 AM – 4:00 PM</span>
            </li>
            <li>
              <strong>Contact:</strong>
              <br />
              <span className="ml-5">
                +8801819823733 |{" "}
                <a
                  href="mailto:sn105409@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  sn105409@gmail.com
                </a>
              </span>
            </li>
          </ul>
        </div>

        {/* Important Notes */}
        <div className="mt-10 bg-yellow-50 p-4 sm:p-5 rounded-lg border-l-4 border-yellow-400">
          <h2 className="text-lg sm:text-xl font-semibold text-yellow-800 mb-2">
            ⚠ Important Notes
          </h2>
          <ul className="list-disc list-inside text-yellow-700 space-y-1 text-sm sm:text-base">
            <li>All documents must be submitted in a clear and legible format.</li>
            <li>Incomplete applications will not be accepted.</li>
            <li>Keep a photocopy of all submitted documents for your own record.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}