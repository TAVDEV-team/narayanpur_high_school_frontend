import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../../api/api";
import { useNavigate } from "react-router-dom";

const today = new Date().toISOString().split("T")[0];

export default function useAccountForm(initialExtraFields = {}, endpoint) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    image: null,
    date_of_birth: "",
    mobile: "",
    religion: "",
    gender: "",
    address: "",
    joining_date: today,
    last_educational_institute: "",
    ...initialExtraFields, // ✅ staff-only or teacher-only fields
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // ✅ shared payload
      const payload = {
        account: {
          user: {
            username: form.username,
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            password: form.password,
            confirm_password: form.confirm_password,
          },
          image: form.image,
          date_of_birth: form.date_of_birth,
          mobile: form.mobile,
          religion: form.religion,
          gender: form.gender,
          address: form.address,
          joining_date: form.joining_date,
          last_educational_institute: form.last_educational_institute,
        },
      };

      // ✅ merge in extra fields
      for (const key of Object.keys(initialExtraFields)) {
        payload[key] = form[key];
      }

      const res = await API.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.detail || "Registration failed");
    }
  };

  return { form, setForm, handleChange, handleFileChange, handleSubmit };
}
