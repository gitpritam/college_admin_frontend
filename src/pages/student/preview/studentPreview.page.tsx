import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "../../../config/axios.config";
import {
  FiFileText,
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiBook,
  FiUsers,
  FiHash,
} from "react-icons/fi";
import type { IStudent } from "../../../@types/interface/student.interface";

const StudentPreview: React.FC = () => {
  const [data, setData] = useState<IStudent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { student_id } = useParams<{ student_id: string }>();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${student_id}`);
        if (response.status === 200) {
          const { result } = response.data;
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    if (student_id) fetchStudent();
  }, [student_id]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBack = () => {
    window.history.back(); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student...</p>
        </div>
      </div>
    );
  }

  // ---------- No Data ----------
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <FiFileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Student not found</p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ---------- Main Content ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 shadow-md border border-gray-200"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </button>
          <Link
            to="/students/list"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-md"
          >
            Students List
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                {data.passport_photo_url ? (
                  <img
                    src={data.passport_photo_url}
                    alt={`${data.first_name} ${data.last_name}`}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-300 flex items-center justify-center">
                    <FiUser className="w-16 h-16 text-gray-600" />
                  </div>
                )}
              </div>
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">
                  {data.first_name}{" "}
                  {data.middle_name ? `${data.middle_name} ` : ""}
                  {data.last_name}
                </h1>
                <p className="text-blue-100 text-lg mb-1">{data.department}</p>
                {data.student_id && (
                  <p className="text-blue-200 text-sm">
                    Student ID: {data.student_id}
                  </p>
                )}
                {data.registration_no && (
                  <p className="text-blue-200 text-sm">
                    Registration No: {data.registration_no}
                  </p>
                )}
                {data.roll_no && (
                  <p className="text-blue-200 text-sm">
                    Roll No: {data.roll_no}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-8 grid lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiUser className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">
                      Date of Birth:
                    </span>
                    <span className="text-gray-600">
                      {formatDate(data.dob)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="text-gray-600">{data.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="text-gray-600">{data.phone_number}</span>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiBook className="w-5 h-5 text-blue-600" />
                  Academic Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FiBook className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">
                      Department:
                    </span>
                    <span className="text-gray-600">{data.department}</span>
                  </div>
                  {data.registration_no && (
                    <div className="flex items-center gap-3">
                      <FiHash className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-700">
                        Registration No:
                      </span>
                      <span className="text-gray-600">
                        {data.registration_no}
                      </span>
                    </div>
                  )}
                  {data.roll_no && (
                    <div className="flex items-center gap-3">
                      <FiHash className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-700">
                        Roll No:
                      </span>
                      <span className="text-gray-600">{data.roll_no}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">
                      Year of Admission:
                    </span>
                    <span className="text-gray-600">
                      {data.year_of_admission}
                    </span>
                  </div>
                  {data.year_of_passing && (
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-700">
                        Year of Passing:
                      </span>
                      <span className="text-gray-600">
                        {data.year_of_passing}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Guardian Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiUsers className="w-5 h-5 text-blue-600" />
                  Guardian Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FiUser className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">
                      Guardian Name:
                    </span>
                    <span className="text-gray-600">{data.guardian_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">
                      Guardian Phone:
                    </span>
                    <span className="text-gray-600">
                      {data.guardian_phone_number}
                    </span>
                  </div>
                  {data.guardian_email && (
                    <div className="flex items-center gap-3">
                      <FiMail className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-700">
                        Guardian Email:
                      </span>
                      <span className="text-gray-600">
                        {data.guardian_email}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks */}
              {data.remark && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Remarks
                  </h2>
                  <p className="text-gray-700">{data.remark}</p>
                </div>
              )}
            </div>

            {/* Address Information */}
            <div className="space-y-6">
              {/* Current Address */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-blue-600" />
                  Current Address
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p className="font-medium">{data.current_address.address}</p>
                  <p>
                    {data.current_address.district},{" "}
                    {data.current_address.state}
                  </p>
                  <p>
                    {data.current_address.country} -{" "}
                    {data.current_address.pincode}
                  </p>
                </div>
              </div>

              {/* Permanent Address */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-blue-600" />
                  Permanent Address
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p className="font-medium">
                    {data.permanent_address.address}
                  </p>
                  <p>
                    {data.permanent_address.district},{" "}
                    {data.permanent_address.state}
                  </p>
                  <p>
                    {data.permanent_address.country} -{" "}
                    {data.permanent_address.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPreview;
