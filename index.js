const orderConfModal = document.querySelector("dialog");
const cartItemsInnerWrapper = document.querySelector(
  ".cart-items-inner-wrapper"
);
const cartWithItems = document.querySelector(".cart-with-items");
const cartEmpty = document.querySelector(".cart-empty");
const cartItemQty = document.querySelector(".cart-with-items h2");
const cartTotalElem = document.querySelector(".cart-total");
const removeCartItemBtn = document.querySelector(".cart-item-remove");
const confOrdBtn = document.querySelector(".btn-conf-ord");
const newOrdBtn = document.querySelector(".btn-new-ord");
const orderSummaryItemsWrapper = document.querySelector(
  ".order-summary-items-wrapper"
);
const orderConfTotalElem = document.querySelector(
  ".order-conf-total-wrapper p:last-child"
);
const cartSubtotalElem = document.querySelector(".subtotal");
const cartTaxElem = document.querySelector(".tax");
const summarySubtotalElem = document.querySelector(".summary-subtotal");
const summaryTaxElem = document.querySelector(".summary-tax");
const taxRate = 0.08;

const cartObj = {
  cartItems: [],

  calculateTotal: () => {
    const subtotalsArray = cartObj.cartItems.map((item) =>
      item.calculateSubtotal()
    );
    if (subtotalsArray.length) {
      const cartSubtotal = subtotalsArray.reduce((acc, curr) => {
        return acc + curr;
      });
      const tax = cartSubtotal * taxRate;
      const cartTotal = cartSubtotal + tax;

      cartSubtotalElem.innerText = `$${cartSubtotal.toFixed(2)}`;
      cartTaxElem.innerText = `$${tax.toFixed(2)}`;
      cartTotalElem.innerText = `$${cartTotal.toFixed(2)}`;

      summarySubtotalElem.innerText = `$${cartSubtotal.toFixed(2)}`;
      summaryTaxElem.innerText = `$${tax.toFixed(2)}`;
      orderConfTotalElem.innerText = `$${cartTotal.toFixed(2)}`;
    } else {
      cartWithItems.style.display = "none";
      cartEmpty.style.display = "block";
    }
  },

  startNewOrder() {
    location.reload();
  },

  updateCartItemTotal() {
    let qtysArray = this.cartItems.map((item) => item.qty);
    let qtyTotal = qtysArray.reduce((acc, curr) => {
      return acc + curr;
    });
    cartItemQty.innerText = `Your Cart (${qtyTotal})`;
  },

  confirmOrder() {
    // submit order func would go here...
    updateConfModal();
    orderConfModal.showModal();
  },

  addItem: (item) => {
    this.cartItems.push(item);
  },

  updateCartUI() {
    cartItemsInnerWrapper.innerHTML = "";

    cartObj.cartItems.forEach((item) => {
      cartObj.createCartItemHtml(item);
      cartObj.updateCartItemTotal();
      cartObj.calculateTotal();
    });
  },

  removeCartItem(item, prodId) {
    item.parentElement.parentElement.remove();

    this.cartItems.forEach((item, idx) => {
      if (item.itemID.toString() === prodId) {
        this.cartItems.splice(idx, 1);
      }
    });

    this.calculateTotal();
  },

  createCartItemHtml(item) {
    cartItemsInnerWrapper.innerHTML += `
      <div class="cart-item cart-prod-id-${item.itemID}" data-prod-id=${
      item.itemID
    }>
        <div class="cart-item-content">
          <p class="cart-item-name">${item.name}</p>
          <div class="cart-item-price-info">
            <p class="cart-item-qty">${item.qty}x</p>
            <p class="cart-item-price">@ $${item.price}</p>
            <p class="cart-item-subtotal">$${item
              .calculateSubtotal()
              .toFixed(2)}</p>
          </div>
        </div>
        <div class="cart-item-remove">
          <img src="/assets/images/icon-remove-item.svg" alt="remove item" />
        </div>
      </div>
    `;
  },
};

class CartItem {
  constructor(cartItem) {
    this.name = cartItem.name;
    this.price = cartItem.price.toFixed(2);
    this.qty = 1;
    this.itemID = cartItem.id;
    this.image = cartItem.image.thumbnail;
  }
  calculateSubtotal() {
    return this.price * this.qty;
  }
}

function createOrderSummaryItemHTML(cartItem) {
  orderSummaryItemsWrapper.innerHTML += `
    <div class="order-summary-item">
      <img src="${cartItem.image}" alt="" />
      <div class="order-summary-content">
        <p>${cartItem.name}</p>
        <div class="order-summary-content-price-wrapper">
          <p class="order-summary-item-qty">${cartItem.qty}x</p>
          <p class="order-summary-item-price">@ $${cartItem.price}</p>
        </div>
      </div>
      <p class="order-summary-item-subtotal">$${cartItem
        .calculateSubtotal()
        .toFixed(2)}</p>
    </div>
  `;
}

function updateConfModal() {
  orderSummaryItemsWrapper.innerHTML = "";

  cartObj.cartItems.forEach((cartItem) => {
    createOrderSummaryItemHTML(cartItem);
  });
}

function updateProdCardBtns(item, num) {
  return `
        <p class="decrement-item">-</p>
          ${!num ? item.qty : 1}
        <p class="increment-item">+</p>`;
}

function resetProdCardBtn(prodId) {
  const prodCards = document.querySelectorAll(".card");
  const btn = prodCards[prodId].children[1].children[3];

  btn.classList.add("add-to-cart-btn");
  btn.classList.remove("added-to-cart");
  btn.innerHTML = `        
        <img class="cart-icon" src="/assets/images/icon-add-to-cart.svg" alt=""/>
          <p class="decrement-item">-</p>
            Add To Cart
          <p class="increment-item">+</p>`;
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".decrement-item")) {
    const button = e.target;
    const id = e.target.closest(".card").dataset.prodId;

    cartObj.cartItems.forEach((item) => {
      if (item.itemID.toString() !== id) {
        return;
      } else {
        if (item.qty !== 1) {
          item.qty--;
          button.parentElement.innerHTML = updateProdCardBtns(item);
          cartObj.updateCartUI();
        } else {
          resetProdCardBtn(id);
          cartObj.cartItems.forEach((item, idx) => {
            if (item.itemID.toString() === id) {
              cartObj.cartItems.splice(idx, 1);
              cartObj.updateCartUI();
              cartObj.calculateTotal();
            }
          });
        }
      }
    });
    if (cartObj.cartItems.length) cartObj.updateCartItemTotal();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".increment-item")) {
    const button = e.target.parentElement;
    const id = e.target.closest(".card").dataset.prodId;

    cartObj.cartItems.forEach((item) => {
      if (item.itemID.toString() !== id) {
        return;
      } else {
        item.qty++;
        button.innerHTML = updateProdCardBtns(item);
        cartObj.updateCartUI();
      }
    });
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".cart-item-remove img")) {
    const prodId = e.target.closest(".cart-item").dataset.prodId;
    cartObj.removeCartItem(e.target, prodId);
    resetProdCardBtn(prodId);
    if (cartObj.cartItems.length) cartObj.updateCartItemTotal();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".add-to-cart-btn")) {
    let button = e.target;

    button.classList.add("added-to-cart");
    button.classList.remove("add-to-cart-btn");
    button.innerHTML = updateProdCardBtns(item, 1);

    cartEmpty.style.display = "none";
    cartWithItems.style.display = "block";

    loadJSON("/data.json").then((data) => {
      let newCartItem = new CartItem(
        data[button.closest(".card").dataset.prodId]
      );

      cartObj.cartItems.push(newCartItem);
      cartObj.createCartItemHtml(newCartItem);

      if (cartObj.cartItems.length === 0) {
        cartItemQty.innerText = "Your Cart (1)";
      } else {
        cartObj.updateCartItemTotal();
        cartObj.calculateTotal();
      }
    });
  }
});

confOrdBtn.addEventListener("click", cartObj.confirmOrder);

newOrdBtn.addEventListener("click", cartObj.startNewOrder);
