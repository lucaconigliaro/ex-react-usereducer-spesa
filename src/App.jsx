import React from "react";

function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];


  return (
    <div>
      <h1>Prodotti</h1>
      {products.map((product) => (
        <div key={product.name}>
          <p>Nome: {product.name}</p>
          <p>Prezzo: {product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;