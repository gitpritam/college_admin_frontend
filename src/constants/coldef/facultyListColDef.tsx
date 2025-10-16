import type { ColDef } from "ag-grid-community";
import type { ICellRendererParams } from "ag-grid-community";
import type { IFaculty } from "../../@types/interface/faculty.interface";
import FacultyNameCellRenderer from "../../components/cellRenderer/facultyNameCellRenderer";
import FacultyActionCellRenderer from "../../components/cellRenderer/action/facultyActionCellRenderer";

const FACULTY_COL_DEF: ColDef[]= [
    {
       field: "faculty_id",
       headerName: "FACULTY ID",
       sortable: true,
       filter: true,
       width: 150
    },
    {
        headerName: "NAME",
        sortable: true,
        filter: true,
        width: 150,
        cellRenderer:(params: ICellRendererParams<IFaculty>)=> <FacultyNameCellRenderer data={params.data}/>
    },
    {
        field: "dob",
        headerName: "DATE OF BIRTH",
        sortable: true,
        filter: true,
        width: 150,
        valueFormatter: (params) => {
      console.log(params);
      return new Date(params.value).toLocaleDateString()
    },
    },
    {
        field: "phone_number",
        headerName: "PHONE NUMBER",
        sortable: true,
        filter: true,
        width: 150
    },
    {
        field: "email",
        headerName: "EMAIL",
        sortable: true,
        filter: true,
        width: 150
    },
    {
        field: "qualification",
        headerName: "QUALIFICATION",
        sortable: true,
        filter: true,
        width: 150
    },
    {
        field: "designation",
        headerName: "DESIGNATION",
        sortable: true,
        filter: true,
        width: 150
    },
    {
        field: "department",
        headerName: "DEPARTMENT",
        sortable: true,
        filter: true,
        width: 100
    },
    //  {
    //     field: "experience",
    //     headerName: "EXPERIENCE",
    //     sortable: true,
    //     filter: true,
    //     width: 150
    // },
     {
        field: "joining_date",
        headerName: "JOINING DATE",
        sortable: true,
        filter: true,
        width: 150,
        sort: "desc",
        valueFormatter: (params) => {
            console.log(params);
            return new Date(params.value).toLocaleDateString() 
               
        }
    },

    {
    field: "createdAt",
    headerName: "Registered At",
    sortable: true, sort: 'desc',
    valueFormatter: (params) => {
      console.log(params);
      return (
        new Date(params.value).toLocaleDateString() +
        " " +
        new Date(params.value).toLocaleTimeString(undefined, {
          hourCycle: "h12",
        })
      );
    },
  },
   {
          headerName: 'ACTION',
          cellRenderer: (params:ICellRendererParams<IFaculty>)=>{return <FacultyActionCellRenderer params={params}/>}
      }
];
export default FACULTY_COL_DEF;