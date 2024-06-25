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
import type { IPlan, Nullable } from "../../interfaces";


export const EditPlanModal: React.FC<
  UseModalFormReturnType<IPlan, HttpError, Nullable<IPlan>>
> = ({
  saveButtonProps,
  refineCore: { queryResult },
  modal: { visible, close, title },
  register,
  control,
  formState: { errors },
}) => {
  

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
       
        
          <TextField
            id="limit"
            {...register("limit", {
              required: "This field is required",
            })}
            InputLabelProps={{ shrink: true }}
            type="number"
            error={!!errors.limit}
            helperText={errors.limit?.message}
            margin="normal"
            label="Limit"
            name="limit"
           
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
