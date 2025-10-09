import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import api from "../../../config/axios.config";
import NOTICE_LIST_COLDEF from "../../../constants/coldef/noticeListColDef";
import Pagination from "../../../components/pagination/Pagination";

function NoticeList() {
  const [rowData, setRowData] = useState(undefined);
  const [pagination, setPagination] = useState<{
    currentPage: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  }>({
    currentPage: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  });
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/notice?page=${pagination.currentPage}&limit=${pagination.limit}&query=${query}`,
        );
        console.log(response);
        if (response.status == 200) {
          const { currentPage, limit, totalCount, totalPages, data } =
            response.data.result;
          setRowData(data);
          setPagination({
            currentPage,
            limit,
            totalCount,
            totalPages,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pagination.currentPage, pagination.limit, query]);
  

  const handlePageChange = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
    console.log(pageNumber);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.elements[0].value);
  };
  return (
    <div className="flex w-full p-6 flex-col">
      <h1 className="main-heading font-bold text-xl mb-5">Notice List</h1>
      <form className="flex items-center gap-2 my-2 flex-wrap" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search (Title/Notice ID/ Year)"
          className="flex-grow px-2 py-2 border-1 border-gray-400 rounded-md"
        />
        <button
          className="px-2 py-2 bg-[#1e2939] hover:bg-[#30415a] text-white rounded-md cursor-pointer"
         type="submit"
        >
          Search
        </button>
      </form>
      <div className="w-full h-[400px]">
        <AgGridReact rowData={rowData} columnDefs={NOTICE_LIST_COLDEF} />
      </div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex justify-center items-center gap-1">
          <label>Limit</label>
          <select
            value={pagination.limit}
            onChange={(e) =>
              setPagination({
                ...pagination,
                currentPage: 1,
                limit: Number(e.target.value),
              })
            }
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value= "5">5 </option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <Pagination
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          maxPageButtons={5}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
export default NoticeList;
