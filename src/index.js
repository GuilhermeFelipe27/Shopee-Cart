import createItem from "./services/item.js";
import * as cartServices from "./services/cart.js";
const myCart = [];
const item1 = await createItem("Monitor AOC 24 polegadas", 500, 1);
const item2 = await createItem("Teclado sem fio", 50.99, 3);

console.log("Welcome to the your Shopee cart!\n");

// adiciona itens
await cartServices.addItem(myCart, item1);
await cartServices.addItem(myCart, item2);

// remove itens
await cartServices.removeItem(myCart, item1);

// delete itens
// await cartServices.deleteItem(myCart, item2.name);
// await cartServices.deleteItem(myCart, item1.name);

// exibe os itens do carrinho
await cartServices.displayCart(myCart);

// calcula o total do carrinho (somando o subtotal de todos os itens)
await cartServices.calculateTotal(myCart);
