import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiLock,
  FiBell,
  FiShield,
  FiMail,
  FiEye,
  FiEyeOff,
  FiSave,
  FiArrowLeft,
} from "react-icons/fi";
import { useAuthContext } from "../../context/auth/useAuthContext";
import useDashboardContext from "../../context/dashboard/useDashboardContext";
import { Link } from "react-router";
import api from "../../config/axios.config";

const SettingsPage: React.FC = () => {
  const { user } = useAuthContext();
  const { setPageName } = useDashboardContext();
  const [activeTab, setActiveTab] = useState<
    "account" | "security" | "notifications" | "privacy"
  >("account");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Account Settings
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || "");

  // Security Settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [noticeNotifications, setNoticeNotifications] = useState(true);
  const [eventNotifications, setEventNotifications] = useState(true);

  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(true);

  useEffect(() => {
    setPageName("Settings");
  }, [setPageName]);

  const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await api.put("/auth/update-account", {
        email,
        phone_number: phoneNumber,
      });

      if (response.status === 200) {
        setSuccessMessage("Account information updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch {
      setErrorMessage(
        "Failed to update account information. Please try again.",
      );
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.put("/auth/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch {
      setErrorMessage(
        "Failed to change password. Please check your current password.",
      );
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await api.put("/auth/update-notifications", {
        email_notifications: emailNotifications,
        notice_notifications: noticeNotifications,
        event_notifications: eventNotifications,
      });

      if (response.status === 200) {
        setSuccessMessage("Notification preferences updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch {
      setErrorMessage("Failed to update notification preferences.");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivacyUpdate = async () => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await api.put("/auth/update-privacy", {
        profile_visibility: profileVisibility,
        show_email: showEmail,
        show_phone: showPhone,
      });

      if (response.status === 200) {
        setSuccessMessage("Privacy settings updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch {
      setErrorMessage("Failed to update privacy settings.");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/profile"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Profile</span>
          </Link>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center justify-between">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage("")}
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Settings Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("account")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
                  activeTab === "account"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <FiUser size={18} />
                Account
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
                  activeTab === "security"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <FiLock size={18} />
                Security
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
                  activeTab === "notifications"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <FiBell size={18} />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
                  activeTab === "privacy"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <FiShield size={18} />
                Privacy
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Account Settings */}
            {activeTab === "account" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Account Information
                </h2>
                <p className="text-gray-600 mb-6">
                  Update your account information and contact details.
                </p>

                <form onSubmit={handleAccountUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium shadow-md"
                    >
                      <FiSave size={18} />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Security Settings
                </h2>
                <p className="text-gray-600 mb-6">
                  Manage your password and account security.
                </p>

                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter current password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium shadow-md"
                    >
                      <FiSave size={18} />
                      {isLoading ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Notification Preferences
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose what notifications you want to receive.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-600">
                        Receive email updates about important activities
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) =>
                          setEmailNotifications(e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Notice Notifications
                      </h3>
                      <p className="text-sm text-gray-600">
                        Get notified when new notices are posted
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={noticeNotifications}
                        onChange={(e) =>
                          setNoticeNotifications(e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Event Notifications
                      </h3>
                      <p className="text-sm text-gray-600">
                        Receive updates about upcoming events
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={eventNotifications}
                        onChange={(e) =>
                          setEventNotifications(e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleNotificationUpdate}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium shadow-md"
                    >
                      <FiSave size={18} />
                      {isLoading ? "Saving..." : "Save Preferences"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Privacy Settings
                </h2>
                <p className="text-gray-600 mb-6">
                  Control your privacy and what information is visible to
                  others.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={profileVisibility}
                      onChange={(e) => setProfileVisibility(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="public">
                        Public - Visible to everyone
                      </option>
                      <option value="college">
                        College Only - Visible to college members
                      </option>
                      <option value="private">
                        Private - Only visible to admins
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Show Email Address
                      </h3>
                      <p className="text-sm text-gray-600">
                        Allow others to see your email address
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showEmail}
                        onChange={(e) => setShowEmail(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Show Phone Number
                      </h3>
                      <p className="text-sm text-gray-600">
                        Allow others to see your phone number
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showPhone}
                        onChange={(e) => setShowPhone(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handlePrivacyUpdate}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium shadow-md"
                    >
                      <FiSave size={18} />
                      {isLoading ? "Saving..." : "Save Privacy Settings"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
