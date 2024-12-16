const orderConfModal = document.querySelector("dialog");

// orderConfModal.showModal();

const cartObj = {
  isEmpty: true,
  cartItems: [],
  cartTotal: 0,
  calculateTotal: () => {},
  confirmOrder: () => {},
  addItem: (item) => {
    this.cartItems.push(item);
  },
};

class CartItem {
  constructor(cartItem) {
    this.name = cartItem.name;
    this.price = cartItem.price.toFixed(2);
    this.qty = 1;
    this.itemID = cartItem.id;
  }
  calculateSubtotal() {
    return this.price * this.qty;
  }
  removeItem() {}
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".add-to-cart-btn")) {
    e.preventDefault();
    let button = e.target;
    cartObj.isEmpty = false;
    button.classList.add("added-to-cart");
    button.classList.remove("add-to-cart-btn");
    button.innerHTML = `  
        <p class="decrement-item">-</p>
          1
        <p class="increment-item">+</p>`;

    loadJSON("/data.json").then((data) => {
      let newCartItem = new CartItem(data[button.parentElement.dataset.prodId]);
      cartObj.cartItems.push(newCartItem);
    });
    console.log(cartObj.cartItems);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".decrement-item")) {
    const button = e.target;
    const id = e.target.parentElement.parentElement.dataset.prodId;
    cartObj.cartItems.forEach((item) => {
      if (item.itemID.toString() !== id) {
        return;
      } else {
        if (item.qty !== 1) {
          item.qty--;
          button.parentElement.innerHTML = `
        <p class="decrement-item">-</p>
          ${item.qty}
        <p class="increment-item">+</p>`;
        }
        console.log(cartObj.cartItems);
      }
    });
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".increment-item")) {
    const button = e.target.parentElement;
    const id = e.target.parentElement.parentElement.dataset.prodId;

    cartObj.cartItems.forEach((item) => {
      if (item.itemID.toString() !== id) {
        return;
      } else {
        item.qty++;
        button.innerHTML = `
        <p class="decrement-item">-</p>
          ${item.qty}
        <p class="increment-item">+</p>`;
      }
      console.log(cartObj.cartItems);
    });
  }
});
