import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react'


const Footer = () => {
    return ( <>
 
 
<Box mt={10}> 
  <hr />
  </Box>
 
 <Box p={4}  sx={{backgroundColor:'black', display:'flex', justifyContent:'space-between'}}>

<Box>
<Typography variant='h5'sx={{color:'white'}} > About Developer: </Typography>
<Typography variant='body2'sx={{color:'white'}} > Experienced Web Developer with over 5 years of experience.  </Typography>
</Box>

<Box>
<Typography variant='h5'sx={{color:'white'}} > Expertise: </Typography>
<Typography variant='body2'sx={{color:'white'}} > Node Js  </Typography>
<Typography variant='body2'sx={{color:'white'}} > Express  </Typography>
<Typography variant='body2'sx={{color:'white'}} > Restful Api's  </Typography>
<Typography variant='body2'sx={{color:'white'}} > Mongoose  </Typography>
<Typography variant='body2'sx={{color:'white'}} > Material Ui/ BootStrap  </Typography>
<Typography variant='body2'sx={{color:'white'}} > React  </Typography>

</Box>

<Box>
   <Typography variant='h5' sx={{color:'white'}} > Social Links: </Typography> 
   <Box gap={2} sx={{display:'flex',}}>
    <IconButton  sx={{backgroundColor:'white', "&:hover":{backgroundColor:'white'} }} > <Facebook/> </IconButton>
    <IconButton sx={{backgroundColor:'white',  "&:hover":{backgroundColor:'white'} } } > <Twitter/> </IconButton>
    <IconButton sx={{backgroundColor:'white',  "&:hover":{backgroundColor:'white'} }} > <Instagram/> </IconButton>
   </Box>
</Box>

     
 </Box>

    </> );
}
 
export default Footer;