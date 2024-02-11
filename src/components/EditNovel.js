import { Button, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import {useNavigate,useLocation, Navigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'

import Image from './Images/editCover.jfif'
import { Send } from '@mui/icons-material';
const EditNovel = () => {
const navigate=useNavigate();
let [noveldata,setNoveldata]=useState('');
let {state}=useLocation();
let {nov_id, user_id}=state;
let [author,setAuthor]=useState('');
let [description,setDescription]=useState('');
let [image,setImage]=useState('');
let [title,setTitle]=useState('');

useEffect(()=>{
axios.get(`http://localhost:5000/user/novel/${nov_id}`).then((res)=>{
    setNoveldata(res.data);
}).catch((e)=>{
    console.log(e);
})
},[])

    return ( <>
   <Box mt={1} sx={{backgroundImage:`url(${Image})`, height:'500px', display:'flex', alignItems:'center', justifyContent:'center' }}>
    <Box> 
        <Box sx={{display:'flex', justifyContent:'center'}}>
    <Typography sx={{marginLeft:'50px',marginBottom:'120px'}} variant='h6'> Edit Your Novel here </Typography>
    </Box>
     <Box sx={{display:'flex', justifyContent:'space-betweeen',marginBottom:'80px'}} > 
     <TextField 
     InputLabelProps={{shrink:true}}
     label='Enter Author of Your Novel'
     variant='standard'
     sx={{width:'350px',marginLeft:'10px'}}
     value={author}
     onChange={(e)=> setAuthor(e.target.value)}
     placeholder={`${noveldata.author}`.concat('(Author Name)')}
     />
     <TextField 
     InputLabelProps={{shrink:true}}
     label={`Enter Your Novel's Title`}
variant='standard'
sx={{width:'350px', marginLeft:'50px'}}
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder={`${noveldata.title}`.concat(`(Novel's Title)`)}
/>
     
</Box>
<Box sx={{display:'flex', justifyContent:'center'}}> 
<TextField 
InputLabelProps={{shrink:true}}
label={`Enter Your Novel's Description`}
     value={description}
    sx={{width:'400px',marginBottom:'80px'}}
variant='standard'
onChange={(e)=>setDescription(e.target.value) }
placeholder={`${noveldata.description}`.substr(0,29).concat('(Novel Description)')}
     />
</Box>
<Box mt={2} sx={{display:'flex',justifyContent:'center'}}> 
<Typography sx={{marginTop:'-60px'}} variant='body2'> Choose Your new Novel's Cover Image  (Required) </Typography>
</Box>
<Box sx={{display:'flex', justifyContent:'center',marginTop:'-35px'}} mt={1}>
<input type="file" onChange={(e)=> setImage(e.target.files[0]) } />
</Box>

<Box sx={{display:'flex', justifyContent:'center',marginRight:'40px'}} mt={3}>
<Button variant='contained' endIcon={<Send/>}  onClick={()=>{
    const data= new FormData();
    data.append('author',author);
    data.append('title',title);
    data.append('Avatar',image);
    data.append('description',description);
    
    axios.put(`http://localhost:5000/user/novel/${user_id}/${nov_id}`,data).then(()=>{
navigate('/')
    }).catch((e)=>{
        console.log(e);
    })
}} > Submit </Button  >
</Box>

</Box>


   </Box> 
    
    </> );
}
 
export default EditNovel;