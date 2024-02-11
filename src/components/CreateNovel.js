import React from 'react';
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Box, Container } from '@mui/system';
import Image from './Images/AddBlogCover.jpg'
import { Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import axios from 'axios'
const CreateNovel = () => {
    let [user,setUser]=useState('');
    let [author,setAuthor]=useState('');
    let [title,setTitle]=useState('');
    let [description,setDescription]=useState('');
    let [cover,setCover]=useState([]);
const navigate=useNavigate();
    useEffect(()=>{
     const token=sessionStorage.getItem('token');
     if(!token) return navigate('/Login')
     setUser(jwt_decode(token));

    },[])


    return ( <>
  
   <Box sx={{backgroundImage:`url(${Image})`, backgroundSize:'cover', height:400, display:'flex', justifyContent:'center', alignItems:'center' }}>
     <Container sx={{display:'flex', justifyContent:'space-between'}} >
     <Box>  
        <TextField sx={{width:'300px',backgroundColor:'white'}}  value={author}  label="Enter Author's name"  onChange={(e)=>{
            setAuthor(e.target.value);
        }}  />
           

<Box sx={{marginTop:'40px'}}>
<TextField sx={{width:'300px',backgroundColor:'white'}}  value={title}  label="Enter Novel's Title"  onChange={(e)=>{
            setTitle(e.target.value);
        }}  />
</Box>

<Box sx={{marginLeft:'500px'}}>
<Button size="large" variant='contained' color='inherit'  endIcon={<Send/> } onClick={()=>{
const formData=new FormData();
formData.append('author',author);
formData.append('description',description);
formData.append('title',title);
formData.append('Avatar',cover);
axios.post(`http://localhost:5000/user/novel/${user._id}`,formData).then(()=>{
    navigate('/user/novels');
}).catch((e)=>{
    console.log(e);
})
}} > Submit  </Button>
</Box>

         </Box>
<Box>
<TextField sx={{width:'300px',backgroundColor:'white'}}  value={description}  label="Enter Blog's Description"  onChange={(e)=>{
            setDescription(e.target.value);
        }}  />
 <Box sx={{marginTop:'50px'}}>
 <input type="file"  onChange={(e)=>{
    setCover(e.target.files[0]);
 }}  />
 </Box>

<Box>
    
</Box>
        

</Box>

<Box>

    
</Box>


</Container> 



</Box>

    </> );
}
 
export default CreateNovel;