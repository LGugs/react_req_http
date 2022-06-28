import { useState } from 'react';

// 4 - custom hook
import { useFetch } from './hooks/useFetch';

import './App.css';

const url = "http://localhost:3000/products";

function App() {
  //const [products, setProducts] = useState([]);

  // 4 - custom hook
  const { data: items, httpConfig } = useFetch(url); // renomeando o data para items

  console.log(items);

  const[name, setName] = useState("");
  const[price, setPrice] = useState("");

  // 1 - Resgatando dados (chamada assíncrona) - refatorada no custom hook
 /* useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);
    }
    fetchData();
  }, []);*/

  // 2 - Add de produtos
  const handleSubmit = async(e) => {
      e.preventDefault();

      // abaixo só está name e price, pois são os mesmos nomes dos states criados acima, portanto não é necessário fazer -> name: name, price: price. O javascript reconhece e ja atribui esses valores.
      const product = {
        name,
        price
      }

      // const res = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(product)
      // })

      // // 3 - Carregamento dinamico
      // const addedProduct = await res.json(res);

      // setProducts((prevProducts) => [...prevProducts, addedProduct]);

      // 5 - Refatorando post
      httpConfig(product, "POST");

      // limpa os dados do formulário ao enviar
      setName(""); 
      setPrice("");

  }

  return (
    <div className="App">
      <h1>React - Requisições HTTP</h1>
      <h2>Lista de Produtos</h2>
      <ul>
        {items && items.map((product) => ( // só roda o map se items não for null, conforme definido em useFetch.js
          <li key={product.id}>{product.name} - R$: {product.price}</li>
        ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input 
              type="text"
              value={name}
              name="name"
              required
              onChange={(e) => setName(e.target.value)}  
            />
          </label>
          <label>
            Price:
            <input type="text" value={price} name="price" required onChange={(e) => setPrice(e.target.value)} />
          </label>
          <button>Inserir</button>
        </form>
      </div>

    </div>
  );
}

export default App;
