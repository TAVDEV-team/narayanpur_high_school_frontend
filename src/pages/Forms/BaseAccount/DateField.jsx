export default function DateInput({ label, name, value, onChange,required }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-md w-full text-base sm:text-lg"
      />
    </div>
  );
}
