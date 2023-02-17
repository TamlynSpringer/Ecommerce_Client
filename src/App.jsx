import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './context/Store';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const logoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT'});
    localStorage.removeItem('userInfo')
  }
  return (
    <div className='d-flex flex-column site-container'>
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>Baltic Store</Navbar.Brand>
            </LinkContainer>
            <Nav className='me-auto'>
              <Link to='/cart' className='nav-link'>
                Cart &nbsp;
                {cart.cartItems.length > 0 && (
                  <Badge pill bg='warning'>
                    {cart.cartItems.reduce((a, c) => a + c?.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {userInfo 
              ? (
                <NavDropdown title={`Logged in as ${userInfo.email}`}  id='basic-nav-dropdown'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>User profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orders'>
                    <NavDropdown.Item>Order history</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className='dropdown-item'
                    to='#logout'
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </NavDropdown>
              ) 
              : (<Link to='/login' className='nav-link'>Login</Link>
              )}
              
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main className='main'>
        <Container className='m-4'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/product/:slug' element={<ProductPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>       
        </Container>
      </main>
      {/* <footer>
        <div className='text-center'>Tamlyn Springer | 2023 | All rights reserved</div>
      </footer> */}
     
    </div>
  )
};

export default App;
