import React from 'react'
import {useState,useEffect} from 'react'
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Button, ButtonGroup, Card, CardContent, CardMedia, Container, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from './Images/MyBlogsCover.jfif'
import { Delete, Edit } from '@mui/icons-material';
const MyNovels = () => {
    const navigate=useNavigate();

    let [blogs,setBlogs]=useState([]);
 

    useEffect(()=>{
        const token=sessionStorage.getItem('token');
        if(!token) return navigate('/Login')
        let id=jwt_decode(token);
        let {_id}=id;
        axios.get(`http://localhost:5000/user/novel/MyNovels/${_id}`).then((res)=>{
          setBlogs(res.data);
        }).catch((e)=>{
          console.log(e);
        })
        

        
      

    },[])


    return ( <>

    
       
      <Box sx={{backgroundSize:'cover', backgroundImage:`url(${Image})`, height:400,}}>
        
        </Box>
<hr />
<Box mt={3} sx={{display:'flex',justifyContent:'center'}}>
<Typography variant='body2' sx={{color:'grey',textDecoration:'underline'}}> List of Your Novels will be displayed down below. </Typography>
</Box>
<Box mt={5} ></Box>

<Container> 
    <Grid container spacing={4} >
      {blogs.map((blgs,index)=>{
        return(
          <>
          <Grid item lg={4}  >
            
        <Card sx={{maxWidth:350}} >
        <CardContent sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}} >
          <Typography variant='body2'> Created by: {blgs.user.name} </Typography>
          <ButtonGroup> <IconButton onClick={()=>{
            navigate('/novel/Edit',{state:{nov_id:blgs._id, user_id:blgs.user._id }})
          }}  > <Edit/> </IconButton> <IconButton onClick={()=>{
            axios.delete(`http://localhost:5000/user/novel/${blgs._id}`).then(()=>{
              window.location.reload();
            }).catch((e)=>{
              console.log(e);
            })
          }} > <Delete/> </IconButton> </ButtonGroup>
        </CardContent>
        <Box sx={{"&:hover":{cursor:'pointer'}}} onClick={()=>{
              navigate('/novel/Description', {state:{nov_id:blgs._id, name:blgs.user.name }} )
            }}> 
        <CardMedia
        
        component={'img'}
        height={'160'}
        src={`${blgs.cover}`}
        
        />
        <CardContent >
          <Typography variant='body2'> Description:  </Typography>
          <Typography variant='body2'> {blgs.description.substr(0,110).concat('....')}.  </Typography>
        </CardContent>

        </Box>
        </Card>
        
        </Grid>
          
          </>
        )
       
      })}

    </Grid>
    </Container>
    </> );
}
 
export default MyNovels;