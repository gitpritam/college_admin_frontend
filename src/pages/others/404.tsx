import { Link, useNavigate } from "react-router";
import { FiHome, FiArrowLeft, FiSearch, FiAlertTriangle } from "react-icons/fi";

function NotFoundPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-9xl font-bold text-gray-200 select-none">
              404
            </h1>

            {/* Warning Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-yellow-400 rounded-full p-4 shadow-lg transform -translate-y-4">
                <FiAlertTriangle className="w-12 h-12 text-yellow-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Sorry, the page you are looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            The page might have been moved, deleted, or you entered the wrong
            URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 shadow-md"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 shadow-md"
          >
            <FiHome className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What can you do?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <FiSearch className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-900">Check URL</span>
              </div>
              <p className="text-gray-600">
                Make sure the web address is spelled correctly.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <FiHome className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-gray-900">Visit Home</span>
              </div>
              <p className="text-gray-600">
                Go back to the dashboard and navigate from there.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
