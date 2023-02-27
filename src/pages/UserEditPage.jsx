import axios from '../api/axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Store } from '../context/Store';
import { getError } from '../utils/utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function UserEditScreen() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [storeId, setStoreId] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setStoreId(data.storeId);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        setIsSeller(data.isSeller);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/users/${userId}`,
        { _id: userId, storeId, email, isAdmin, isSeller },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('User updated successfully');
      navigate('/admin/users');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Edit user ${userId}</title>
      </Helmet>
      <h1>Edit user {userId}</h1>

      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Check
            className="mb-3"
            type="checkbox"
            id="isAdmin"
            label="Role: admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
           <Form.Check
            className="mb-3"
            type="checkbox"
            id="isSeller"
            label="Role: seller"
            checked={isSeller}
            onChange={(e) => setIsSeller(e.target.checked)}
          />
          {/* <Form.Group className="mb-3" controlId="name">
            <Form.Label>Store ID</Form.Label>
            <Form.Control
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              required
            />
          </Form.Group> */}

          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Update
            </Button>
            {loadingUpdate && <Loading></Loading>}
          </div>
        </Form>
      )}
    </Container>
  );
}