import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../../config/axios.config";
import { FiFileText } from "react-icons/fi";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";

// ---------- Types ----------
interface IUser {
  first_name: string;
  last_name: string;
}

interface IEvent {
  event_id: string;
  title: string;
  description: string;
  posted_by?: IUser;
  createdAt: string;
  updatedAt: string;
}

// ---------- Component ----------
const EventPreview: React.FC = () => {
  const [data, setData] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { event_id } = useParams<{ event_id: string }>();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/event/${event_id}`);
        if (response.status === 200) {
          const { result } = response.data;
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching notice:", error);
      } finally {
        setLoading(false);
      }
    };

    if (event_id) fetchEvent();
  }, [event_id]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ---------- Loading ---------- 
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  // ---------- No Data ----------
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <FiFileText  className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No event found</p>
        </div>
      </div>
    );
  }

  // ---------- Main Content ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-block bg-white bg-opacity-20  text-sm font-semibold px-4 py-1 rounded-full">
                {data.event_id}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mt-4">{data.title}</h1>
          </div>

          {/* Meta Info */}
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <FaRegUser  className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Posted by:</span>
                <span>
                  {data.posted_by
                    ? `${data.posted_by.first_name} ${data.posted_by.last_name}`
                    : "Unknown"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaRegCalendarAlt className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Posted on:</span>
                <span>{formatDate(data.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Event Details
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.description}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Last updated: {formatDate(data.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;