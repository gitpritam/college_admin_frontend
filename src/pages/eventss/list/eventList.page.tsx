import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import api from '../../../config/axios.config';
import EVENT_LIST_COLDEF from '../../../constants/coldef/eventListColDef';


function EventList() {
  const [rowData, setRowData] = useState(undefined);

  useEffect(()=>{
    const fetchData = async()=>{
        try {
          const response = await api.get('/event');
          console.log(response);
          if(response.status === 200){
            const {data} = response.data.result;
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
      <h1 className="main-heading font-bold text-xl mb-5">Event List</h1>
      <div className="w-full h-[400px]">
      <AgGridReact
        rowData={rowData}
        columnDefs={EVENT_LIST_COLDEF}
      />
    </div>
    </div>
  );
}

export default EventList;
