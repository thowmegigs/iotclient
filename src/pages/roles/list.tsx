import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type HttpError, useMany, useCan } from "@refinedev/core";
import { DeleteButton, EditButton, List, useDataGrid } from "@refinedev/mui";
import { useModalForm } from "@refinedev/react-hook-form";
import React, { useRef, useState } from "react";

import type {  IRole, Nullable } from "../../interfaces";

import { Box } from "@mui/material";
import { CreateRoleModal } from "../../components/roles/createRoleModal";
import { EditRoleModal } from "../../components/roles/editRoleModal";
import { Navigate, useNavigate } from "react-router-dom";
import { Unauthorized } from "../../unauthorized";

export const RoleList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IRole>();
  const {data:resource_permission}=useCan({resource: "roles",action: "list"})


  const createModalFormProps = useModalForm<IRole, HttpError, Nullable<IRole>>({
    refineCoreProps: { action: "create" },
    syncWithLocation: true,
  });
  const {
    modal: { show: showCreateModal },
  } = createModalFormProps;
const navigate=useNavigate()
  const editModalFormProps = useModalForm<IRole, HttpError, Nullable<IRole>>({
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
  
  const columns = React.useMemo<GridColDef<IRole>[]>(
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
  return (resource_permission!==undefined && resource_permission?.can ?<>
      <List createButtonProps={{ sx:{'display':resource_permission?.can?'block':'none'} , onClick: () => showCreateModal() }}>
        <DataGrid {...dataGridPropsx}  columns={columns} autoHeight />
      </List>
      <CreateRoleModal {...createModalFormProps} />
      <EditRoleModal {...editModalFormProps} />
    </>:<Unauthorized />
    
  );
};
