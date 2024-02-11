import {  Button, ButtonGroup, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react'
import {useState,useEffect} from 'react';
import Image from './Images/BlogsFrontCover.jpg'
import axios from 'axios';
import { Delete, Edit } from '@mui/icons-material';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
const Novels = () => {
const navigate=useNavigate();
    let [novels,setNovels]=useState([]);
    let [id,setId]=useState('')
   

    useEffect(()=>{

     
       
    axios.get('http://localhost:5000/user/novel').then((res)=>{
        setNovels(res.data)
        console.log(novels);
    }).catch((e)=>{
        console.log(e);
    })
    },[])

   

    useEffect(()=>{
          
        const token=sessionStorage.getItem('token');
        if(token){
            setId(jwt_decode(token)); 
        }


      
    },[])

    


    return ( <>
    
    <Box sx={{backgroundImage:`url(${Image})`, backgroundSize:'cover', backgroundRepeat:'none', height:600, display:'flex',justifyContent:'center',alignItems:'center' }}>
        
    </Box>

    <Container > 
     <Grid container  spacing={2} mt={2}>
       
       {novels.map((novel
       ,index)=>{
        
        return(
            <>
            <Grid item lg={4}  >
            
            <Card key={index} sx={{maxWidth:500,border:2}}> 
             <CardContent sx={{display:'flex', justifyContent:'space-between',alignItems:'center'}} >
             <Typography variant='body2' > Created by: {
                novel.user.name} </Typography>
               <ButtonGroup>    <IconButton disabled={
                novel.user._id === id._id  ? false:true} onClick={()=>{
                  navigate('/novel/Edit', {state:{nov_id:novel._id, user_id:novel.user._id }}  );
                }} > <Edit/> </IconButton>  <IconButton   disabled={
                  novel.user._id === id._id   ? false:true}  onClick={()=>{
                    axios.delete(`http://localhost:5000/user/novel/${novel._id}`).then((res)=>{
                      window.location.reload();
  
                    })
                  }}  > <Delete/>  </IconButton>  </ButtonGroup>
            
                
             </CardContent>
           <Box sx={{"&:hover":{cursor:'pointer'}}}  onClick={()=>{
                
                console.log(novel)
                navigate(`/novel/Description`, {state:{nov_id:novel._id, name:novel.user.name }}  )
              }} 
              
              >    
            
             
              <CardMedia 
              component='img'
              height={'300'}
              src={`${novel
                .cover}`}
              
              />
              
              <CardContent>
                <Typography> Description: </Typography>
                <Typography variant='body2'> {novel
                .description.substr(0,90).concat('....')}  </Typography>
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
 
export default Novels;