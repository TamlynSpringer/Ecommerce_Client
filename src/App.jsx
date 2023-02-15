import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './context/Store';

const App = () => {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <div className='d-flex flex-column site-container'>
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
                  <Badge pill bg='warning'>{cart.cartItems.length}</Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main className='main'>
        <Container className='m-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:slug' element={<Product />} />
          </Routes>       
        </Container>
      </main>
      <footer>
        <div className='text-center'>Tamlyn Springer | 2023 | All rights reserved</div>
      </footer>
     
    </div>
  )
};

export default App;
