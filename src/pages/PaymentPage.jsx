import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../context/Store';
import { Helmet } from 'react-helmet-async';

const PaymentPage = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'Stripe');

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [shippingAddress, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className='container small-conatiner'>
        <Helmet>
          <title>Payment method</title>
        </Helmet>
        <h1 className='my-3'>Payment method</h1>
        <Form onSubmit={onSubmit}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Klarna"
              label="Klarna"
              value="Klarna"
              checked={paymentMethodName === 'Klarna'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  )
};

export default PaymentPage;