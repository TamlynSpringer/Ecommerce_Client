import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();

  const fetchData = async () => {
    try {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response');
      }  else {
          setErrMsg('Fetch failed')
        }
        errRef.current.focus();
      }
    };
  
  useEffect(() => {    
    fetchData();
  }, []);

  return (
    <>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h2>Featured products</h2>
      <section className='products'>
        {products?.map(product => (
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
        }
      </section>
    </>
  )
}

export default Home