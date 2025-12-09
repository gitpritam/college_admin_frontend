import React, { useEffect } from "react";
import type { IFaculty } from "../../@types/interface/faculty.interface";
import api from "../../config/axios.config";
import getFullName from "../../utils/getFullName";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { MdArrowBack } from "react-icons/md";


const PermissionPage: React.FC = () => {
  const { faculty_id} = useParams();
  const [facultyData, setFacultyData] = React.useState<IFaculty>();
  const [loading,setLoading] = React.useState<boolean>(false);
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

  const handleBack=()=>{
    window.history.back();
  }

const handleSave=async()=>{
  try {
    console.log(permissions);
    const response = await api.patch("/faculty/permission/"+faculty_id,{
      event_permission:permissions.event,
      notice_permission:permissions.notice,
    });console.log(response);
    setFacultyData((prev)=>prev?{...prev,event_permission:permissions.event,notice_permission:permissions.notice}:prev);
    toast("Permissions updated successfully", { type: "success" });
  } catch (error) {
    toast("Failed to update permissions", { type: "error" });
  }
}
  useEffect(()=>{
    const fetchFacultyData = async () => {
      setLoading(true);
      try {
        const response =   await api.get(`/faculty/${faculty_id}`);
        const {data} = response;
        setFacultyData(data.result);
        setPermissions({event:data.result.event_permission ?? false, notice:data.result.notice_permission ?? false});
        
      } catch (error) {
        console.error("Error fetching faculty data:", error);
        toast("Something went wrong", { type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  },[faculty_id]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Faculty Permission
        </h1>

        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Name: <span className="text-blue-600">{getFullName(facultyData?.first_name || "", facultyData?.last_name || "",facultyData?.middle_name)}</span>
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
            onClick={handleSave}
            disabled={facultyData?.event_permission === permissions.event && facultyData?.notice_permission === permissions.notice}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 cursor-pointer"
            >
            Save
            </button>
        </div>
        <div className="mt-2 text-left">
          <button
          onClick={handleBack}
          className="text-blue-600 font-medium"
          >  <MdArrowBack className="inline mr-1"/> Back
          </button>
          </div>
      </div>
    </div>
  );
};

export default PermissionPage;
