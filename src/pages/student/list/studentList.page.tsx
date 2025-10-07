
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import api from '../../../config/axios.config';
import STUDENT_COL_DEF from '../../../constants/coldef/studentListColDef';


function StudentList() {
  const [rowData, setRowData] = useState(undefined);

  useEffect(()=>{
    const fetchData = async()=>{
        try {
          const response = await api.get('/students');
          console.log(response);
          if(response.status === 200){
            const data = response.data.result;
            setRowData(data);
          }
        } catch (error) {
          console.log(error);
        }
    }
    fetchData();

  },[]);

  return (
    <div className="flex w-full p-6 flex-col">
      <h1 className="main-heading font-bold text-xl mb-5">Student List</h1>
      <div className="w-full h-[400px]">
      <AgGridReact
        rowData={rowData}
        columnDefs={STUDENT_COL_DEF}
      />
    </div>
    </div>
  );
}

export default StudentList;
