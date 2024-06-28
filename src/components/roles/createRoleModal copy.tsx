// import type { HttpError } from "@refinedev/core";
// import { SaveButton, useAutocomplete } from "@refinedev/mui";

// import Autocomplete from "@mui/material/Autocomplete";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";

// import type { UseModalFormReturnType } from "@refinedev/react-hook-form";


// import type {  IRole, Nullable } from "../../interfaces";
// import { Checkbox, FormControlLabel, Grid } from "@mui/material";
// import { Controller } from "react-hook-form";
// import { useEffect, useRef, useState } from "react";
// const resources=['Device','Plan','User'];
// export const CreateRoleModal: React.FC<
//   UseModalFormReturnType<IRole, HttpError, Nullable<IRole>>
// > = ({
//   saveButtonProps,
//   modal: { visible, close, title },
//   register,
//   control,
//   formState: { errors },
// }) => {
// const permissionsRef=useRef<any>({})
// const setPermissionFiledValue=(resource:string,action:string,isChecked:boolean,field:any)=>{
//   console.log(permissionsRef.current)
//   if(isChecked){
//   let obj={...permissionsRef.current}
//   if(obj[resource]!==undefined){
//     obj[resource][action]=true;
//   }
//   else{
//     obj[resource]={}
//     obj[resource][action]=true
//   }
//   permissionsRef.current={...obj}
 
 
//   field.onChange(permissionsRef.current);
// }
// else{
//   let obj={...permissionsRef.current}
//   if(obj[resource]!==undefined){
//    delete obj[resource][action];
//   }
//   permissionsRef.current={...obj}
 
//   field.onChange(permissionsRef.current);

// }
  
// }
//   return (
//     <Dialog
//       open={visible}
//       onClose={close}
//       PaperProps={{ sx: { minWidth: 500 } }}
//     >
//       <DialogTitle>{title}</DialogTitle>
//       <DialogContent>
//         <Box
//           component="form"
//           autoComplete="off"
//           sx={{ display: "flex", flexDirection: "column" }}
//         >
//          <TextField
//             id="name"
//             {...register("name", {
//               required: "This field is required",
//             })}
//             error={!!errors.name}
//             helperText={errors.name?.message}
//             margin="normal"
//             fullWidth
//             label="Name"
//             name="name"
//             autoFocus
//           />
//           {resources.map(function (v,index){
//               return <Grid container  key={index}
//               alignItems="center">
//               <Grid item >
//                 {v}
//               </Grid>
//               <Grid item >
//               <Controller
//                    name="permissions"
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }:any) => <FormControlLabel {...field} 
//                     onChange={(_, value) => {
//                       setPermissionFiledValue(v,'create',value,field)
//                     }} control={<Checkbox  />} label="Create" />}
//                   />
//               </Grid>
//               <Grid item >
//               <Controller
//                    name="permissions"
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }:any) => <FormControlLabel {...field} 
//                     onChange={(_, value) => {
//                       console.log(permissionsRef.current)
//                       setPermissionFiledValue(v,'edit',value,field)
                      
//                     }} control={<Checkbox  />} label="Edit" />}
//                   />
//               </Grid>
//               <Grid item >
//               <Controller
//                    name="permissions"
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }:any) => <FormControlLabel {...field} 
//                     onChange={(_, value) => {
//                       console.log(permissionsRef.current)
//                       setPermissionFiledValue(v,'delete',value,field)
                      
//                     }} control={<Checkbox  />} label="Delete" />}
//                   />
//               </Grid>
//               <Grid item >
//               <Controller
//                    name="permissions"
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }:any) => <FormControlLabel {...field} 
//                     onChange={(_, value) => {
//                       console.log(permissionsRef.current)
//                       setPermissionFiledValue(v,'owned',value,field)
                      
//                     }} control={<Checkbox  />} label="Owned" />}
//                   />
//               </Grid>
              
//               </Grid>
//           })}
       
      
          
          
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={close}>Cancel</Button>
//         <SaveButton {...saveButtonProps} />
//       </DialogActions>
//     </Dialog>
//   );
// };
