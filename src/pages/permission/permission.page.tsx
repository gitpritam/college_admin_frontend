import React from "react";
import { useParams } from "react-router";

const PermissionPage: React.FC = () => {
  const { faculty_id, name } = useParams();

  const [permissions, setPermissions] = React.useState({
    event: false,
    notice: false,
  });

  const handleCheckboxChange = (key: "event" | "notice") => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Faculty Permission
        </h1>

        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Name: <span className="text-blue-600">{name}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Faculty ID: <span className="text-blue-600">{faculty_id}</span>
          </p>
        </div>

        <div className="space-y-5">
          {/* Event Permission */}
          <label className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition">
            <span className="text-gray-700 font-medium">Event Permission</span>
            <input
              type="checkbox"
              checked={permissions.event}
              onChange={() => handleCheckboxChange("event")}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
          </label>

          {/* Notice Permission */}
          <label className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition">
            <span className="text-gray-700 font-medium">Notice Permission</span>
            <input
              type="checkbox"
              checked={permissions.notice}
              onChange={() => handleCheckboxChange("notice")}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
          </label>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => console.log("Saved permissions:", permissions)}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionPage;
