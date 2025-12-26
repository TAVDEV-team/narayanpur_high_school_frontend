import React, { useState } from "react";
import API from "../../api/api";
import Loading from "../../components/Loading";
import Dropdown from "./BaseAccount/DropDown";

export default function AddStudent() {
  const [formData, setFormData] = useState({
    class_name: "",
    group: "science",
    roll_number:"",
    account: {
      user: {
        username: "default",
        first_name: "",
        last_name: "",
        email: "student_email@gmail.com",
        password: "student1234",
        confirm_password: "student1234",
      },
      gender:"",
      image: null,
      date_of_birth: "",
      mobile: "",
      religion: "",
      address: "",
      joining_date: "",
      last_educational_institute: "",
    },
  });
  // const roll = API.get()
  // 1. Extract religion options as config

const dropDownFields = [
  {
    label: "Gender",
    name: "account.gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    required:true
  },
  {
    label: "Religion",
    name: "account.religion",
    options: [
      { label: "Islam", value: "islam" },
      { label: "Hindu", value: "hindu" },
      { label: "Christian", value: "christian" },
      { label: "Buddhist", value: "buddhist" },
    ],
    required:true
  },
];
// 2. Add a reusable renderSelect helper
const renderSelect = ({ label, name, options, required = false }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm md:text-base font-medium text-gray-700">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <select
      name={name}
      value={getValue(name)}
      onChange={handleChange}
      required={required}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm md:text-base"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const keys = name.split(".");
    setFormData((prev) => {
      let copy = { ...prev };
      let temp = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = { ...temp[keys[i]] };
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = files ? files[0] : value;
      return copy;
    });
  };

  const buildFormData = (data, form = new FormData(), parentKey = "") => {
    Object.entries(data).forEach(([key, value]) => {
      const formKey = parentKey ? `${parentKey}.${key}` : key;
      if (value instanceof File) {
        form.append(formKey, value);
      } else if (typeof value === "object" && value !== null) {
        buildFormData(value, form, formKey);
      } else if (value !== undefined && value !== null) {
        form.append(formKey, value);
      }
    });
    return form;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!formData.account.user.username) {
      formData.account.user.username =
        (formData.account.user.first_name + formData.account.user.last_name)
          .toLowerCase()
          .replace(/\s/g, "") || "student" + Date.now();
    }

    try {
      const token = localStorage.getItem("token");
      const data = buildFormData(formData);
      
      await API.post(
        "/user/students/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log( data );
      setSuccessMessage("✅ Student added successfully!");
    } catch (err) {
      console.error("Server response:", err.response?.data || err.message);   
      setErrorMessage("❌ Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const getValue = (name) => {
  const keys = name.split(".");
  let val = formData;
  for (let key of keys) {
    if (val[key] === undefined) return "";  
    val = val[key];
  }
  return val;
};

  const renderInput = ({ label, name, type = "text", required = false }) => (
    <div className="flex flex-col space-y-1">
      <label className="text-sm md:text-base font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={type === "file" ? undefined : getValue(name)}
        onChange={handleChange}
        required={required}
        accept={type === "file" ? "image/*" : undefined}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm md:text-base"
      />
    </div>
  );

  return (
    <section className="bg-sky-50 min-h-screen py-10">
  <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10 bg-white rounded-2xl shadow-lg border border-gray-200">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
      🎓 Add New Student
    </h2>

    {successMessage && (
      <p className="text-green-600 font-semibold mb-4 text-center text-sm md:text-base">
        {successMessage}
      </p>
    )}
    {errorMessage && (
      <p className="text-red-600 font-semibold mb-4 text-center text-sm md:text-base">
        {errorMessage}
      </p>
    )}

    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Class & Group */}
      <div>
        <h3 className="text-base md:text-lg font-semibold text-indigo-600 mb-3 mt-5">
          Class & Group Info  
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm md:text-base font-medium text-gray-700">
              Class <span className="text-red-600">*</span>
            </label>
            <select
              name="class_name"
              value={formData.class_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm md:text-base"
            >
              <option value="">Select Class</option>
              {["6", "7", "8", "9", "10"].map((cls) => (
                <option key={cls} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>
          </div>

          {(formData.class_name === "9" || formData.class_name === "10") && (
            <div>
              <label className="text-sm md:text-base font-medium text-gray-700">
                Group
              </label>
              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm md:text-base"
              >
                {["science", "business", "humanities"].map((g) => (
                  <option key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* User Account Info */}
      <div>
        <h3 className="text-base md:text-lg font-semibold text-indigo-600 mb-3">
          User Account Info
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {label: "Registration Number", name: "account.user.username"},
            { label: "First Name", name: "account.user.first_name", required: true },
            { label: "Last Name", name: "account.user.last_name", required: true },
            { label: "Email", name: "account.user.email", type: "email" },
          ].map(renderInput)}
        </div>
      </div>

      {/* Additional Info */}
      <div>
        <h3 className="text-base md:text-lg font-semibold text-indigo-600 mb-3">
          Additional Info
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Image", name: "account.image", type: "file" },
            { label: "Roll Number", name: "roll_number", type: "number" },
            { label: "Date of Birth", name: "account.date_of_birth", type: "date", required: true },
            { label: "Mobile", name: "account.mobile", required: true },
            { label: "Address", name: "account.address", required: true },
            { label: "Admission Date", name: "account.joining_date", type: "date", required: true },
            { label: "Last Educational Institute", name: "account.last_educational_institute", required: true },
          ].map(renderInput)}
        </div>
      </div>

      {/* Religion
      {renderSelect({
        label: "Religion",
        name: "account.religion",
        options: RELIGIONS,
        required: true,
      })} */}
    {dropDownFields.map((field) => (
      <Dropdown
        key={field.name}
        label={field.label}
        name={field.name}
        options={field.options}
        value={getValue(field.name)}
        onChange={handleChange}
        required={field.required}
      />
    ))}

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-blue-950 text-white font-semibold px-4 py-3 rounded-xl shadow hover:bg-blue-900 transition-all flex items-center justify-center text-sm md:text-base"
        disabled={loading}
      >
        {loading ? (
        <Loading />
        ) : (
          "Add Student"
        )}
      </button>
    </form>
  </div>
</section>

  );
}
