import type { HttpError } from "@refinedev/core";
import { SaveButton, useAutocomplete } from "@refinedev/mui";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import type { UseModalFormReturnType } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";
import { type IPermission, type IRole, type Nullable, type actionType } from "../../interfaces";
import { useRef } from "react";
import { Checkbox, CircularProgress, FormControlLabel, Grid } from "@mui/material";
import { resources } from "../../constants";

export const EditRoleModal: React.FC<
  UseModalFormReturnType<IRole, HttpError, Nullable<IRole>>
> = ({
  saveButtonProps,
  refineCore: { queryResult },
  modal: { visible, close, title },
  register,
  control,
  formState: { errors },
}) => {


    const permissionsRef = useRef<IPermission>({})
    if (queryResult && queryResult?.status == 'success') {
      let perm = queryResult?.data?.data?.permissions as IPermission
      permissionsRef.current = perm
    }
    const setPermissionFiledValue = (resource: string, action: actionType, isChecked: boolean, field: any) => {

      if (isChecked) {
        let obj = { ...permissionsRef.current }
        if (obj[resource] !== undefined) {
          obj[resource][action] = true;
        }
        else {
         
          obj[resource]={}
          obj[resource][action] = true
        }
        permissionsRef.current = { ...obj }


        field.onChange(permissionsRef.current);
      }
      else {
        let obj = { ...permissionsRef.current }
        if (obj[resource] !== undefined) {
          delete obj[resource][action];
        }
        permissionsRef.current = { ...obj }

        field.onChange(permissionsRef.current);

      }

    }
    const buildPermissionFieldValue = (resource: any, action: any) => {
      if (queryResult && queryResult?.status == 'success') {
        let perm = queryResult?.data?.data?.permissions as IPermission

        if (perm && perm[resource] !== undefined) {
          if (action == 'create') {
            return perm[resource]['create'] ?? false
          }
          else if (action == 'edit') {
            return perm[resource]?.['edit'] ?? false
          }
          else if (action == 'delete') {
            return perm[resource]['delete'] ?? false
          }
          else if (action == 'list') {
            return perm[resource]['list'] ?? false
          }
          else if (action == 'show') {
            return perm[resource]['show'] ?? false
          }
          else if (action == 'owned') {
            return perm[resource]['owned'] ?? false
          }
        }
      }
      return false;

    }
    return (
      <Dialog
        open={visible}
        onClose={close}
        PaperProps={{ sx: { minWidth: 500 } }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {queryResult?.status == 'loading' ? <CircularProgress /> : <Box
            component="form"
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              id="name"
              {...register("name", {
                required: "This field is required",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />

            {resources.map(function (v, index) {
              return <Grid container key={index}
                alignItems="center">
                <Grid item >
                  {v.replace(/\b\w/g, function (char) {
                    return char.toUpperCase();
                  })} &nbsp; &nbsp;
                </Grid>
                <Grid item >
                  <Controller
                    name="permissions"
                    control={control}
                    rules={{ required: true }}

                    render={({ field }: any) => <FormControlLabel {...field}
                      onChange={(_, value) => {
                        setPermissionFiledValue(v, 'list', value, field)
                      }} control={<Checkbox defaultChecked={buildPermissionFieldValue(v, 'list')} />} label="List" />}
                  />
                </Grid>
                <Grid item >
                  <Controller
                    name="permissions"
                    control={control}
                    rules={{ required: true }}

                    render={({ field }: any) => <FormControlLabel {...field}
                      onChange={(_, value) => {
                        setPermissionFiledValue(v, 'show', value, field)
                      }} control={<Checkbox defaultChecked={buildPermissionFieldValue(v, 'show')} />} label="Show" />}
                  />
                </Grid>
                <Grid item >
                  <Controller
                    name="permissions"
                    control={control}
                    rules={{ required: true }}

                    render={({ field }: any) => <FormControlLabel {...field}
                      onChange={(_, value) => {
                        setPermissionFiledValue(v, 'create', value, field)
                      }} control={<Checkbox defaultChecked={buildPermissionFieldValue(v, 'create')} />} label="Create" />}
                  />
                </Grid>
                <Grid item >
                  <Controller
                    name="permissions"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }: any) => <FormControlLabel {...field}
                      onChange={(_, value) => {
                        console.log(permissionsRef.current)
                        setPermissionFiledValue(v, 'edit', value, field)

                      }} control={<Checkbox defaultChecked={buildPermissionFieldValue(v, 'edit')} />} label="Edit" />}
                  />
                </Grid>
                <Grid item >
                  <Controller
                    name="permissions"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }: any) => <FormControlLabel {...field}
                      onChange={(_, value) => {
                        console.log(permissionsRef.current)
                        setPermissionFiledValue(v, 'delete', value, field)

                      }} control={<Checkbox defaultChecked={buildPermissionFieldValue(v, 'delete')} />} label="Delete" />}
                  />
                </Grid>
                <Grid item >
                  <Controller
                    name="permissions"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }: any) => <FormControlLabel {...field}
                      onChange={(_, value) => {
                        console.log(permissionsRef.current)
                        setPermissionFiledValue(v, 'owned', value, field)

                      }} control={<Checkbox defaultChecked={buildPermissionFieldValue(v, 'owned')} />} label="Owned" />}
                  />
                </Grid>

              </Grid>
            })}




          </Box>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <SaveButton {...saveButtonProps} />
        </DialogActions>
      </Dialog>
    );
  };
