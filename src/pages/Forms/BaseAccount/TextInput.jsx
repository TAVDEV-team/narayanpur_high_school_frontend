export default function TextInput({ label, name, type = "text", value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${placeholder}`}
        required={required}
        className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-md w-full text-base sm:text-lg"
      />
    </div>
  );
}
