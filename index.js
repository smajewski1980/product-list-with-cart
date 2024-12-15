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
  }
  calculateSubtotal() {
    return this.price * this.qty;
  }
  removeItem() {
    this.remove();
  }
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".add-to-cart-btn")) {
    e.preventDefault();
    let button = e.target;
    button.classList.add("added-to-cart");
    button.innerHTML = `  
        <p class="decrement-item">-</p>
          1
        <p class="increment-item">+</p>`;

    loadJSON("/data.json").then((data) => {
      // cartObj.cartItems.push(data[button.parentElement.dataset.prodId]);
      let newCartItem = new CartItem(data[button.parentElement.dataset.prodId]);
      cartObj.cartItems.push(newCartItem);
    });
    console.log(cartObj.cartItems);
  }
});
