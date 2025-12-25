
import TextInput from "./TextInput";
import DateInput from "./DateField";
import Dropdown from "./DropDown";


export const textFields = [
  { label: "Username", name: "username", type: "text", placeholder: "username" },
  { label: "First Name", name: "first_name", type: "text", placeholder: "first name",required:true },
  { label: "Last Name", name: "last_name", type: "text", placeholder: "last name" ,required:true},
  { label: "Email", name: "email", type: "email", placeholder: "email",required:true },
  { label: "Phone Number", name: "mobile", type: "text", placeholder: "phone number",required:true },
  { label: "Address", name: "address", type: "text", placeholder: "address",required:true },
  { label: "PassWord", name: "password", type: "password", placeholder: "PassWord",required:true },
  { label: "Confirm PassWord", name: "confirm_password", type: "password", placeholder: "PassWord Again",required:true },
  { label: "Last Educational Institute", name: "last_educational_institute", type: "text", placeholder: "Last Educational Institute",required:true },
];

export const dateFields = [
  { label: "Date of Birth", name: "date_of_birth" ,required:true},
  { label: "Joining Date", name: "joining_date",required:true },
];

export const dropDownFields = [
  {
    label: "Gender",
    name: "gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    required:true
  },
  {
    label: "Religion",
    name: "religion",
    options: [
      { label: "Islam", value: "islam" },
      { label: "Hindu", value: "hindu" },
      { label: "Christian", value: "christian" },
      { label: "Buddhist", value: "buddhist" },
    ],
    required:true
  },
];

// ✅ Styled UI component
export default function AccountForm({ formData, handleChange, handleFileChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {textFields.map((field) => (
        <TextInput
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required={field.required}
          
        />
      ))}

      {dateFields.map((field) => (
        <DateInput
          key={field.name}
          label={field.label}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required={field.required}
        />
      ))}

      {dropDownFields.map((field) => (
        <Dropdown
          key={field.name}
          label={field.label}
          name={field.name}
          options={field.options}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required={field.required}
        />
      ))}

      {/* File Upload */}
      <div className="flex flex-col">
        <label htmlFor="image" className="text-sm font-semibold mb-2">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          className="border border-gray-300 px-3 sm:px-4 py-2 rounded-md w-full text-base sm:text-lg"
        />
      </div>
    </div>
  );
}
