import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from '../api/axios';
import { Store } from '../context/Store';
import { toast } from 'react-toastify';
import { getError } from '../utils/utils';


const LoginPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login',{
        email,
        password
      });
      ctxDispatch({type: 'USER_LOGIN', payload: data})
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect || '/')
    } catch (err) {
        console.log(err.message)
        toast.error(getError(err))
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h2>Login to your account</h2>
      <Form onSubmit={submitHandler}>
        <FormGroup className='mb-3' controlId='email'>
          <FormLabel>Email</FormLabel>
          <FormControl type='email' required onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup className='mb-3' controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='password' required onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <div className='mb-3'>
          <Button type='submit' className='blue-button'>Login</Button>
        </div>
        <div>
          New user? &nbsp; <Link to={`/register?redirect=${redirect}`}>Register account</Link>
        </div>
      </Form>
    </Container>
  )
};

export default LoginPage;