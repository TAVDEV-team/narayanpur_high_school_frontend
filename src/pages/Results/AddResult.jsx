import React, { useState, useEffect } from "react";
import API from "../../api/api";
import {ListAPI} from "../../api/ListAPI"
// import {Loading} from "../../components/Loading"
import Loading from "../../components/Loading";

export default function AddResult() {
  // Dropdown data
  // const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  // const [students, setStudents] = useState([]);
 const [existingResultId, setExistingResultId] = useState(null);

const [rollNumber, setRollNumber] = useState("");
const [resolvedStudent, setResolvedStudent] = useState(null);
const [studentStatus, setStudentStatus] = useState("idle"); 
// idle | loading | found | not_found | error



  // const {
  //   data:classes,
  //   loading:class_loading,
  //   error:class_error,
  // }= ListAPI("/nphs/classes/")

    const {
    data:exams,
    loading:exam_loading,
    error:exam_error,
  }= ListAPI("/result/exam/")


  const classes= [
    {
      "id": 1,
      "name": "6",
    },
    {
      "id": 2,
      "name": "7",
    },
    {
      "id": 3,
      "name": "8",
    },
    {
      "id": 8,
      "name": "9 humanities",
    },
    {
      "id": 4,
      "name": "9 science",
    },
    {
      "id": 6,
      "name": "9 business",

    },
    {
      "id": 9,
      "name": "10 humanities",
    },
    {
      "id": 5,
      "name": "10 science",
    },
    {
      "id": 7,
      "name": "10 business",
    }
  ]

  // Form state
  const [form, setForm] = useState({
    aclass: "",
    exam: "",
    subject: "",
    student: "",
    mcq: "0",
    practical: "0",
    written: "0",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch students + subjects when class is selected
  useEffect(() => {
    
    if (!form.aclass) return; // skip if no class selected
    
    const fetchClassDetails = async () => {
      try {
        // setLoading(true);
        const res = await API.get(
          `/nphs/classes/${form.aclass}/`
        );
        setSubjects(res.data.all_subjects || []); // ✅ subjects come from here
      } catch (error) {
        setMessage({ type: "error", text: "⚠️ Failed to fetch subjects for this class." });
        setSubjects([]);
      } finally {
        // setLoading(false);
      }
    };
    fetchClassDetails();
  }, [form.aclass]);

 useEffect(() => {

  console.log("Checking result effect", form.exam, )
  if (!form.exam || !form.subject || !form.student) return;

  const checkResult = async () => {
    try {
      const res = await API.get(
        `/result/?exam=${form.exam}&subject=${form.subject}&student=${form.student}`
      );

      if (res.data.results.length > 0) {
        const result = res.data.results[0];
        setExistingResultId(result.id);
        setForm({
          ...form,
          mcq: result.mcq,
          written: result.written,
          practical: result.practical,
        });
      } else {
        setExistingResultId(null); // no previous result
        setForm({ ...form, mcq: "0", written: "0", practical: "0" });
      }
    } catch (err) {
      console.error("Failed to check result:", err);
    }
  };

  checkResult();
}, [form.exam, form.subject, form.student]);



  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
const handleSubmit = async (e) => {
  e.preventDefault();
  // setLoading(true);
  setMessage({ type: "", text: "" });

  try {
    const payload = {
      aclass: Number(form.aclass),
      exam: Number(form.exam),
      subject: Number(form.subject),
      student: Number(form.student),
      mcq: Number(form.mcq),
      practical: Number(form.practical),
      written: Number(form.written),
    };
    console.log(payload)
    if (existingResultId) {
      // Update existing result
      const res = await API.patch(`/result/${existingResultId}/`, payload);
      setMessage({ type: "success", text: "✅ Result updated successfully!" });
      // Update form to reflect latest values
      setForm((prev) => ({
        ...prev,
        mcq: res.data.mcq,
        practical: res.data.practical,
        written: res.data.written,
      }));
    } else {
      // Create new result
      const res = await API.post("/result/", payload);
      setMessage({ type: "success", text: "✅ Result added successfully!" });
      // Clear form for next entry
      setForm({ aclass: payload.aclass, exam: payload.exam, subject: payload.subject, student: "", mcq: "0", practical: "0", written: "0" });
      // setStudents([]);
      setSubjects([]);
    }
  } catch (error) {
    if (error.response) {
      setMessage({ type: "error", text: JSON.stringify(error.response.data) });
    } else {
      setMessage({ type: "error", text: error.message });
    }
  } finally {
    // setLoading(false);
  }
};
useEffect(() => {
  if (!form.aclass || !rollNumber) return;

  const rn = Number(rollNumber);
  if (Number.isNaN(rn)) return;

  let cancelled = false;

  const lookupStudent = async () => {
    try {
      setStudentStatus("loading");

      const res = await API.get(
        `/nphs/classes/${form.aclass}/students/lookup/?roll_number=${rn}`
      );

      if (cancelled) return;

      if (res.data.length === 0) {
        setResolvedStudent(null);
        setStudentStatus("not_found");
        setForm((prev) => ({ ...prev, student: "" }));
        return;
      }

      const student = res.data[0];
      setResolvedStudent(student);
      setForm((prev) => ({ ...prev, student: student.id }));
      setStudentStatus("found");
    } catch (err) {
      if (cancelled) return;
      setStudentStatus("error");
    }
  };

  const timeout = setTimeout(lookupStudent, 400); // debounce

  return () => {
    cancelled = true;
    clearTimeout(timeout);
  };
}, [form.aclass, rollNumber]);



  return (
    
    <div className="flex justify-center items-start py-10 bg-sky-100 min-h-screen px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 mt-10">
          Add Student Result
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Class dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Class</label>
            <select
              name="aclass"
              value={form.aclass}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* Exam dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Exam</label>
            <select
              name="exam"
              value={form.exam}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Exam</option>
              {exams.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.exam_title}
                </option>
              ))}
            </select>
          </div>

          {/* Subject dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Subject</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              required
              disabled={!form.aclass}
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Student dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Roll Number
            </label>
            <input
              type="number"
              value={rollNumber}
              onChange={(e) => {
                setRollNumber(e.target.value);
                setResolvedStudent(null);
                setStudentStatus("idle");
                setForm((prev) => ({ ...prev, student: "" }));
                setExistingResultId(null);
              }}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Enter roll number"
              disabled={!form.aclass}
              required
            />
          </div>
          {studentStatus === "loading" && (
            <p className="text-sm text-blue-600 mt-1">Searching student…</p>
          )}

          {studentStatus === "not_found" && (
            <p className="text-sm text-red-600 mt-1">
              No student found with this roll number in this class.
            </p>
          )}

          {studentStatus === "found" && resolvedStudent && (
            <p className="text-sm text-green-700 mt-1">
            {resolvedStudent.roll_number} : {resolvedStudent.full_name}
            </p>
          )}


          {/* Score inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">MCQ Marks</label>
              <input
                type="number"
                name="mcq"
                value={form.mcq}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="Enter MCQ Marks"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Practical Marks</label>
              <input
                type="number"
                name="practical"
                value={form.practical}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="Enter Practical Marks"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Written Marks</label>
              <input
                type="number"
                name="written"
                value={form.written}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="Enter Written Marks"
                required
              />
            </div>
          </div>

       
          {/* Submit / Update button */}
<button
  type="submit"
  disabled={!form.aclass || !form.exam || !form.subject || !form.student}
  className={`w-full py-2 rounded-lg font-semibold text-white transition ${

      // "bg-gray-400 cursor-not-allowed"
      // : existingResultId
      // ? "bg-yellow-600 hover:bg-yellow-700"
      // : 
      "bg-blue-950 hover:bg-blue-900"
  }`}
>
 {exam_loading ? <Loading message="Submitting..." /> : existingResultId ? "Update Result" : "Submit Result"}
</button>




          {/* Feedback message */}
          {message.text && (
            <p
              className={`text-center mt-4 font-medium ${
                message.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
    
  );
}
