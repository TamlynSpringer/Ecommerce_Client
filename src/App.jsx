import data from './data';
import './App.css';

const App = () => {
return (
    <>
      <header>
        <h1>Baltic Store</h1>
      </header>
      <main className='main'>
        <h2>Featured products</h2>
        <article className='products'>
          {data.products.map(product => (
            <div className='product' key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <a href={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </a>
              
              <p><strong>{product.price}</strong></p>
              <button>Add to cart</button>
            </div>))
          }
        </article>
      </main>
     
    </>
  )
}

export default App
