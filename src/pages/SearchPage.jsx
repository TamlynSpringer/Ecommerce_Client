import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { getError } from '../utils/utils';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Button } from 'react-bootstrap';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Product from '../components/Product';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: '$1 to $5',
    value: '1-5',
  },
  {
    name: '$6 to $10',
    value: '6-10',
  },
  {
    name: '$11 to $100',
    value: '11-1000',
  },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const order = sp.get('order') || 'featured';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch, categories]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return {
      pathname: '/search',
      query: `?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&order=${sortOrder}&page=${filterPage}`
    }
  };

  return (
    <div>
      <Helmet>
        <title>Search products</title>
      </Helmet>

      <Row>
        <Col md={3}>
          <h3 className='mt-3'>Filter products by: </h3>
          <br />
          <h4>Product category</h4>
          <div>
            <ul>
              <li>
                <Link
                  className={'all' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  All
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    className={category === category ? 'text-bold' : ''}
                    // to={getFilterUrl({ category: c })}
                    to={{ pathname: '/search', search: `category=${category}` }}

                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Product price</h4>
            <ul>
              <li>
                <Link
                  className={'all' === price ? 'text-bold' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={{ pathname: '/search', search: `price=${p.value}` }}
                    // to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? 'text-bold' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading></Loading>
          ) : error ? (
            <Message variant="warning">{error}</Message>
          ) : (
            <>
              <Row className="justify-content-between m-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price ' + price}
                    {query !== 'all' ||
                    category !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                
                <Col className="text-end">
                  Sort by{' '}
                  <select
                    className="my-2"
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ pathname: '/search', order: e.target.value }));
                    }}
                    // value={listOrder}
                    // onChange={(e) => {
                      // to={{ pathname: '/search', search: `price=${p.value}` }}
                      // setListOrder(e.target.value)
                      // navigate({ pathname: '/search', query: `order=${listOrder}` });
                      // navigate(getFilterUrl({ order: e.target.value }));
                    // }}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest arrivals</option>
                    <option value="lowest">Price: ascending</option>
                    <option value="highest">Price: descending</option>
                  </select>
                </Col>
              </Row>
              {products?.length === 0 && (
                <Message>No product found</Message>
              )}

              <Row>
                {products?.map((product) => (
                  <Col sm={6} lg={4} className="my-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>

    </div>
  )
};

export default SearchPage;