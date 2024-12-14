const prodCardsWrapper = document.querySelector(".cards-grid-wrapper");

async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

loadJSON("/data.json").then((data) => {
  let cardHtml = "";
  for (item of data) {
    cardHtml += generateCard(item);
  }
  prodCardsWrapper.innerHTML = cardHtml;
});

function generateCard({ image, category, name, price }) {
  return `
    <div class="card">
        <img src=${image.desktop} alt="" />
        <div class="card-content">
          <p class="card-category">${category}</p>
          <p class="card-name">${name}</p>
          <p class="card-price">$${price.toFixed(2).toString()}</p>
        </div>
    </div>
  `;
}
