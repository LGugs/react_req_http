import { useEffect, useState } from 'react';

import './App.css';

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  // 1 - Resgatando dados (chamada assíncrona)
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);
    }
    fetchData();
  }, []);

  console.log(products);

  return (
    <div className="App">
      <h1>React - Requisições HTTP</h1>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - R$: {product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
