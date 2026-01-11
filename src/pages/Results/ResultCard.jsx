import React, { useState, useRef } from "react";
import API from "../../api/api";
import { ListAPI } from "../../api/ListAPI";
import Loading from "../../components/Loading";
import SavePDF from "../../components/buttons/SavePDF";
import { Percent, Hash } from "lucide-react";

export default function ResultCard() {
  const [aclass, setAclass] = useState("");
  const [exam, setExam] = useState("");
  const [roll, setRoll] = useState("");

  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: exams = [] } = ListAPI("/result/exam/");

  const resultRef = useRef(null);


  const classes = [
    { id: 1, name: "6" },
    { id: 2, name: "7" },
    { id: 3, name: "8" },
    { id: 4, name: "9 Science" },
    { id: 5, name: "10 Science" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!aclass || !exam || !roll) return;

    setStatus("loading");
    setErrorMessage("");
    setResult(null);

    try {
      const studentRes = await API.get(
        `/nphs/classes/${aclass}/students/lookup/?roll_number=${roll}`
      );

      if (!studentRes.data.length) {
        setStatus("error");
        setErrorMessage("No student found for this roll number.");
        return;
      }

      const studentId = studentRes.data[0].id;

      const res = await API.get(
        `/result/card/${aclass}/${exam}/${studentId}/`
      );

      setResult(res.data);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Failed to fetch result.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 px-4 py-10">
      <div className="max-w-6xl mx-auto mt-16">

        {/* ===== HEADER ===== */}
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-wide text-gray-800 mr-auto">
            Check Your Result
          </h1>
          {status === "success" && (
          <SavePDF
            targetRef={resultRef}
            filename={`Result_${result.student.roll}.pdf`}
          />
        )}

        </div>

        {/* ===== SEARCH FORM ===== */}
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <select
              value={aclass}
              onChange={(e) => setAclass(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Select Exam</option>
              {exams.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.exam_title}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Roll Number"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />

            <button
              type="submit"
              className="bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              {status === "loading" ? "Searching..." : "View Result"}
            </button>
          </form>

          {status === "error" && (
            <p className="text-red-600 mt-4">{errorMessage}</p>
          )}
        </div>

        {/* ===== RESULT CARD ===== */}
        {status === "loading" && <Loading message="Loading result..." />}

        {status === "success" && result && (
        <div ref={resultRef} className="bg-white rounded-xl shadow p-6">


            {/* School */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">{result.school}</h2>
              <p className="text-gray-600">{result.address}</p>
              <p className="font-semibold mt-1">{result.exam}</p>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-700">
              <Info label="Name" value={result.student.name} />
              <Info label="Roll" value={result.student.roll} />
              <Info label="Class" value={result.student.class} />
              <Info label="Batch" value={result.student.batch} />
              <Info label="DOB" value={result.student.date_of_birth} />
              <Info label="Gender" value={result.student.gender} />
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
              <Summary
                label="Total Marks"
                value={`${result.total_obtained}/${result.total_possible}`}
              />
              <Summary
                label="Percentage"
                value={`${result.percentage.toFixed(2)}%`}
                icon={<Percent className="w-5 h-5 mx-auto" />}
              />
              <Summary
                label="Status"
                value={result.status}
                color={
                  result.status === "FAILED"
                    ? "text-red-600"
                    : "text-green-600"
                }
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2 text-left">Subject</th>
                    <th className="border px-3 py-2">MCQ</th>
                    <th className="border px-3 py-2">Written</th>
                    <th className="border px-3 py-2">Practical</th>
                    <th className="border px-3 py-2">Obtained</th>
                    <th className="border px-3 py-2">%</th>
                    <th className="border px-3 py-2">Grade</th>
                    <th className="border px-3 py-2">Highest</th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border px-3 py-2 text-left">
                        {r.subject.name.replace(/\s*\(6-8\)/g, "")}
                      </td>
                      <td className="border px-3 py-2 text-center">{r.result.mcq}</td>
                      <td className="border px-3 py-2 text-center">{r.result.written}</td>
                      <td className="border px-3 py-2 text-center">{r.result.practical}</td>
                      <td className="border px-3 py-2 text-center">{r.result.obtained}</td>
                      <td className="border px-3 py-2 text-center">{r.result.percentage}</td>
                      <td className="border px-3 py-2 text-center">{r.result.grade}</td>
                      <td className="border px-3 py-2 text-center">{r.highest_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Rank */}
            <div className="mt-6 text-center font-bold text-indigo-600 flex items-center justify-center gap-2">
              <Hash className="w-5 h-5" />
              Class Rank: {result.class_rank}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== Helpers ===== */

const Info = ({ label, value }) => (
  <p>
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

const Summary = ({ label, value, color = "text-gray-800", icon }) => (
  <div className="bg-blue-50 rounded-lg py-4 font-semibold">
    {icon}
    <p className="text-sm text-gray-600">{label}</p>
    <p className={`text-lg ${color}`}>{value}</p>
  </div>
);
