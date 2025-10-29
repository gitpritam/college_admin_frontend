import { MdOutlineDelete, MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router";
import api from "../../../config/axios.config";
import { toast } from "react-toastify";
import { TbLockCheck } from "react-icons/tb";

function FacultyActionCellRenderer({ params }) {
  const navigate = useNavigate();
  const { data, api:gridApi } = params;
  const handlePreviewClick = () => {
    navigate(`/faculty/${data.faculty_id}`);
  };

  const handleFacultyDelete = async () => {
    const result = confirm(
      `Are you sure to delete this faculty [${data.faculty_id}]?`,
    );
    if (!result) return;
    console.log("This line works");


    try {
      const response = await api.delete(`/faculty/${data.faculty_id}`);
      if (response.status === 200) {
        toast("Faculty deleted successfully", { type: "success" });
        gridApi.applyTransaction({ remove: [data] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacultyPermission = async () => {
  navigate(`/permission/${data.faculty_id}/${data.name}`);
}; 

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={handlePreviewClick}
        title="View"
        className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors duration-200"
      >
        <MdOutlineRemoveRedEye size={18} />
      </button>

      <button
        onClick={handleFacultyDelete}
        title="Delete"
        className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors duration-200"
      >
        <MdOutlineDelete size={18} />
      </button>

      <button
        onClick={handleFacultyPermission}
        title="Permission"
        className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors duration-200"
      >
        <TbLockCheck size={18} />
      </button>

    </div>
  );
}

export default FacultyActionCellRenderer;
