import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Tooltip } from "highcharts";
import axios from "axios";

export const Table = () => {
  const actionButton = (params) => {
    console.log("params", params);
    // params is targeting the imp fields and in the data we are getting the all the headers
    alert(`${params.data.name}  ${params.data.salary}`);
  };

  const data = [
    { name: "jai", age: 28, salary: 45000 },
    { name: "sri", age: 26, salary: 25000 },
    { name: "srinika", age: 1, salary: 1000 },
    { name: "jaishvik", age: 0, salary: 500 }
  ];

  const columns = [
    {
      headerName: "Name",
      field: "name",
      checkboxSelection: true
    },

    // to change the color of the cell:-
    {
      headerName: "Age",
      field: "age",
      // forTooltips:-
      tooltipField: "name",
      cellStyle: (params) =>
        params.value > 18 ? { background: "green" } : { background: "red" }
    },

    {
      headerName: "Salary",
      field: "salary",
      cellRendererFramework: (params) => (
        <div>
          <button onClick={() => actionButton(params)}>Click Me</button>
        </div>
      )
    }
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1
  };

  // onGridReady function :-
  // this function will run when the component will mount:-
  const onGridReady = async (params) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/comments`
    );
    console.log(data);
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 450, width: "50%", margin: "auto" }}
    >
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        // forTooltips:-
        enableBrowserTooltips={true}
        onGridReady={onGridReady}
      ></AgGridReact>
    </div>
  );
};
