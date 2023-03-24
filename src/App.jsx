import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { Navbar, Badge, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useContext, useEffect, useState } from 'react';
import { Store } from './context/Store';
import CartPage from './pages/CartPage';
import InfoPage from './pages/InfoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoutes from './components/ProtectedRoutes';
import AdminRoutes from './components/AdminRoutes';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import UserListPage from './pages/UserListPage';
import UserEditScreen from './pages/UserEditPage';
import OrderListPage from './pages/OrderListPage';
import SellerRoutes from './components/SellerRoutes';
import logo from './logo.svg';
import SellerPage from './pages/SellerPage';
import axios from './api/axios';
import { getError } from './utils/utils';
import Search from './components/Search';
import SearchPage from './pages/SearchPage';


const App = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const logoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <div className='app'>
      <div
      className={
        sidebarIsOpen
          ? 'd-flex flex-column site-container active-cont'
          : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position='bottom-center' limit={1} />

        <header>
          <Navbar bg='dark' variant='dark'>
            <Container>
              {/* <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button> */}
              <Link to='/search'>
                <i className="fas fa-bars white"></i>
              </Link>
              <LinkContainer to='/'>
              <Navbar.Brand>
                <img className='logo' src={logo} alt='logo' height='75px'/>
              </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Search />
                <Nav className='me-auto  w-100  justify-content-end'>
                  <Link to='/cart' className='nav-link'>
                  <i className="fa-solid fa-cart-shopping"></i>&nbsp;Cart &nbsp;
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg='warning' >
                        {cart.cartItems.reduce((a, c) => a + c?.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title='Profile'  id='basic-nav-dropdown'>
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

                  {userInfo && userInfo.isSeller && (
                    <NavDropdown title='Seller' id='seller-nav-dropdown'>
                      <LinkContainer to={`/seller/${userInfo?._id}`}>
                        <NavDropdown.Item>Store</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={`/seller/products`}>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/seller/orders'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>                
                    </NavDropdown>
                  )}

                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='admin-nav-dropdown'>
                      <LinkContainer to='/admin/dashboard'>
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/products'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orders'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}

                  <Link to='/info' className='nav-link'>
                  <i className="fa-solid fa-circle-info"></i>
                  </Link>
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <main className='main'>
          <Container className=''>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/seller/:id' element={<SellerPage />} />
              <Route path='/product/:slug' element={<ProductPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/info' element={<InfoPage />} />
              {/* Protected user routes */}
              <Route path='/cart' element={
                <ProtectedRoutes>
                  <CartPage />
                </ProtectedRoutes>
              } />
              <Route path='/profile' element={
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              } />
                <Route path='/orders' element={
                <ProtectedRoutes>
                  <OrderHistoryPage />
                </ProtectedRoutes>
              } />
              <Route path='/shipping' element={
                <ProtectedRoutes>
                  <ShippingPage />
                </ProtectedRoutes>             
              } />
              <Route path='/payment' element={
                <ProtectedRoutes>
                  <PaymentPage />
                </ProtectedRoutes>             
              } />
              <Route path='/placeorder' element={
                <ProtectedRoutes>
                  <PlaceOrderPage />
                </ProtectedRoutes>
              } />
              <Route path='/order/:id' element={
                <ProtectedRoutes>
                  <OrderPage />
                </ProtectedRoutes>
              } />
              {/* Seller routes */}
              <Route path={`/seller/:id`} element={
                <SellerRoutes>
                  <SellerPage />
                </SellerRoutes>
              } />
              <Route path='/seller/products' element={
                <SellerRoutes>
                  <ProductListPage />
                </SellerRoutes>
              } />
              <Route path='/seller/product/:id' element={
                <SellerRoutes>
                  <ProductEditPage />
                </SellerRoutes>
              } />
                <Route path='/seller/orders' element={
                <SellerRoutes>
                  <OrderListPage />
                </SellerRoutes>
              } />
              {/* Admin routes */}
              <Route path='/admin/dashboard' element={
                <AdminRoutes>
                  <AdminDashboardPage />
                </AdminRoutes>
              } />
              <Route path='/admin/products' element={
                <AdminRoutes>
                  <ProductListPage />
                </AdminRoutes>
              } />
              <Route path='/admin/product/:id' element={
                <AdminRoutes>
                  <ProductEditPage />
                </AdminRoutes>
              } />
              <Route path='/admin/users' element={
                <AdminRoutes>
                  <UserListPage />
                </AdminRoutes>
              } />
              <Route path='/admin/orders' element={
                <AdminRoutes>
                  <OrderListPage />
                </AdminRoutes>
              } />
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoutes>
                    <UserEditScreen />
                  </AdminRoutes>
                } />
            </Routes>       
          </Container>
        </main>
      </div>
      <footer>
        <div className='text-center bg'>
          2023 | Tamlyn Springer |
          <a href='https://github.com/TamlynSpringer' target='blank'>&nbsp;<i className="fa-brands fa-github"></i>&nbsp;</a> |
          <a href='https://www.linkedin.com/in/tamlyn-springer-v/' target='blank'>&nbsp;<i className="fa-brands fa-linkedin"></i>&nbsp;</a> 
        </div>
      </footer> 
    </div>
  )
};

export default App;
