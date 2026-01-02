import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Pagination from "../components/Pagination";
import {ListAPI} from "../api/ListAPI";
import { Import } from "lucide-react";
import Loading from "../components/Loading";


export default function ClassStudents({grade, group}) {
let class_id;

if (grade === '6') {
  class_id = 1;
} else if (grade === '7') {
  class_id = 2;
} else if (grade === '8') {
  class_id = 3;
} else if (grade === '9') {
  if (group === 'science') {
    class_id = 4;
  } else if (group === 'business') {
    class_id = 6;
  } else if (group === 'humanities') {
    class_id = 8;
  }
} else if (grade === '10') {
  if (group === 'science') {
    class_id = 5;
  } else if (group === 'business') {
    class_id = 7;
  } else if (group === 'humanities') {
    class_id = 9;
  }
}

    const {
    data: students,
    loading,
    error,
    page,
    setPage,
    next,
    previous,
  } = ListAPI(`nphs/classes/${class_id}/students/`);


  if (loading) {
    return <Loading message="Students" />;
  }

  return (
   <div className="min-h-screen flex flex-col bg-sky-50 mt-16">
  <div className="flex-1 py-10 px-4">

    <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center bg-blue-950 rounded-xl py-2 px-8 shadow-lg mt-5">
      Class {grade}
      {group ? ` - ${group.charAt(0).toUpperCase() + group.slice(1)}` : ""} 
    </h1>

    {/* Empty state */}
    {students.length === 0 ? (
      <p className="text-gray-500 text-center text-lg">
        {/* No students found {group ? `for ${group}` : ""}. */}
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
        key={student.id}
        className="flex flex-row items-center sm:items-start gap-4 bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-200 p-5"
      >

            {/* Student Image */}
            <img
              src={student.image || " "}
              alt={student.full_name }
              className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-indigo-200"
            />

            {/* Student Info */}
            <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-left flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {student.full_name?.trim()}
              </h2>
              <p className="text-gray-600 text-base mt-1">
                <span className="font-semibold">Roll:</span> {student.roll_number}
              </p>
              <p className="text-gray-600 text-base mt-1">
                <span className="font-semibold">Religion:</span> {student.religion}
              </p>
              <p className="text-gray-600 text-base mt-1">
                <span className="font-semibold">Gender:</span> {student.gender}
              </p>
             

            </div>
          </div>
        ))}
      </div>
    )}
  </div>
      <div className="mt-auto">
      <Pagination
        page={page}
        next={next}
        previous={previous}
        onPageChange={setPage}
      />
    </div>

</div>

  );
}
