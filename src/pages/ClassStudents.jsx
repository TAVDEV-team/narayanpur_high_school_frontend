import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

export default function ClassStudents() {
  const { grade, group } = useParams();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);


  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/user/students/?page=${page}`);

      //save pagination info
      setNext(res.data.next);
      setPrevious(res.data.previous);

      //filter ONLY current page results
      let filtered;

      if (group && group !== "all") {
        filtered = res.data.results.filter(
          (student) =>
            student.aclass.startsWith(`Class ${grade}`) &&
            student.group &&
            student.group.toLowerCase() === group.toLowerCase()
        );
      } else {
        filtered = res.data.results.filter((student) =>
          student.aclass.startsWith(`Class ${grade}`)
        );
      }

      setStudents(filtered);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  //re-fetch when grade, group, or page changes
  useEffect(() => {
    fetchStudents();
  }, [grade, group, page]);

  if (loading) {
    return <Loading message="Students" />;
  }

  return (
   <div className="min-h-screen bg-sky-50 py-10 px-4 mt-16">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center bg-blue-950 rounded-xl py-2 px-8 shadow-lg mt-5">
      Class {grade}
      {group ? ` - ${group.charAt(0).toUpperCase() + group.slice(1)}` : ""} 
    </h1>

    {/* Empty state */}
    {students.length === 0 ? (
      <p className="text-gray-500 text-center text-lg">
        No students found {group ? `for ${group}` : ""}.
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
        key={student.account.id}
        className="flex flex-row items-center sm:items-start gap-4 bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-200 p-5"
      >

            {/* Student Image */}
            <img
              src={student.account.image || "https://ysrjaxciwztrqvwwjzmp.supabase.co/storage/v1/object/public/media/Accounts/default.png"}
              alt={student.account.full_name || student.account.user.username}
              className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-indigo-200"
            />

            {/* Student Info */}
            <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-left flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {student.account.full_name?.trim() || student.account.user.username}
              </h2>
              <p className="text-gray-600 text-base mt-1">
                <span className="font-semibold">Roll:</span> {student.roll_number}
              </p>
              <p className="text-gray-600 text-base mt-1">
                <span className="font-semibold">Religion:</span> {student.account.display_religion}
              </p>
              <p className="text-gray-600 text-base mt-1">
                <span className="font-semibold">Gender:</span> {student.account.display_gender}
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
