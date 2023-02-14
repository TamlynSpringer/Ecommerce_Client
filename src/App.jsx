import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';

const App = () => {
return (
    <>
      <header>
        <Link to='/'>Baltic Store</Link>      
      </header>
      <main className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:slug' element={<Product />} />
        </Routes>       
      </main>
     
    </>
  )
};

export default App;
