import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { Store } from '../context/Store';
import { getError } from '../utils/utils';

const reducer = (state, action) => {
  switch (action.type) {
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

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  console.log(userInfo)
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState(userInfo.sellerName || '');
  const [sellerDescription, setSellerDescription] = useState(userInfo.sellerDescription || '');
  // const [storeId, setStoreId] = useState(userInfo.storeId || 0);

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          email,
          password,
          sellerName,
          sellerDescription,
          // storeId
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_LOGIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
      
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };

  return (
    <div className="container small-container">
      <Helmet>
        <title>User profile</title>
      </Helmet>
      <h1 className="my-3">Logged in as {userInfo.email}</h1>
      <br />
      <h2>User profile</h2>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {userInfo.isSeller && (
          <>
            <h2>Seller</h2>
            <Form.Group className="mb-3" controlId="sellerName">
              <Form.Label>Seller name</Form.Label>
              <Form.Control
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="sellerDescription">
              <Form.Label>Seller description</Form.Label>
              <Form.Control
                type="text"
                value={sellerDescription}
                onChange={(e) => setSellerDescription(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="storeId">
              <Form.Label>Store ID</Form.Label>
              <Form.Control
                type="number"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
              />
            </Form.Group> */}
          </>
        )}
        <div className="mb-3">
          <Button disabled={loadingUpdate} type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}
