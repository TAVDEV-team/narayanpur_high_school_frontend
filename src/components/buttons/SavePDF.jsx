// import { Printer } from "lucide-react";

// export default function GalleryPage() {
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div>
//       <button
//         onClick={handlePrint}
//         className="flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition"
//       >
//         <Printer className="w-5 h-5" />
//         Save Pdf
//       </button>
//     </div>
//   );
// }

import html2pdf from "html2pdf.js";
import { FileDown } from "lucide-react";

export default function SavePDF({ targetRef, filename = "result.pdf" }) {
  const handleSave = () => {
    if (!targetRef?.current) return;

    const options = {
      margin: 0.3,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(targetRef.current)
      .save();
  };

  return (
    <button
      onClick={handleSave}
      className="inline-flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-lg shadow"
    >
      <FileDown className="w-4 h-4" />
      Save PDF
    </button>
  );
}

