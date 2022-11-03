import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const ApiTable = () => {
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [hideColumn, setHideColumn] = useState(true);
  console.log(gridColumnApi);

  const columnDefs = [
    {
      headerName: "Id",
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Body", field: "body", hide: true }
  ];

  const defaultColumnDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true
  };

  const onGridReady = (params) => {
    fetch(`https://jsonplaceholder.typicode.com/comments`)
      .then((res) => res.json())
      .then((res) => {
        params.api.applyTransaction({ add: res });
      });
    // columnApi is not defined it is value getting from params:-
    setGridColumnApi(params.columnApi);
  };

  // onSelectionChanged function :-// to get the data of particular row:-

  const onSelectionChanged = (e) => {
    // console.log(e.api.getSelectedRows());
  };

  // isRowSelectable function  // to select row with condition like even ids only:-

  const isRowSelectable = (node) => {
    return node.data ? node.data.id % 2 === 0 : false;
  };

  // showColumn function :-

  const showColumn = () => {
    // gridColumnApi.setColumnVisible("body", hideColumn);
    // setHideColumn(false);
  };

  useEffect(() => {
    showColumn();
  }, [hideColumn]);

  return (
    <>
      <div
        className="ag-theme-alpine"
        style={{ height: 830, width: "80%", margin: "auto" }}
      >
        <button onClick={showColumn}>Show Body</button>
        <select onChange={(e) => console.log(e.target.value)}>
          <option value="10">10</option>
          <option value="10">25</option>
          <option value="10">50</option>
          <option value="10">100</option>
        </select>
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColumnDef}
          onGridReady={onGridReady}
          // for selecting row :- for single row "single" and for multiple "multiple"
          rowSelection={"multiple"}
          // to get the data of particular row:-
          onSelectionChanged={onSelectionChanged}
          // for multiselect value without ctrl:-
          rowMultiSelectWithClick={true}
          // to select row with condition like even ids only:-
          isRowSelectable={isRowSelectable}
          // for pagination:-
          pagination={true}
          // for pagination size:-
          // paginationPageSize={10}
          // it will be adjusted as per the height of the grid:-
          paginationAutoPageSize={true}
        ></AgGridReact>
      </div>
    </>
  );
};
