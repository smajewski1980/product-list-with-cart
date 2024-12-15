const orderConfModal = document.querySelector("dialog");

// orderConfModal.showModal();

document.addEventListener("click", (e) => {
  if (e.target.matches(".add-to-cart-btn")) {
    e.preventDefault();
    let button = e.target;
    button.classList.add("added-to-cart");
    button.innerHTML = `  
        <p class="decrement-item">-</p>
          1
        <p class="increment-item">+</p>`;
  }
});
