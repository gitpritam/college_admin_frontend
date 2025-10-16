import type { ColDef, ICellRendererParams } from "ag-grid-community";
import type { IEvent } from "../../@types/interface/event.interface";
import EventActionCellRenderer from "../../components/cellRenderer/action/eventActionCellRenderer";

const EVENT_LIST_COLDEF: ColDef[] = [
  {
    field: "event_id",
    headerName: "Event ID",
    sortable: true,
    filter: true,
    width: 150
  },
  { field: "title", headerName: "Title", filter: true, width: 300 },
  { field: "venue", headerName: "Venue", width: 180 },
  {
    field: "start_date",
    headerName: "Start Date",
    filter: true,
    sortable: true,
    width:120,
    valueFormatter: (params) => {
      console.log(params);
      return new Date(params.value).toLocaleDateString();
    },
  },
  {
    field: "end_date",
    headerName: "End Date",
    filter: true,
    sortable: true,
    width:120,
    valueFormatter: (params) => {
      console.log(params);
      return new Date(params.value).toLocaleDateString();
    },
  },
  {
    field: "start_time",
    headerName: "Start Time",
    width: 100,
    valueFormatter: (params) => {
      const [hh, mm] = params.value.split(":");//22:45
      const date = new Date();
      date.setHours(hh, mm);
      return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h12",
      });
    },
  },
  { field: "end_time", headerName: "End Time",width: 100, valueFormatter: (params) => {
      const [hh, mm] = params.value.split(":");//22:45
      const date = new Date();
      date.setHours(hh, mm);
      return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h12",
      });
    }, },
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
          cellRenderer: (params:ICellRendererParams<IEvent>)=>{return <EventActionCellRenderer params={params}/>}
      }
];

export default EVENT_LIST_COLDEF;

/*
createdAt
: 
"2025-09-23T17:04:55.853Z"
description
: 
"fdgrg"
end_date
: 
"2025-09-09T00:00:00.000Z"
end_time
: 
"03:00"
event_id
: 
"EVENT-25-001"
posted_by
: 
"6896350916209961c9f9e2b2"
start_date
: 
"2025-09-08T00:00:00.000Z"
start_time
: 
"01:34"
title
: 
"add"
updatedAt
: 
"2025-09-23T17:04:55.853Z"
venue
: 
"csdC"
__v
: 
0
_id
: 
"68d2d33792445e3f3bffb940"
*/
