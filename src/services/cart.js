async function addItem(userCart, item) {
  userCart.push(item);
}

async function deleteItem(userCart, name) {
  const index = userCart.findIndex((item) => item.name === name); // se não encontrar nenhum valor, o método retorna -1 por padrão

  if (index !== -1) {
    userCart.splice(index, 1); // .splice: remove o elemento "index" a partir do índice 1
  }
}

async function removeItem(userCart, item) {
  // encontrando o índice do item
  const indexFound = userCart.findIndex(
    (product) => product.name === item.name
  );

  if (indexFound === -1) {
    console.log("Item não encontrado");
    return;
  }

  if (userCart[indexFound].quantity > 1) {
    userCart[indexFound].quantity -= 1;
    return;
  }

  if (userCart[indexFound].quantity == 1) {
    userCart.splice(indexFound, 1);
    return;
  }
}

async function displayCart(userCart) {
  console.log("Shopee cart list:");
  userCart.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.name} - ${item.price} | ${
        item.quantity
      }x | R$ ${item.subtotal()}`
    );
  });
}

async function calculateTotal(userCart) {
  console.log("\nShopee cart total is: ");
  const result = userCart.reduce((total, item) => total + item.subtotal(), 0); // método reduce (reduzir)
  console.log(result);
}

export { addItem, deleteItem, removeItem, calculateTotal, displayCart };
