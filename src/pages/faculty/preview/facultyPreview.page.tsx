import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../../config/axios.config";
import { FiFileText } from "react-icons/fi";
import type { IAddress } from "../../../@types/interface/address.interface";


interface IUser {
  first_name: string;
  last_name: string;
}

interface IFaculty {
  faculty_id: string;
  name: string;
  dob: string;
  email: string;
  phone_number: string;
  qualification: string;
  department: string;
  designation: string;
  experience: number;
  joining_date: string;
  profile_photo: string;
  address: IAddress;
  posted_by?: IUser;
  createdAt: string;
  updatedAt: string;
}
const FacultyPreview: React.FC = () => {
  const [data, setData] = useState<IFaculty | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { faculty_id } = useParams<{ faculty_id: string }>();

    useEffect(() => {
      const fetchFaculty = async () => {
        try {
          const response = await api.get(`/faculty/${faculty_id}`);
          if (response.status === 200) {
            const { result } = response.data;
            setData(result);
          }
        } catch (error) {
          console.error("Error fetching faculty:", error);
        } finally {
          setLoading(false);
        }
      };

      if (faculty_id) fetchFaculty();
    }, [faculty_id]);


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
              <p className="text-gray-600 text-lg">Event not found</p>
            </div>
          </div>
        );
      }
    
      // ---------- Main Content ----------
return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 flex items-center gap-6">
          <img
            src={data.profile_photo}
            alt="Faculty"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{data.name}</h1>
            <p className="text-blue-100 text-sm mt-1">Faculty ID: {data.faculty_id}</p>
            <p className="text-blue-100 text-sm">Department: {data.department}</p>
            <p className="text-blue-100 text-sm">Designation: {data.designation}</p>
          </div>
        </div>

        {/* Faculty Information */}
        <div className="px-8 py-6 grid md:grid-cols-2 gap-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Faculty Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Faculty ID:</span> {data.faculty_id}</p>
              <p><span className="font-medium">Name:</span> {data.name}</p>
              <p><span className="font-medium">Date of Birth:</span> {formatDate(data.dob)}</p>
              <p><span className="font-medium">Email:</span> {data.email}</p>
              <p><span className="font-medium">Phone Number:</span> {data.phone_number}</p>
              <p><span className="font-medium">Qualification:</span> {data.qualification}</p>
              <p><span className="font-medium">Department:</span> {data.department}</p>
              <p><span className="font-medium">Designation:</span> {data.designation}</p>
              <p><span className="font-medium">Experience:</span> {data.experience} years</p>
              <p><span className="font-medium">Joining Date:</span> {formatDate(data.joining_date)}</p>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Address</h2>
            <div className="text-gray-700">
              <p>{data.address || "No address available"}</p>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-wrap gap-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-medium">Posted by:</span>
              <span>
                {data.posted_by
                  ? `${data.posted_by.first_name} ${data.posted_by.last_name}`
                  : "Unknown"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Created At:</span>
              <span>{formatDate(data.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Last Updated:</span>
              <span>{formatDate(data.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};
    
 export default FacultyPreview;
      