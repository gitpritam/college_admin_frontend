import type { ColDef } from "ag-grid-community";
import getFullName from "../../utils/getFullName";

/*
 field name === je data as6e tar property name. bujhli?
 yes 
 */

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
        valueFormatter: (params) => {
            return getFullName(params.data.first_name, params.data.last_name, params.data?.middle_name) ;
        }
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