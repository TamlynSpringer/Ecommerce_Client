import React, { useContext, useEffect, useReducer } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Store } from '../context/Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { 
        ...state, 
        loading: true 
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    default:
      return state;
  }
}

const DashboardPage = () => {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data
        });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    }
    fetchData();
  }, [userInfo]);

  return (
    <section>
    <div>Admin dashboard</div>
    {loading ? (<Loading />)
    : error ? ( <Message variant='danger'>{error}</Message>)
    : (
      <>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {summary.users && summary.users[0] 
                  ? (summary.users[0].numUsers)
                  : 0}
                </Card.Title>
                <Card.Text>Users</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {summary.orders && summary.users[0] 
                  ? summary.orders[0].numOrders
                  : 0}
                </Card.Title>
                <Card.Text>Orders</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {summary.orders && summary.users[0] 
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
                </Card.Title>
                <Card.Text>Total sales</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    )}
    </section>
  )
};

export default DashboardPage;