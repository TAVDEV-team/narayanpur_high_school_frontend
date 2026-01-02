import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, PenTool, NotebookText, Scroll } from "lucide-react"; // fancy icons

import {ListAPI} from "../api/ListAPI"
import Loading from "../components/Loading";




const classes = [
  {
    grade: 6,
    title: "Class 6",
    description: {
      total: 56,
      male: 19,
      female: 37
    },
    icon: <BookOpen size={48} className="text-indigo-600" />
  },
  {
    grade: 7,
    title: "Class 7",
    description: {
      total: 50,
      male: 28,
      female: 22
    },
    icon: <NotebookText size={48} className="text-green-600" />
  },
  {
    grade: 8,
    title: "Class 8",
    description: {
      total: 54,
      male: 23,
      female: 31
    },
    icon: <PenTool size={48} className="text-pink-600" />
  },
  {
    grade: 9,
    title: "Class 9",
    description: {
      total: 45,
      male: 23,
      female: 22
    },
    icon: <Scroll size={48} className="text-yellow-600" />
  },
  {
    grade: 10,
    title: "Class 10",
    description: {
      total: 42,
      male: 20,
      female: 22
    },
    icon: <GraduationCap size={48} className="text-purple-600" />
  },
];


export default function StudentPortal() {
    const {
    data: class_meta,
    loading,
    error,
    page,
    setPage,
    next,
    previous,
  } = ListAPI("/nphs/classes/");
  console.log(class_meta);
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center pt-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/back.avif')" }}
    >
      {/* Heading */}
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        
        <h1 className="w-full text-2xl sm:text-3xl md:text-4xl bg-sky-950 font-bold text-white mb-4 mt-5 rounded-xl py-3 px-4 sm:px-6 shadow-md">
          🎓 Student Portal
        </h1>
        {loading ? ( <Loading message="Classes" />):(
        <p className="inline-block mt-2 text-lg sm:text-xl md:text-2xl bg-sky-900 font-semibold text-white rounded-lg py-2 px-6 sm:px-32 shadow-md">
          Select your class
        </p>)}
      </div>

      
      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {class_meta.map((cls) => (
          <Link
            key={cls.grade}
            to={`/class/${cls.grade}`}
            className="aspect-square rounded-3xl shadow-lg border border-gray-300 flex flex-col items-center justify-center p-5 sm:p-6
               hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
               bg-gradient-to-br from-white to-slate-300"
            aria-label={`Open Class ${cls.grade} dashboard`}
          >
            <div className="mb-4">
              <div className="p-4 rounded-full  shadow-inner">{cls.icon}</div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Class {cls.name}</h2>

            <div className="flex flex-col space-y-1 text-center">
              <span className="text-sm font-medium ">
                Total Students: <span className="font-bold">{cls.total_students}</span>
              </span>
              <span className="text-sm font-medium ">
                Male: <span className="font-bold">{cls.male_students}</span>
              </span>
              <span className="text-sm font-medium ">
                Female: <span className="font-bold">{cls.female_students}</span>
              </span>
            </div>
          </Link>
        ))}


      </div>
    </div>
  );
}
