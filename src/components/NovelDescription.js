import React from 'react'
import {useLocation} from 'react-router-dom';

import{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ButtonGroup, Card, CardContent, CardMedia, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { AccountCircle, Delete, Edit, Facebook, Send } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'



const NovelDescription = () => {

    const navigate=useNavigate();
const [novel,setNovel]=useState([]);
const [userr,setUserr]=useState('')
const [comments,setComments]=useState([]);
const [active,setActive]=useState(0);
const [commentId,setcommentId]=useState('');

let {state}=useLocation();
let {nov_id,name}=state;

let[text,setText]=useState('');


function edited(comments){
if(comments.status ==='edited'){
    return(
        <>
        <Typography variant='body2'>  ({comments.status})   </Typography>   
        </>
    )
}
}

function Comments(comments){
    if(comments.length===0){
        return(
            <>
            <CardContent>
                <Typography variant='h6' > No Reviews Available! </Typography>
                <hr />
            </CardContent>
            
            </>
        )
    }
    else{
        return(
            <>
            <CardContent sx={{}}>
                <Typography variant='h6' sx={{marginBottom:'-20px',marginLeft:'31px'}} > Reviews: </Typography>
                {comments.map((comment,index)=>{
                    return(
                        <>
                        
                        <CardContent sx={{}}>  
                        {
                            comment.user.map((user,index)=>{
                                return(
                                    <>
                                    <CardContent sx={{display:'flex', marginBottom:'-12px', alignItems:'center'}}> 
                                     <img src={`${user.image}`} alt=""  style={{ width:'35px', height:'35px', borderRadius:'60%'}} />
                                  <Typography sx={{marginLeft:'10px', marginBottom:''}} >  {user.name} </Typography>
                                  <ButtonGroup sx={{display:'flex',alignItems:'center', marginLeft:'10px'}} > <IconButton size='small'  disabled={userr._id === user._id ? false:true} onClick={()=>{
                                    document.getElementById('comment-field').focus();

                                   setActive(1);
                                   setcommentId(comment._id); 
                                      
            
                                  }} > <Edit sx={{height:'19px'}} /> </IconButton> <IconButton size='small' disabled={userr._id === user._id? false:true} onClick={()=>{
                                    axios.delete(`http://localhost:5000/user/comment/${comment._id}`).then(()=>{
                                        window.location.reload();
                                    }).catch((e)=>{
                                        console.log(e);
                                    })
                                  }} > <Delete sx={{height:'18px', marginLeft:'-10px'}} /> </IconButton>  </ButtonGroup>
                                   
                                  </CardContent>
                                    </>
                                
                                )
                               
                            })
                        }
                         <Box sx={{display:'flex',}}> 
                         <Typography variant='body2' sx={{marginLeft:'12px'}} > {comment.text}   </Typography>
                         <Typography variant='body2' sx={{marginLeft:'45px'}}> {edited(comment)}   </Typography>
                        
                         </Box>
                         </CardContent>
                        </>
                    )
                })}
                <hr />
            </CardContent>
            
            </>
        )
    }
}


useEffect(()=>{
axios.get(`http://localhost:5000/user/novel/description/${nov_id}`).then((res)=>{
setNovel(res.data);
}).catch((e)=>{
    console.log(e);
})



},[])

useEffect(()=>{
    axios.get(`http://localhost:5000/user/comment/${nov_id}`).then((res)=>{
    setComments(res.data);
}).catch((e)=>{
    console.log(e);
})
},[])



useEffect(()=>{
    const token=sessionStorage.getItem('token');
    if(token){
        setUserr(jwt_decode(token));

    }
},[])


  

    return ( <>
    <Container>
        
      <Grid container mt={4} sx={{display:'flex', justifyContent:'center'}} >
           
           <Grid item lg={5}>
            <Card sx={{ maxWidth:'300', "&:hover":{transform:'scale3d(1.05,1.05,1.25)'}}}>
               <CardContent sx={{display:'flex',justifyContent:'space-between'}} >
                <Typography> Created By: {name} </Typography>
               
               </CardContent>
               {
                novel.map((novel,index)=>{
                    return(
                        <>
                        <CardMedia
                        component={'img'}
                        src={`${novel.cover}`}
                        height='500'
                        
                        />
                    <CardContent >
                        
                    <Typography > Description: </Typography>
                    <Box sx={{display:'flex'}}> 
                        <Typography variant='body2' > {novel.description}   </Typography>
                        
                        </Box>
                    </CardContent>

                        
                        
                        </>
                    )
                     


                })
               }
                 
            </Card>
               
           </Grid>
            
      </Grid>
      <Box mt={4}> 
      <hr />
      </Box>
      {Comments(comments)}
                  <Box p={3} sx={{display:'flex',justifyContent:'center'}} >
                  <TextField sx={{width:'100%'}} 
                  variant='outlined'
                  id="comment-field"
                 
                  value={text}
                  placeholder='Enter Your Comment here!'
                  onChange={(e)=>{setText(e.target.value)}}
                  InputProps={{ endAdornment :
                    <InputAdornment variant='filled'   >  <IconButton onClick={()=>{
                        if(!userr){
                            alert('You are not Logged In.')
                            setTimeout(()=>{
                                navigate('/Login')
                            },500)
                        }
                        else if(text.length ===0){
                          alert('Comment should not be Empty!')
                        }
                        else if(active === 1){
                            axios.put(`http://localhost:5000/user/comment/${commentId}/${nov_id}/${userr._id}`,{text}).then(()=>{
                                
                                setActive(0);
                                window.location.reload();
                                
                            }).catch((e)=>{
                                console.log(e);
                            })
                        }
                        else{
                            axios.post(`http://localhost:5000/user/comment/${nov_id}/${userr._id}`, {text} ).then(()=>{
                                window.location.reload();
                               }).catch((e)=>{
                                console.log(e);
                               })
                        }
                          
                        
                        

                    }} > <Send  color='primary' /> </IconButton>  </InputAdornment>
                  }}
                  />
                 </Box>


      </Container>
    </> );
}
 
export default NovelDescription;