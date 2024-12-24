const prodCardsWrapper = document.querySelector(".cards-grid-wrapper");

async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

function generateCard({ image, category, name, price, id }) {
  return `
    <div class="card" data-prod-id=${id}>
        <img src=${image.desktop} alt="" />
        <div class="card-content">
          <p class="card-category">${category}</p>
          <p class="card-name">${name}</p>
          <p class="card-price">$${price.toFixed(2).toString()}</p>
          <button class="add-to-cart-btn">
          <img class="cart-icon" src="/assets/images/icon-add-to-cart.svg" alt=""/>
          <p class="decrement-item">-</p>
          Add To Cart
          <p class="increment-item">+</p>
          </button>
        </div>
    </div>
  `;
}

loadJSON("./data.json").then((data) => {
  let cardHtml = "";

  for (item of data) {
    cardHtml += generateCard(item);
  }

  prodCardsWrapper.innerHTML = cardHtml;
});
