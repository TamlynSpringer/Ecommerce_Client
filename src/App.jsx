import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { Navbar, Badge, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './context/Store';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
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
import logo from '../public/logo.svg';


const App = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const logoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  }
  return (
    <div className='d-flex flex-column site-container'>
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='logo' height='75px'/>
            </Navbar.Brand>
            </LinkContainer>
            <Nav className='ml-auto'>
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

              {userInfo && userInfo.isSeller && (
                <NavDropdown title='Seller' id='seller-nav-dropdown'>
                  <LinkContainer to='/seller/products'>
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
              
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main className='main'>
        <Container className='m-4'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product/:slug' element={<ProductPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
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
            <Route path='/seller/products' element={
              <SellerRoutes>
                <ProductListPage />
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
      {/* <footer>
        <div className='text-center'>Tamlyn Springer | 2023 | All rights reserved</div>
      </footer> */}
     
    </div>
  )
};

export default App;
