import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type HttpError, useMany, useCan } from "@refinedev/core";
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import { useModalForm } from "@refinedev/react-hook-form";
import React, { useRef, useState } from "react";

import type {  IUser, Nullable } from "../../interfaces";
import { CreateUserModal } from "../../components/users/createUserModal";
import { EditUserModal } from "../../components/users/editUserModal";
import { Box, Button, IconButton } from "@mui/material";
import { ShowUser } from "../../components/users/viewModal";
import { RemoveRedEye } from "@mui/icons-material";
import { Unauthorized } from "../../unauthorized";


export const UserList: React.FC = () => {
  const [showModal,setShowModal]=useState(false)
  const [selectedRow,setSelectedRow]=useState<any>(null)
  const close=()=>{
    setShowModal(false)
  }
  const handleView=(row:any)=>{
    setShowModal(true);
    setSelectedRow(row)

  }
  const { dataGridProps } = useDataGrid<IUser>();


  const createModalFormProps = useModalForm<IUser, HttpError, Nullable<IUser>>({
    refineCoreProps: { action: "create" },
    syncWithLocation: true,
  });
  const {
    modal: { show: showCreateModal },
  } = createModalFormProps;

  const editModalFormProps = useModalForm<IUser, HttpError, Nullable<IUser>>({
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
  
  const columns = React.useMemo<GridColDef<IUser>[]>(
    () => [
      {
        field: "index",
        headerName: "Sno",
        type: "number",
       
       
      },
      { field: "name", headerName: "Name",  flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "phone", headerName: "Phone", flex: 1 },
      { field: "role", headerName: "Role", flex: 1 },
      { field: "plan.name", headerName: "Plan", flex: 1,renderCell:({row})=>{
        return row.plan?.name;
      } },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return <Box sx={{ display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)'  }}>
           
            <IconButton color="primary" sx={{py:'0'}} onClick={()=>handleView(row)}   aria-label="delete">
  <RemoveRedEye />
</IconButton>
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
  const {data:resource_permission}=useCan({resource: "users",action: "list"})
  return (resource_permission!==undefined && resource_permission?.can ?<>
    <List createButtonProps={{ onClick: () => showCreateModal() }}>
      <DataGrid {...dataGridPropsx}  columns={columns} autoHeight />
    </List>
    <CreateUserModal {...createModalFormProps} />
    <EditUserModal {...editModalFormProps} />
  </>:<Unauthorized />
  
);
};
