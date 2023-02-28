import { useEffect, useReducer, useRef, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { Row, Col, ListGroup, ListGroupItem, Card, Badge, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { getError } from '../utils/utils';
import { Store } from '../context/Store';

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

const ProductPage = () => {
  const navigate = useNavigate();
  
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
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const addToCart = async () => {
    console.log('cart:', cart)
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return data.countInStock;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
    console.log({ data })
  };

  console.log(product)

  return loading ? (
    <Loading />
    ) : error ? (
      <Message variant='warning' aria-live="assertive">{error}</Message>
    ) : (
    <section>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Row>
        <Col md={6}>
          <img
            className='img-small'
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem className='bg'>
              <h1>{product.name}</h1>
            </ListGroupItem>
            <ListGroupItem className='bg'>
              <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            </ListGroupItem>
            <ListGroupItem className='bg'>
              Brand: &nbsp;{product.brand}
            </ListGroupItem>
            <ListGroupItem className='bg'>
              Description : {product.description}
            </ListGroupItem>
            <ListGroupItem>
              Seller: &nbsp; 
                <Link to={`/seller/${product.seller?._id}`}>
                  {product.seller?.seller.name}
                </Link>
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card className='bg'>
            <Card.Body className='bg'>
            <ListGroup variant='flush' className='bg'>
              <ListGroupItem className='bg'>
                <Row className='bg'>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem className='bg'>
                <Row className='bg'>
                  <Col>Status:</Col>
                  <Col>
                  {product.countInStock < 1 ? 
                  <Badge bg='light'>Out of stock</Badge>
                  : <Badge bg='success'>In stock</Badge>}
                  </Col>
                </Row>
              </ListGroupItem>

              {product.countInStock > 0 && (
                <ListGroupItem  className='bg'>
                  <div className='d-grid'>
                    <Button className='cart-button' onClick={addToCart}>Add to cart</Button>
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

export default ProductPage;