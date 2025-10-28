import React from "react";
import { MdEmail, MdPhone, MdHome } from "react-icons/md";
import { useAuthContext } from "../../context/auth/useAuthContext";
import type { IFaculty } from "../../@types/interface/faculty.interface";

const MyProfilePage: React.FC = () => {
  const { onLogout, user, isLoading } = useAuthContext();
  const profile = user as IFaculty | null;

if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Profile not found
          </h2>
          <p className="text-gray-500 mt-2">Please log in again.</p>
          <button
            onClick={onLogout}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${profile.first_name} ${
    profile.middle_name ? profile.middle_name + " " : ""
  }${profile.last_name}`;

  const currentAddress = profile.current_address;
  const permanentAddress = profile.permanent_address;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

        {/* Profile picture or initials */}
        {profile.profile_picture_url ? (
          <img
            src={profile.profile_picture_url}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-3xl font-semibold rounded-full flex items-center justify-center mx-auto mb-4">
            {profile.first_name.charAt(0).toUpperCase()}
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-700">{fullName}</h3>
        <p className="text-gray-500 mb-6">{profile.designation}</p>

        {/* Contact Info */}
        <div className="space-y-3 text-left">
          <p className="flex items-center gap-2 text-gray-600">
            <MdEmail className="text-blue-500" /> {profile.email}
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <MdPhone className="text-green-500" /> {profile.phone_number}
          </p>
        </div>

        {/* Address Section */}
        <div className="mt-6 text-left space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              Current Address
            </h4>
            <p className="flex items-start gap-2 text-gray-600">
              <MdHome className="text-orange-500 mt-1" />
              <span>
                {currentAddress.address}, {currentAddress.district},{" "}
                {currentAddress.state}, {currentAddress.country} -{" "}
                {currentAddress.pincode}
              </span>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              Permanent Address
            </h4>
            <p className="flex items-start gap-2 text-gray-600">
              <MdHome className="text-orange-500 mt-1" />
              <span>
                {permanentAddress.address}, {permanentAddress.district},{" "}
                {permanentAddress.state}, {permanentAddress.country} -{" "}
                {permanentAddress.pincode}
              </span>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={onLogout}
          className="mt-8 w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>

        <p className="mt-4 text-sm text-gray-500">
          <span
            onClick={() => (window.location.href = "/dashboard")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Go back to Dashboard
          </span>
        </p>
      </div>
    </div>
  );
};

export default MyProfilePage;
