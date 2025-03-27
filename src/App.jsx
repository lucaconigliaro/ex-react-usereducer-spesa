import React, { useState } from "react";

function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  function addToCart(product) {
    setAddedProducts((prevAddedProducts) => {
      const productExists = prevAddedProducts.some((p) => p.name === product.name);
      if (productExists) {
        return prevAddedProducts;
      }
      return [...prevAddedProducts, { ...product, quantity: 1 }];
    });
  };

  return (
    <div>
      <h1>Prodotti</h1>
      {products.map((product, index) => (
        <div key={index}>
          <p>Nome: {product.name}</p>
          <p>Prezzo: {product.price}</p>
          <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
        </div>
      ))}

      {addedProducts.length > 0 && (
        <div>
          <h2>Prodotti nel carrello</h2>
          <ul>
            {addedProducts.map((product, index) => (
              <li key={index}>
                <p>Nome: {product.name}</p>
                <p>Prezzo: {product.price}</p>
                <p>Quantità: {product.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;