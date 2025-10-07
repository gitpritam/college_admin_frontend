import type { ColDef } from "ag-grid-community";

const NOTICE_LIST_COLDEF: ColDef[] = [
    {
        field: "notice_id",
        headerName: "NOTICE ID",
        sortable: true,
        filter: true,
        width: 150
    },

     {
        field: "title",
        headerName: "TTITLE",
        sortable: true,
        filter: true,
        width: 150
    }, 
    
    {
        field: "year",
        headerName: "YEAR",
        filter: true,
        sortable: true,
        width: 150
    },
];
export default NOTICE_LIST_COLDEF;