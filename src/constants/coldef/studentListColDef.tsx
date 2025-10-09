import type { ColDef } from "ag-grid-community";
import StudentNameCellRenderer from "../../components/cellRenderer/studentNameCellRenderer";
import type { ICellRendererParams } from 'ag-grid-community';
import type { IStudent } from "../../@types/interface/student.interface";

const STUDENT_COL_DEF: ColDef[]= [
    {
       field: "student_id",
       headerName: "STUDENT ID",
       sortable: true,
       filter: true,
       width: 150
    },
    {
        headerName: "NAME",
        sortable: true,
        filter: true,
        width: 150,
        cellRenderer:(params: ICellRendererParams<IStudent>)=> <StudentNameCellRenderer data={params.data}/>
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
        field: "guardian_name",
        headerName: "GUARDIAN NAME",
        sortable: true,
        filter: true,
        width: 180
    },
   
    {
        field: "department",
        headerName: "DEPARTMENT",
        sortable: true,
        filter: true,
        width: 100
    },
];
export default STUDENT_COL_DEF;