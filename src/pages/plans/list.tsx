import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type HttpError, useMany } from "@refinedev/core";
import { DeleteButton, EditButton, List, useDataGrid } from "@refinedev/mui";
import { useModalForm } from "@refinedev/react-hook-form";
import React, { useRef, useState } from "react";

import type {  IPlan, Nullable } from "../../interfaces";
import { CreatePlanModal } from "../../components/plans/createPlanModal";
import { EditPlanModal } from "../../components/plans/editPlanModal";
import { Box } from "@mui/material";

export const PlanList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPlan>();
let indexRef=0

  const createModalFormProps = useModalForm<IPlan, HttpError, Nullable<IPlan>>({
    refineCoreProps: { action: "create" },
    syncWithLocation: true,
  });
  const {
    modal: { show: showCreateModal },
  } = createModalFormProps;

  const editModalFormProps = useModalForm<IPlan, HttpError, Nullable<IPlan>>({
    refineCoreProps: { action: "edit" },
    syncWithLocation: true,
  });
  const {
    modal: { show: showEditModal },
  } = editModalFormProps;

 let rowsWithIndex=dataGridProps.rows.map((row,index)=>{
    return {...row,index:index+1}

  })
  const dataGridPropsx={...dataGridProps,rows:rowsWithIndex}
  
  const columns = React.useMemo<GridColDef<IPlan>[]>(
    () => [
      {
        field: "index",
        headerName: "ID",
        type: "number",
       
       
      },
      { field: "name", headerName: "Name",  flex: 1 },
      { field: "limit", headerName: "Limit", minWidth: 400, flex: 1 },
       {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return <Box sx={{ display: 'grid',gridTemplateColumns: 'repeat(2, 1fr)'  }}>
             <DeleteButton hideText size="small" recordItemId={row.id} />
             <EditButton hideText onClick={() => showEditModal(row.id)} />
            </Box>;
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [],
  );
  return (
    <>
      <List createButtonProps={{ onClick: () => showCreateModal() }}>
        <DataGrid {...dataGridPropsx}  columns={columns} autoHeight />
      </List>
      <CreatePlanModal {...createModalFormProps} />
      <EditPlanModal {...editModalFormProps} />
    </>
  );
};
