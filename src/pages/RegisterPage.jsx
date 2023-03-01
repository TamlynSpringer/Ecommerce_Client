import axios from '../api/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../context/Store';
import { toast } from 'react-toastify';
import { getError } from '../utils/utils';

const Register = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false)
  const [storeId, setStoreId] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        email,
        password,
        isSeller,
        // storeId
      });
      ctxDispatch({ type: 'USER_LOGIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <h1 className="my-3">Register an account</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="isSeller">
            <Form.Label>Are you a store seller?</Form.Label>
            <Form.Check
              type="switch"
              onChange={() => setIsSeller(true)}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="storeId">
            <Form.Label>Store name</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setStoreId(e.target.value)}
            />
          </Form.Group> */}
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Submit</Button>
        </div>
        <div className="mb-3">
          Already have an account? &nbsp;
          <Link to={`/login?redirect=${redirect}`}>Login</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
