import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { ListAPI } from "../../api/ListAPI";
import Loading from "../../components/Loading";

export default function Results() {
  const [aclass, setAclass] = useState("");
  const [exam, setExam] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  const [student, setStudent] = useState(null);
  const [status, setStatus] = useState("idle"); 
  // idle | loading | student_found | result_loading | result_found | no_result | error

  const [results, setResults] = useState([]);

  const { data: exams } = ListAPI("/result/exam/");

  const classes = [
    { id: 1, name: "6" },
    { id: 2, name: "7" },
    { id: 3, name: "8" },
    { id: 4, name: "9 Science" },
    { id: 5, name: "10 Science" },
  ];

  const handleSearch = async () => {
    if (!aclass || !exam || !rollNumber) return;

    try {
      setStatus("loading");

      // 1️⃣ Resolve student
      const studentRes = await API.get(
        `/nphs/classes/${aclass}/students/lookup/?roll_number=${rollNumber}`
      );

      if (studentRes.data.length === 0) {
        setStudent(null);
        setResults([]);
        setStatus("error");
        return;
      }

      const resolvedStudent = studentRes.data[0];
      setStudent(resolvedStudent);

      // 2️⃣ Fetch results
      setStatus("result_loading");
      const resultRes = await API.get(
        `/result/?exam=${exam}&student=${resolvedStudent.id}`
      );

      if (resultRes.data.results.length === 0) {
        setResults([]);
        setStatus("no_result");
        return;
      }

      setResults(resultRes.data.results);
      setStatus("result_found");

    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Check Your Result</h1>
          <p className="text-gray-600 mt-2">
            Enter your details to view your academic result
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={aclass}
              onChange={(e) => setAclass(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Select Exam</option>
              {exams.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.exam_title}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Search Result
          </button>
        </div>

        {/* Status */}
        {status === "loading" || status === "result_loading" ? (
          <div className="text-center mt-6">
            <Loading message="Fetching result..." />
          </div>
        ) : null}

        {status === "error" && (
          <p className="text-center text-red-600 mt-6">
            Student or result not found.
          </p>
        )}

        {status === "no_result" && (
          <p className="text-center text-gray-700 mt-6">
            Result has not been published yet.
          </p>
        )}

        {/* Result */}
        {status === "result_found" && (
          <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {student.full_name}
              </h2>
              <p className="text-gray-600">
                Roll: {student.roll_number}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="py-2 px-3 text-left">Subject</th>
                    <th className="py-2 px-3">MCQ</th>
                    <th className="py-2 px-3">Written</th>
                    <th className="py-2 px-3">Practical</th>
                    <th className="py-2 px-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.id} className="border-t text-center">
                      <td className="py-2 px-3 text-left">{r.subject_name}</td>
                      <td>{r.mcq}</td>
                      <td>{r.written}</td>
                      <td>{r.practical}</td>
                      <td className="font-semibold">
                        {r.mcq + r.written + r.practical}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
