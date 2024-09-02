import React from 'react';
import GetAppIcon from "@mui/icons-material/GetApp";
import {Button} from "@mui/material";
import {GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton,} from "@mui/x-data-grid";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

const TableToolbar = ({columns, rows, fileName}) => {
  const exportToExcel = () => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const dataWithHeaders = rows.map((row) => {
      const obj = {};
      columns
        .slice(0, -1) // Remove the last column (actions)
        .filter((column) => column.headerName)
        .forEach((column) => {
          if (column.headerName) obj[column.headerName] = row[column.field];
        });
      return obj;
    });

    const ws = XLSX.utils.json_to_sheet(dataWithHeaders);
    const wb = {Sheets: {data: ws}, SheetNames: ["data"]};
    const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton color='secondary'/>
      <GridToolbarFilterButton color='secondary'/>
      <Button color="secondary" variant="text" startIcon={<GetAppIcon/>} onClick={exportToExcel}>
        Exportar Excel
      </Button>
    </GridToolbarContainer>
  );
}

export default TableToolbar;