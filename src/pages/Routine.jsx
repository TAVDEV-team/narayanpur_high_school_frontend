import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api/api";
import Loading from "../components/Loading";

export default function Routine() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [routine, setRoutine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [teachers, setTeachers] = useState({});
  const [subjects, setSubjects] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editableRoutine, setEditableRoutine] = useState([]);

  // Fetch routine for a given class
  const fetchRoutine = async (classId) => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await API.get("/nphs/routine/");

      // Filter routines of selected class
      const classRoutine = res.data.filter(
        (r) => Number(r.aclass) === Number(classId)
      );

      setRoutine(classRoutine);
      setSelectedClass(classId);
      setStatus("success");
    } catch (err) {
      console.error("Error fetching routine:", err);
      setRoutine([]);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await API.get("/nphs/subject/");
        const subjectMap = {};
        res.data.forEach((s) => {
          subjectMap[s.id] = s.name;
        });
        setSubjects(subjectMap);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
      }
    };
    fetchSubjects();
  }, []);

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await API.get("/user/teachers/");
        const teacherMap = {};
        res.data.forEach((t) => {
          if (t.id != null && t.account?.full_name) {
            teacherMap[t.id] = t.account.full_name.trim();
          }
        });
        setTeachers(teacherMap);
      } catch (err) {
        console.error("Failed to fetch teachers", err);
      }
    };
    fetchTeachers();
  }, []);


  const saveRoutine = async () => {
  try {
    setLoading(true);
    for (let item of editableRoutine) {
      await API.put(`/nphs/routine/${item.id}/`, item);
    }
    // Directly update routine state from editableRoutine
    setRoutine([...editableRoutine]);
    setIsEditing(false);
  } catch (err) {
    console.error("Failed to save routine", err);
  } finally {
    setLoading(false);
  }
};


  // Class cards matching backend aclass
  const classCards = [
    { id: 1, name: "Class 6", color: "bg-blue-100" },
    { id: 2, name: "Class 7", color: "bg-green-100" },
    { id: 3, name: "Class 8", color: "bg-red-100" },
    { id: 4, name: "Class 9", color: "bg-yellow-100" },
    { id: 5, name: "Class 10", color: "bg-orange-100" },
  ];

  const slotTimes = {
    1: "10:15-11:00",
    2: "11:00-11:40",
    3: "11:40-12:20",
    4: "12:20-13:00",
    5:"Tiffin",
    6: "14:00-14:40",
    7: "14:40-15:20",
    8: "15:20-16:00",
  };

  // DEBUG
  console.log("Selected Class:", selectedClass);
  console.log("Routine:", routine);
  console.log("Teachers Map:", teachers);

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-sky-900 mb-12 mt-10"
        >
          School Routine
        </motion.h1>

          <div className="flex justify-end mb-4">
            <button
          onClick={() => {
            if (!isEditing) {
              // Start editing
              setEditableRoutine([...routine]); // copy routine
              setIsEditing(true);
            } else {
              // Save routine
              saveRoutine();
            }
          }}
          className="mb-4 px-4 py-2 bg-blue-950 rounded-2xl text-white  hover:bg-blue-900"
        >
          {isEditing ? "Save Routine" : "Update Routine"}
        </button>
        </div>
        


        {/* Class Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
          {classCards.map((cls) => (
            <motion.div
              key={cls.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchRoutine(cls.id)}
              className={`${cls.color} p-6 rounded-xl shadow cursor-pointer text-center border-2 ${
                selectedClass === cls.id ? "border-sky-700" : "border-transparent"
              }`}
            >
              <h4 className="text-lg font-semibold text-sky-900">{cls.name}</h4>
            </motion.div>
          ))}
        </div>

        {/* Routine Table */}
        <div className="overflow-x-auto shadow-md rounded-2xl bg-white">
          <table className="min-w-full table-auto text-sm sm:text-base">
            <thead className="bg-blue-950 text-white">
              <tr>
                <th className="px-4 py-3">Day</th>
                {[1, 2, 3, 4].map((slot) => (
                  <th key={slot} className="px-4 py-3 text-center">
                    {slotTimes[slot]}
                  </th>
                ))}
                <th className="px-4 py-3 text-center">Tiffin Break (13:00-14:00)</th>
                {[6,7,8].map((slot) => (
                  <th key={slot} className="px-4 py-3 text-center">
                    {slotTimes[slot]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!loading && status === "success" && routine.length > 0 &&
                Object.keys(
                  routine.reduce((acc, item) => {
                    if (!acc[item.day_display]) acc[item.day_display] = {};
                    acc[item.day_display][item.slot] = item;
                    return acc;
                  }, {})
                ).map((day) => {
                  const slotsByDay = routine.reduce((acc, item) => {
                    if (item.day_display === day) acc[item.slot] = item;
                    return acc;
                  }, {});
                  return (
                    <tr key={day} className="border-b last:border-none hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{day}</td>

                      {/* Morning slots */}
                      {[1, 2, 3, 4].map((slot) => {
                        const item = slotsByDay[slot.toString()];
                        return (
                         <td key={slot} className="px-4 py-3 text-center">
                      {item ? (
                        <>
                          {isEditing ? (
                            <>
                              <select
                                value={editableRoutine.find(r => r.id === item.id)?.subject || item.subject}
                                onChange={(e) => {
                                  const newRoutine = editableRoutine.map(r =>
                                    r.id === item.id ? { ...r, subject: Number(e.target.value) } : r
                                  );
                                  setEditableRoutine(newRoutine);
                                }}
                                className="border rounded px-1 py-0.5 text-sm"
                              >
                                {Object.entries(subjects).map(([id, name]) => (
                                  <option key={id} value={id}>{name}</option>
                                ))}
                              </select>

                              <select
                                value={editableRoutine.find(r => r.id === item.id)?.teacher || item.teacher}
                                onChange={(e) => {
                                  const newRoutine = editableRoutine.map(r =>
                                    r.id === item.id ? { ...r, teacher: Number(e.target.value) } : r
                                  );
                                  setEditableRoutine(newRoutine);
                                }}
                                className="border rounded px-1 py-0.5 text-sm ml-1"
                              >
                                {Object.entries(teachers).map(([id, name]) => (
                                  <option key={id} value={id}>{name}</option>
                                ))}
                              </select>
                            </>
                          ) : (
                            <>
                              <div className="font-semibold">{subjects[item.subject]}</div>
                              <div className="text-gray-600 text-xs">{teachers[item.teacher]}</div>
                            </>
                          )}
                        </>
                      ) : null}
                    </td>

                        );
                      })}

                      {/* Tiffin */}
                      <td className="px-4 py-3 text-center bg-yellow-100 font-medium">
                        Tiffin
                      </td>

                      {/* Afternoon slots */}
                      {[6, 7, 8].map((slot) => {
                        const item = slotsByDay[slot.toString()];
                        return (
                          <td key={slot} className="px-4 py-3 text-center">
                        {item ? (
                          <>
                            {isEditing ? (
                              <>
                                <select
                                  value={editableRoutine.find(r => r.id === item.id)?.subject || item.subject}
                                  onChange={(e) => {
                                    const newRoutine = editableRoutine.map(r =>
                                      r.id === item.id ? { ...r, subject: Number(e.target.value) } : r
                                    );
                                    setEditableRoutine(newRoutine);
                                  }}
                                  className="border rounded px-1 py-0.5 text-sm"
                                >
                                  {Object.entries(subjects).map(([id, name]) => (
                                    <option key={id} value={id}>{name}</option>
                                  ))}
                                </select>

                                <select
                                  value={editableRoutine.find(r => r.id === item.id)?.teacher || item.teacher}
                                  onChange={(e) => {
                                    const newRoutine = editableRoutine.map(r =>
                                      r.id === item.id ? { ...r, teacher: Number(e.target.value) } : r
                                    );
                                    setEditableRoutine(newRoutine);
                                  }}
                                  className="border rounded px-1 py-0.5 text-sm ml-1"
                                >
                                  {Object.entries(teachers).map(([id, name]) => (
                                    <option key={id} value={id}>{name}</option>
                                  ))}
                                </select>
                              </>
                            ) : (
                              <>
                                <div className="font-semibold">{subjects[item.subject]}</div>
                                <div className="text-gray-600 text-xs">{teachers[item.teacher]}</div>
                              </>
                            )}
                          </>
                        ) : null}
                      </td>

                        );
                      })}
                    </tr>
                  );
                })}

              
              {status === "error" && (
                <tr>
                  <td colSpan="8" className="px-4 py-3 text-center text-red-600">
                    ❌ Failed to fetch routine.
                  </td>
                </tr>
              )}
              {!loading && status === "success" && routine.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-3 text-center text-gray-600">
                    No routine available for{" "}
                    {classCards.find((c) => c.id === selectedClass)?.name || `Class ${selectedClass}`}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
            {loading && <Loading message="Loading Routine" />}
        </div>
      </div>
    </div>
  );
}
