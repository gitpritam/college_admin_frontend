import type { ColDef, ICellRendererParams } from "ag-grid-community";
import NoticeActionCellRenderer from "../../components/cellRenderer/action/noticeActionCellRenderer";
import type { INotice } from "../../@types/interface/notice.interface";

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
    {
        headerName: 'ACTION',
        cellRenderer: (params:ICellRendererParams<INotice>)=>{return <NoticeActionCellRenderer params={params}/>}
    }
];
export default NOTICE_LIST_COLDEF;