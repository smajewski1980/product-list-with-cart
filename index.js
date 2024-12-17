const orderConfModal = document.querySelector("dialog");
const cartItemsInnerWrapper = document.querySelector(
  ".cart-items-inner-wrapper"
);
const cartWithItems = document.querySelector(".cart-with-items");
const cartEmpty = document.querySelector(".cart-empty");
const cartItemQty = document.querySelector(".cart-with-items h2");

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

    cartEmpty.style.display = "none";
    cartWithItems.style.display = "block";

    loadJSON("/data.json").then((data) => {
      let newCartItem = new CartItem(data[button.parentElement.dataset.prodId]);
      cartObj.cartItems.push(newCartItem);
      createCartItemHtml(newCartItem);
      if (cartObj.cartItems.length === 0) {
        cartItemQty.innerText = "Your Cart (1)";
      } else {
        updateCartItemTotal();
      }
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
          updateCartUI();
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
        updateCartUI();
      }

      console.log(cartObj.cartItems);
    });
  }
});

function createCartItemHtml(item) {
  cartItemsInnerWrapper.innerHTML += `
    <div class="cart-item cart-prod-id-${item.itemID}">
      <div class="cart-item-content">
        <p class="cart-item-name">${item.name}</p>
        <div class="cart-item-price-info">
          <p class="cart-item-qty">${item.qty}</p>
          <p class="cart-item-price">@ $${item.price}</p>
          <p class="cart-item-subtotal">$${item
            .calculateSubtotal()
            .toFixed(2)}</p>
        </div>
      </div>
      <div class="cart-item-close">
        <img src="/assets/images/icon-remove-item.svg" alt="remove item" />
      </div>
    </div>
  `;
}

function updateCartUI() {
  cartItemsInnerWrapper.innerHTML = "";
  cartObj.cartItems.forEach((item) => {
    createCartItemHtml(item);
    updateCartItemTotal();
  });
}

function updateCartItemTotal() {
  let qtysArray = cartObj.cartItems.map((item) => item.qty);
  let qtyTotal = qtysArray.reduce((acc, curr) => {
    return acc + curr;
  });
  cartItemQty.innerText = `Your Cart (${qtyTotal})`;
}

// need to update cart ui on qty decrement

// need to make delete item button active

// need to make confirm order button update and show modal

// need to make modal button clear cart
