import { Box,Typography } from "@mui/material"

export const Unauthorized: React.FC = () => {
    return <Box  sx={{height:'500px',pt:'100px',textAlign:'center'}}>
        <img src="res.jpg" style={{margin:'auto',width:'300px',height:'300px'}}/>
        <Typography variant="h4" sx={{textAlign:'center',color:'black'}} gutterBottom>
        Access Not Allowed
  </Typography></Box>
}