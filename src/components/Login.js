import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import Image from './Images/login-background.jpg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) return navigate('/user/blogs');
    }, [])


    return (<>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, backgroundSize: 'cover', backgroundRepeat: 'none', backgroundImage: `url(${Image})`, backgroundPosition: 'center' }} >

            <Box >
                <Typography variant='h4' sx={{ color: 'lightgrey', marginLeft: 15, marginBottom: 10 }} > Sign In </Typography>
                <Grid container mt={5} >
                    <Grid item  >
                        <TextField sx={{ backgroundColor: 'white', width: '350px' }} variant='filled' label='Enter Email' value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </Grid>


                </Grid>

                <Grid container mt={5} >
                    <Grid item  >
                        <TextField sx={{ backgroundColor: 'white', width: '350px' }} type='password' variant='filled' label='Enter Password' value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </Grid>


                </Grid>


                <Grid container mt={5} sx={{ display: 'flex', alignItems: 'center' }} >
                    <Grid item   >
                        <Button variant='contained' color='inherit' size="large" onClick={() => {
                            axios.post('http://localhost:5000/user/Login', { email, password }).then((res) => {

                                sessionStorage.setItem('token', res.data);
                                navigate('/user/novels')
                                window.location.reload();
                            })
                        }}  >  Submit  </Button>
                    </Grid>

                    <Grid item sx={{ marginLeft: '10px' }} >

                        <Typography variant='body2' > <Link to='/Register' style={{ textDecoration: 'underline', color: 'white', marginLeft: '20px' }} > Dont have an account? Sign Up  </Link> </Typography>

                    </Grid>

                </Grid>


            </Box>

        </Box>

    </>);
}

export default Login;