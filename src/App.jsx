import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'

const App = () => {
return (
    <div className='d-flex flex-column site-container'>
      <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>Baltic Store</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <main className='main'>
        <Container>
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
