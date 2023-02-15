import React from 'react';
import { useEffect, useReducer, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../components/Rating';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Card from 'react-bootstrap/Card';
import { Badge, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';


const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default: 
      return state;
  }
};

const Product = () => {
  const params = useParams();
  const {slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, { 
    product: [],
    loading: true, 
    error: '' 
  });

  useEffect(() => {    
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get(`/api/products/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>{error}</p>
    ) : (
    <section>
      <Row>
        <Col md={6}>
          <img
            className='img-large'
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroupItem>
            <ListGroupItem>
              <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            </ListGroupItem>
            <ListGroupItem>
              Price : {product.price}
            </ListGroupItem>
            <ListGroupItem>
              Description : {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>{product.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                  {product.countInStock>0 ? 
                  <Badge bg='success'>In stock</Badge>
                  : <Badge bg='danger'>Out of stock</Badge>}
                  </Col>
                </Row>
              </ListGroupItem>

              {product.countInStock > 0 && (
                <ListGroupItem>
                  <div className='d-grid'>
                    <Button className='cart-button'>Add to cart</Button>
                  </div>
                </ListGroupItem>
              )}
            </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  )
}

export default Product;