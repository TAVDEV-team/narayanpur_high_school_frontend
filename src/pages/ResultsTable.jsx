  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import SavePDF from "../components/buttons/SavePDF"; 
  import API from "../api/api";

  import {
    Users,
    CheckCircle2,
    XCircle,
    Percent,
    FileDown,
    Hash,
    Loader2,
  } from "lucide-react";


  import Loading from "../components/Loading";

  export default function ClassResult() {
    const { examId, classId } = useParams();

    const [results, setResults] = useState([]);
    const [summary, setSummary] = useState({
      class: "",
      exam: "",
      total_students: 0,
      total_marks: 0,
      overall_percentage: 0,
      passed: 0,
      failed: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const statusColors = {
      PASSED: "text-green-600",
      FAILED: "text-red-600",
      ABSENT: "text-gray-600",
    };
  // const handleDownload = async (studentId) => {
  //   try {
  //     const response = await API.get(
  //       `/result/card_pdf/${examId}/${classId}/${studentId}/`,
  //       { responseType: "blob" }
  //     );

  //     const blob = new Blob([response.data], {
  //       type: "application/pdf",
  //     });

  //     const url = window.URL.createObjectURL(blob);

  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = `result_card_${studentId}.pdf`;
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();

  //     window.URL.revokeObjectURL(url);
  //   } catch (err) {
  //     console.error("PDF download failed", err);
  //     alert("Failed to download PDF");
  //   }
  // };


    useEffect(() => {
      API
        .get(
          `/result/class_fast/${classId}/${examId}/`
          // `/result/class_fast/2/1/`
        )
        .then((res) => {
          setResults(res.data.student_results || []);
          console.log(res.data)
          setSummary({
            class: res.data.class,
            exam: res.data.exam,
            total_students: res.data.total_students,
            total_marks: res.data.total_marks,
            overall_percentage: res.data.overall_percentage,
            passed: res.data.passed,
            failed: res.data.failed,
          });
          setLoading(false);
          
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
    }, [examId, classId]);
    console.log(examId, classId)

    if (loading) {
      return (
        <Loading message="Loading Result"/>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 text-red-600 font-semibold">
          Failed to load results. Please try again later.
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 mt-12">
        {/* --- Header --- */}
        <div className="text-center mb-8 flex mt-8  ">
          <h1 className=" mr-auto text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-lg py-6 round-lg">
            Class: {summary.class.toUpperCase()} — {summary.exam.toUpperCase()}
          </h1>
          {/* <SavePDF/> */}
        </div>

        {/* --- Summary Section --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <SummaryCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            label="Total Students"
            value={summary.total_students}
            bg="bg-blue-50"
          />
          <SummaryCard
            icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
            label="Passed"
            value={summary.passed}
            bg="bg-green-50"
          />
          <SummaryCard
            icon={<XCircle className="w-6 h-6 text-red-600" />}
            label="Failed"
            value={summary.failed}
            bg="bg-red-50"
          />
          <SummaryCard
            icon={<Percent className="w-6 h-6 text-yellow-600" />}
            label="Overall"
            value={`${summary.overall_percentage} %`}
            bg="bg-yellow-50"
          />
        </div>

        {/* --- Results Table --- */}
        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border px-4 py-2">Roll</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Obtained / {summary.total_marks}</th>
                <th className="border px-4 py-2">Percentage</th>
                <th className="border px-4 py-2">Rank</th>
                <th className="border px-4 py-2">Status</th>
                {/* <th className="border px-4 py-2">Certificate</th> */}
              </tr>
            </thead>
            <tbody>
              {results.map((res, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-2 text-center font-semibold">
                    {res.roll}
                  </td>
                  <td className="border px-4 py-2">{res.name || "N/A"}</td>
                  <td className="border px-4 py-2 text-center">
                    {res.obtained}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {res.percentage}%
                  </td>
                  <td className="border px-4 py-2 text-center font-bold text-indigo-600 flex items-center justify-center gap-1">
                    <Hash className="w-4 h-4" />
                    {res.rank}
                  </td>
                  <td
                    className={`border px-4 py-2 text-center font-semibold ${
                      statusColors[res.status] || "text-gray-600"
                    }`}
                  >
                    {res.status}
                  </td>
                {/* <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDownload(res.id)}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md"
                    >
                      <FileDown className="w-4 h-4" />
                      Download
                    </button>
                  </td> */}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* --- Reusable Summary Card --- */
  function SummaryCard({ icon, label, value, bg }) {
    return (
      <div className={`${bg} p-5 rounded-xl shadow flex flex-col items-center`}>
        {icon}
        <h4 className="text-sm text-gray-600 mt-2">{label}</h4>
        <p className="text-xl font-bold">{value}</p>
      </div>
    );
  }
