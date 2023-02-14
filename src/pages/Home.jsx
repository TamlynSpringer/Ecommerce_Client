import { useEffect, useReducer, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default: 
      return state;
  }
};

const Home = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, { 
    products: [],
    loading: true, 
    error: '' 
  });

  const errRef = useRef();

  useEffect(() => {    
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>Featured products</h2>
      <section className='products'>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
        ) : (
          products?.map(product => (
            <article className='product' key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>            
              <p><strong>{product.price}</strong></p>
              <button>Add to cart</button>
            </article>))          
        )}
      </section>
    </>
  )
};

export default Home;