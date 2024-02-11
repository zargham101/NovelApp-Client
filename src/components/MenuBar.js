import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Avatar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';
import { Logout,} from '@mui/icons-material';
import jwt_decode from 'jwt-decode';
import axios from 'axios';



const MenuBar = () => {
const navigate=useNavigate();
useEffect(()=>{
const token=sessionStorage.getItem('token');
if(!token){

}
else{

     const id=jwt_decode(token);
     let {_id}=id
   axios.get(`http://localhost:5000/api/users/${_id}` ).then((res)=>{
      setUser(res.data);
   }).catch((e)=>{
      console.log(e);
   })

}},[])

function SignInOrNot(user){
   if(!user){
      return(
         <>
         <Box> <Button variant='contained' sx={{backgroundColor:'lightgrey', "&:hover":{backgroundColor:'white'}}} > <Link to='/Login'  style={{textDecoration:'none', }} > Login </Link>  </Button>  </Box>
         </>
      )
   }
   else if(!user.image){
      return(
         <>
         <Box gap={2} sx={{display:'flex', }} > <Box sx={{display:'flex',alignItems:'center'}}> <Box> <Avatar sx={{marginTop:'8px',marginLeft:'6px'}}>  </Avatar>  <Typography variant='body2'  > Welcome  </Typography> </Box> </ Box> <Box> <IconButton color='inherit' sx={{height:'45px'}} onClick={()=>{ sessionStorage.removeItem('token'); navigate('/'); window.location.reload();  }} > <Logout/> </IconButton> <Typography variant='body2' sx={{marginTop:'2px'}}> Log Out </Typography> </Box>   </Box>
         </>
      )
   }
   else{
      return(
         <>
         <Box gap={2} sx={{display:'flex', }} > <Box sx={{display:'flex',alignItems:'center'}}> <Box> <img src={`${user.image}`} alt="" style={{height:'38px',width:'38px', marginTop:'5px', borderRadius:'50%'}}  />  <Typography variant='body2'  > Welcome   </Typography> </Box> </ Box> <Box> <IconButton color='inherit' sx={{height:'45px'}} onClick={()=>{ sessionStorage.removeItem('token'); navigate('/'); window.location.reload() }} > <Logout/> </IconButton> <Typography variant='body2' sx={{marginTop:'2px'}}> Log Out </Typography> </Box>   </Box>
         </>
      )
   }
}



    const [user,setUser]=useState('');
    
    return ( <>
     
    <AppBar position='static' sx={{backgroundColor:'grey'}} >
     <Toolbar sx={{display:'flex', justifyContent:'space-between'}} >
       <Box>
        <Typography sx={{color:'white'}}  variant='h6' > NovelApp </Typography>
       </Box>

       <Box sx={{display:'flex'}} gap={4} >
          <Typography  variant='body2' sx={{"&:hover":{textDecoration:'underline'}}}  > <Link to='/' style={{textDecoration:'none',color:'white', "&:hover":{textDecoration:'underline'}}} > All Novels </Link> </Typography>
          <Typography variant='body2' sx={{"&:hover":{textDecoration:'underline'}}} > <Link to='/user/novels' style={{textDecoration:'none',color:'white'}} > My Novels </Link> </Typography>
          <Typography variant='body2' sx={{"&:hover":{textDecoration:'underline'}}}  > <Link to='/create/novels'  style={{textDecoration:'none',color:'white'}} > Add Novel </Link> </Typography>
       </Box>
        
        {SignInOrNot(user)}

     </Toolbar>
   
    </AppBar>
    
    
    </> );
}
 
export default MenuBar;