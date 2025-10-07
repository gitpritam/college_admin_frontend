import type { ColDef } from "ag-grid-community";
import type { ICellRendererParams } from "ag-grid-community";
import type { IFaculty } from "../../@types/interface/faculty.interface";
import FacultyNameCellRenderer from "../../components/cellRenderer/facultyNameCellRenderer";

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
        width: 150
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
    //     field: "experiment",
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
        width: 150
    },
    {
        field: "createdAt",
        headerName:"REGISTERED AT",
        sort: 'desc'
    }
];
export default FACULTY_COL_DEF;