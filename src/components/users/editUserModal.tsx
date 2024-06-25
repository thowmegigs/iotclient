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
import type { IPlan, IUser, Nullable } from "../../interfaces";


export const EditUserModal: React.FC<
  UseModalFormReturnType<IUser, HttpError, Nullable<IUser>>
> = ({
  saveButtonProps,
  refineCore: { queryResult },
  modal: { visible, close, title },
  register,
  control,
  formState: { errors },
}) => {
  const autocompleteROleOptions = ['Admin', 'SuperVisor', 'User'].map((option) => ({ label: option, value: option }));

  const { autocompleteProps:autocompletePlanProps } = useAutocomplete<IPlan>({
    resource: "plans",
    defaultValue: queryResult?.data?.data?.plan?.id,
  });
  return (
    <Dialog
      open={visible}
      onClose={close}
      PaperProps={{ sx: { minWidth: 500 } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ display: 'grid',gridTemplateColumns: 'repeat(2, 1fr)',gap:1  }}>
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
              InputLabelProps={{ shrink: true }}
              autoFocus
            />
            <TextField
              id="email"
              {...register("email", {
                required: "This field is required"
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
            </Box>
            <Box sx={{ display: 'grid',gridTemplateColumns: 'repeat(2, 1fr)',gap:1  }}>

            {/* <TextField
              id="password"
              {...register("password")}
             
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              autoFocus
              InputLabelProps={{ shrink: true }}
            /> */}
            <TextField
              id="phne"
              {...register("phone", {
                required: "This field is required"
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              margin="normal"
              fullWidth
              label="Phone"
              name="phone"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              id="alternate_phone"
              {...register("alternate_phone")}
              error={!!errors.alternate_phone}
              helperText={errors.alternate_phone?.message}
              margin="normal"
              fullWidth
              label="Alternate Phone"
              name="alternate_phone"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
            
            </Box>
           
            <Box sx={{ display: 'grid',gridTemplateColumns: 'repeat(2, 1fr)',gap:1  }}>
            <Controller
              control={control}
              name="role"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Autocomplete<any>
                  id="role"
                  options={autocompleteROleOptions}
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(item) => {
                    //console.log('my sds',item)
                    return item.label;
                  }}
                  isOptionEqualToValue={(option, value) => option.value === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Role"
                      {...register("role", {
                        required: "This field is required"
                      })}
                      
                      margin="normal"
                      variant="outlined"
                      name="role"
                      error={!!errors.role}
                      InputLabelProps={{ shrink: true }}
                      helperText={errors.role?.message}
                    />
                  )}
                />
              )}
            />
            <TextField
              id="company_name"
              {...register("company_name")}
              error={!!errors.company_name}
              helperText={errors.company_name?.message}
              margin="normal"
              fullWidth
              label="Company Name"
              name="company_name"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
            </Box>
            <Box sx={{ display: 'grid',gridTemplateColumns: 'repeat(2, 1fr)',gap:1  }}>
            <TextField
              id="address"
              {...register("address", {
                required: "This field is required"
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
              margin="normal"
              fullWidth
              label="Address"
              name="address"
              autoFocus
              rows={2}
              multiline
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="company_address"
              {...register("company_address")}
              error={!!errors.company_address}
              helperText={errors.company_address?.message}
              margin="normal"
              fullWidth
              label="Company Address"
              name="company_address"
              autoFocus
              multiline
              rows={2}
              InputLabelProps={{ shrink: true }}
            />
            </Box>
            <Controller
            control={control}
            name="plan"
           
            // eslint-disable-next-line
            defaultValue={null as any}
            render={({ field }) => (
              <Autocomplete<IPlan>
                id="plan"
                {...autocompletePlanProps}
                {...field}
                onChange={(_, value) => {
                  if(value)
                  field.onChange(value);
                }}
                getOptionLabel={(item) => {
                  console.log('deko',item)
                  return item.name;
                }}
                isOptionEqualToValue={(option, value) =>
                  value === undefined ||
                  option?.id?.toString() === (value?.id ?? value)?.toString()
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assign Plan"
                    margin="normal"
                    variant="outlined"
                    error={!!errors.plan}
                    helperText={errors.plan?.message}
                  />
                )}
              />
            )}
          />

           
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <SaveButton {...saveButtonProps} />
      </DialogActions>
    </Dialog>
  );
};
