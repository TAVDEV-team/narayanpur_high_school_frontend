// components/common/PersonCard.jsx
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
export default function PersonCard({ account, extra = null, rightExtra = null }) {
  return (
    <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-200 p-4">
      {/* Image */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 mx-auto sm:mx-2">
        <img
          src={account?.image || "/default.png"}
          alt={account?.full_name || account?.user?.username}
          className="w-full h-full object-cover rounded-full border-4 border-indigo-200"
        />
      </div>

      {/* Info */}
      <div className="flex-1 p-4 flex flex-col justify-center text-center sm:text-left space-y-1">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {account?.full_name?.trim() || account?.user?.username}
        </h2>
        {account?.user?.email && (
          <p className="text-gray-600 text-sm sm:text-base break-words">
            📧 {account.email}
          </p>
        )}
        {account?.mobile && (
          <p className="text-gray-600 text-sm sm:text-base">
            📞 {account.mobile}
          </p>
        )}
        {extra}
      </div>

      {rightExtra && (
        <div className="flex-1 p-4 flex flex-col justify-center text-left text-sm sm:text-base">
          {rightExtra}
        </div>
      )}
    </div>
  );
}
