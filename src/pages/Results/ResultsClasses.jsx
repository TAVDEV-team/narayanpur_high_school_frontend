import React from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, GraduationCap, PenTool, NotebookText, Scroll } from "lucide-react";

const classes = [
  { classId: 1, title: "Class 6", male: 19, female: 37, total: 56, icon: <BookOpen size={48} className="text-indigo-600" /> },
  { classId:  2, title: "Class 7", male: 28, female: 22, total: 50, icon: <NotebookText size={48} className="text-green-600" /> },
  { classId: 8, title: "Class 8", male: 23, female: 31, total: 54, icon: <PenTool size={48} className="text-pink-600" /> },
  { classId: 9, title: "Class 9", male: 23, female: 22, total: 45, icon: <Scroll size={48} className="text-yellow-600" /> },
  { classId: 10, title: "Class 10", male: 20, female: 22, total: 42, icon: <GraduationCap size={48} className="text-purple-600" /> },
];

export default function ResultsClasses() {
  const { examId } = useParams();

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 mt-20 min-h-96">
      <h1 className="text-2xl font-bold text-center mb-8 mt-10">
        Select Class
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {classes.map((cls) => (
          <Link
            key={cls.classId}
            to={`/results/${examId}/${cls.classId}`}
            className="aspect-square rounded-3xl shadow-lg border border-gray-300 flex flex-col items-center justify-center p-5 sm:p-6
               hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
               bg-gradient-to-br from-white to-slate-300"
          >
            <div className="mb-4">{cls.icon}</div>
            <h2 className="text-lg font-bold">{cls.title}</h2>
            <div className="text-sm text-center">
              <p>Total: {cls.total}</p>
              <p>Male: {cls.male}</p>
              <p>Female: {cls.female}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
