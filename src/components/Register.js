import React from 'react';
import {useState,useEffect} from 'react';
import Image from './Images/RegisterCover.jpg'
import {Link, useNavigate} from 'react-router-dom';
import { Box } from '@mui/system';
import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';

const Register = () => {
    const navigate=useNavigate();
    let [email,setEmail]=useState('');
    let [name,setName]=useState('');
    let [password,setPassword]=useState('');
    let [confirm,setConfirm]=useState('');
    let [image,setImage]=useState('');
    return ( <>
    
    <Box sx={{backgroundImage:`url(${Image})`, backgroundSize:'cover', height:600, display:'flex', justifyContent:'center', alignItems:'center'}}>
    <Box >
  <Typography variant='h4' sx={{color:'lightgrey', marginLeft:15,marginBottom:5}} > Register </Typography>
<Grid container  mt={1} >
<Grid item  >
    <TextField sx={{backgroundColor:'white',width:'350px'}} variant='filled' label='Enter Email' value={email}  onChange={(e)=>{
setEmail(e.target.value);
    }} />
</Grid>

</Grid>

<Grid container  mt={3} >
<Grid item  >
    <TextField sx={{backgroundColor:'white',width:'350px'}} variant='filled' label='Name' value={name}  onChange={(e)=>{
setName(e.target.value);
    }} />
</Grid>

</Grid>



<Grid container mt={3} >
<Grid item  >
    <TextField sx={{backgroundColor:'white', width:'350px' }}  type='password' variant='filled' label='Enter Password' value={password}  onChange={(e)=>{
setPassword(e.target.value);
    }} />
</Grid>


</Grid>

<Grid container mt={3} >
<Grid item  >
    <TextField sx={{backgroundColor:'white', width:'350px' }}  type='password' variant='filled' label='Confirm' value={confirm}  onChange={(e)=>{
setConfirm(e.target.value);
    }} />
</Grid>


</Grid>

<Box sx={{marginTop:'10px'}}>
    <Typography variant='body2'> Choose Your Profile Picture (optional) </Typography>
    <input type="file" onChange={(e)=>{
setImage(e.target.files[0]);
    }}  />
</Box>

<Grid container mt={1} sx={{display:'flex', alignItems:'center'}} >
<Grid item   >
<Button variant='contained' color='inherit' size="large"  onClick={()=>{
const formData= new FormData();
formData.append('email',email);
formData.append('name',name);
formData.append('password',password);
formData.append('confirm',confirm);
formData.append('Avatar', image);
axios.post('http://localhost:5000/api/users',formData).then(()=>{
    navigate('/Login')
}).catch((e)=>{
    console.log(e);
})

}}  >  Submit  </Button>
</Grid>
 
 <Grid item sx={{marginLeft:'10px'}} > 
 
 <Typography variant='body2' > <Link to='/Login'  style={{textDecoration:'underline', color:'white', marginLeft:'20px' }} > Already Have an Account? Log In  </Link> </Typography> 

 </Grid>

</Grid>


</Box>
        
    </Box>
    </> );
}
 
export default Register;