import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api/api";
import useAccountForm from "./BaseAccount/useAccountForm";
import AccountForm from "./BaseAccount/AccountForm";
import TextInput from "./BaseAccount/TextInput";
import Dropdown from "./BaseAccount/DropDown";

export default function AddTeacherForm() {
  const { form, handleChange, handleFileChange, handleSubmit } = useAccountForm(
    {
      base_subject: "",
      is_class_teacher: "",
      class_teacher_of: "",
    },
    "/user/teachers/"
  );

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    API.get("/nphs/classes/").then((res) => setClasses(res.data));
    API.get("/nphs/subject/").then((res) => setSubjects(res.data));
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 text-center mb-10">
            Teacher Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ✅ Shared account fields in grid */}
            <AccountForm
              formData={form}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
            />

            {/* ✅ Teacher-only fields */}
          <Dropdown
            label="Base Subject"
            name="base_subject"
            value={form.base_subject}
            onChange={handleChange}
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
          />

          <Dropdown
            label="Is Class Teacher?"
            name="is_class_teacher"
            value={form.is_class_teacher}
            onChange={handleChange}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {form.is_class_teacher === "yes" && (
            <Dropdown
              label="Class Teacher Of"
              name="class_teacher_of"
              value={form.class_teacher_of}
              onChange={handleChange}
              options={classes.map((c) => ({ value: c.id, label: c.name }))}
            />
          )}


            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold py-4 rounded-lg shadow-md"
              >
                Register Teacher
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
