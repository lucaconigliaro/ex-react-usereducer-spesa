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
        return updateProductQuantity(prevAddedProducts, product);
      }
      return [...prevAddedProducts, { ...product, quantity: 1 }];
    });
  }

  function updateProductQuantity(prevAddedProducts, product) {
    return prevAddedProducts.map((p) => {
      if (p.name === product.name) {
        return { ...p, quantity: p.quantity + 1 };
      }
      return p;
    });
  }

  function removeFromCart(index) {
    setAddedProducts((prevAddedProducts) => {
      return prevAddedProducts.filter((_, i) => i !== index);
    });
  }

  const total = addedProducts.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

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
                <button onClick={() => removeFromCart(index)}>Rimuovi dal carrello</button>
              </li>
            ))}
          </ul>
          <h3>Totale: €{total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default App;