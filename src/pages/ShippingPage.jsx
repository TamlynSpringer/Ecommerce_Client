import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';
import { Helmet } from 'react-helmet-async';

const ShippingPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullname, setFullname] = useState(shippingAddress.fullname || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullname,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullname,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      })
    );
    navigate('/payment');
  }
  return (
    <div className='container small-container'>
    <Helmet>
      <title>Shipping address</title>
    </Helmet>
    <h1 className='my-3'>Shipping details to go here: </h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className='mb-3' controlId='fullname'>
            <Form.Label>Full name:</Form.Label>
            <Form.Control
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='city'>
            <Form.Label>City:</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='postalCode'>
            <Form.Label>Postal code:</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='country'>
            <Form.Label>Country:</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className='mb-3'>
            <Button className='blue-button' type='submit'>Continue</Button>
          </div>
        </Form>
    </div>
  )
};

export default ShippingPage;