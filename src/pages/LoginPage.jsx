import React from 'react'
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'

const LoginPage = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Login to your account</title>
      </Helmet>
      <h2>Log in</h2>
      <Form>
        <FormGroup className='mb-3' controlId='email'>
          <FormLabel>Email</FormLabel>
          <FormControl type='email' required />
        </FormGroup>
        <FormGroup className='mb-3' controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='password' required />
        </FormGroup>
        <div className='mb-3'>
          <Button type='submit'>Login</Button>
        </div>
        <div>
          New user? &nbsp; <Link to={`/register?redirect=${redirect}`}>Register account</Link>
        </div>
      </Form>
    </Container>
  )
};

export default LoginPage;