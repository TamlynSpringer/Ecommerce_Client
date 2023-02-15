import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='product' >
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className='card-img-top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>  
        <Rating rating={product.rating} numReviews={product.numReviews} />          
        <Card.Text><strong>{product.price}</strong></Card.Text>
        <Button className='cart-button'>Add to cart</Button>
      </Card.Body>
    </Card>
  )
};

export default Product;