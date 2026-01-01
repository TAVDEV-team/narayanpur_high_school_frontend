import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import { ClipboardList, FileText, Award } from "lucide-react";
import Loading from "../components/Loading";
import { ListAPI } from "../api/ListAPI";

const examapi = "/result/exam/";

export default function ExamCard() {
    const {
    data: exams,
    loading,
    error,
    page,
    setPage,
    next,
    previous,
  } = ListAPI(examapi);
  // Map exam titles to icons (fallback → ClipboardList)
  const iconMap = {
    test: <ClipboardList size={48} className="text-blue-600" />,
    half: <FileText size={48} className="text-green-600" />,
    final: <Award size={48} className="text-purple-600" />,
  };


  if (loading) {
    return <Loading message="exams"/>;
    
  }

  if (error) {
    return <p className="text-center text-red-600 py-10">{error}</p>;
  }

  return (
    <section className="bg-sky-50 pb-10">
      <div className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-2xl font-bold text-center mb-8 mt-10 bg-blue-950 text-white rounded-2xl py-4">
          📑 Select Exam
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Link
              key={exam.id}
              to={`/results/${exam.id}`}
              className="aspect-square rounded-3xl shadow-lg border border-gray-300 flex flex-col items-center justify-center p-5 sm:p-6
                 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                 bg-gradient-to-br from-white to-slate-300"
            >
              <div className="mb-4">
                {iconMap[exam.exam_title.toLowerCase()] ||
                  <ClipboardList size={48} className="text-gray-600" />}
              </div>
              <h2 className="text-lg font-semibold">{exam.exam_title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
