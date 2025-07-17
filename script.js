const productList = document.getElementById("product-list");
const categorySelect = document.getElementById("categorySelect");

function renderProducts(category = "all") {
  productList.innerHTML = "";

  const filtered = category === "all"
    ? products
    : products.filter(p => p.category === category);

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onclick="showProductDetail(${product.id})">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
    `;
    productList.appendChild(div);
  });
}

function filterProducts() {
  const selected = categorySelect.value;
  renderProducts(selected);
}

function showProductDetail(id) {
  const product = products.find(p => p.id === id);
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("productModal").style.display = "block";
}

document.querySelector(".close-btn").onclick = function () {
  document.getElementById("productModal").style.display = "none";
};

window.onclick = function (event) {
  if (event.target.className === "modal") {
    document.getElementById("productModal").style.display = "none";
  }
};

let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 4 seconds
}

renderProducts(); // load all on page load
