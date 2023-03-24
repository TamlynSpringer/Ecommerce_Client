import React, { useContext, useEffect, useReducer } from 'react';
import { Card, Col, Row, ListGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Store } from '../context/Store';
import { getError } from '../utils/utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }; 
    default:
      return state;
  }
};

const OrderPage = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true, 
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    if (!userInfo) {
      return navigate('/login')
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  return (
    loading ? (
      <Loading></Loading>
    ) : error ? (
      <Message variant='warning'>{error}</Message>
    ) : (
      <div>
        <Helmet>Order {orderId}</Helmet>
        <h1>Order details: {orderId}</h1>
        <Row>
        <Col md={8}>
          <Card className="mb-3 bg">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: &nbsp;</strong> {order.shippingAddress.fullname} <br />
                <strong>Address: &nbsp;</strong> {order.shippingAddress.address}, &nbsp;
                {order.shippingAddress.city} {order.shippingAddress.postalCode},&nbsp;{order.shippingAddress.country}
                &nbsp;
              </Card.Text>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered at {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not delivered</Message>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3 bg">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: &nbsp;</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <Message variant="success">
                  Paid at {order.paidAt}
                </Message>
              ) : (
                <Message variant="warning">Not paid</Message>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3 bg">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id} className='bg'>
                    <Row className="align-items-center bg">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3 bg">
            <Card.Body className='bg'>
              <Card.Title>Order summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className='bg'>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='bg'>
                  <Row >
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='bg'>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
    )
  )
};

export default OrderPage;