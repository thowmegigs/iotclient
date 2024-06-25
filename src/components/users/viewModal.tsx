import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableCell, TableRow } from "@mui/material"
import React from "react"

export const ShowUser = ({ row, open, close }: any) => {
    return <Dialog
        open={open}
        onClose={close}

    >
        <DialogTitle >
           User Detail
        </DialogTitle>
        <DialogContent>
            <Table sx={{ minWidth: '400px' }}>
                <TableRow><TableCell sx={{color:'black',fontWeight:'bold',fontSize:'13px'}}>Name</TableCell>
                    <TableCell>{row.name}</TableCell></TableRow>
                <TableRow><TableCell  sx={{color:'black',fontWeight:'bold',fontSize:'13px'}}>Email</TableCell><TableCell>{row.email}</TableCell></TableRow>
                <TableRow><TableCell  sx={{color:'black',fontWeight:'bold',fontSize:'13px'}}>Phone</TableCell><TableCell>{row.phone}</TableCell></TableRow>
                <TableRow><TableCell  sx={{color:'black',fontWeight:'bold',fontSize:'13px'}}>Alternate Phone</TableCell><TableCell>{row.alternate_phone}</TableCell></TableRow >
                <TableRow><TableCell  sx={{color:'black',fontWeight:'bold',fontSize:'13px'}}>Address</TableCell><TableCell>{row.address}</TableCell></TableRow >
                <TableRow><TableCell  sx={{color:'black',fontWeight:'bold',fontSize:'13px'}}>Company Name</TableCell><TableCell>{row.company_name}</TableCell></TableRow >
                <TableRow><TableCell  sx={{color:'black',fontWeight:'bold',fontSize:'13px'}}>Company Address</TableCell><TableCell>{row.company_address}</TableCell></TableRow >
                {
                    row.plan &&
                    <TableRow><TableCell  sx={{color:'black',fontWeight:'bold',fontSize:'13px'}}>Plan</TableCell><TableCell>
                        <b>Name-</b>{row.plan.name},<br/>
                        <b>Limit-</b>{row.plan.limit}</TableCell></TableRow>
                }

            </Table >
        </DialogContent >
        <DialogActions>
            <Button onClick={close}>Close</Button>

        </DialogActions>
    </Dialog >
}