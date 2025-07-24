const productList = document.getElementById("product-list");
const categorySelect = document.getElementById("categorySelect");

function renderProducts(category = "all") {
  productList.innerHTML = "";
  const filtered = category === "all" ? products : products.filter(p => p.category === category);

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
  renderProducts(categorySelect.value);
}

function showProductDetail(id) {
  const product = products.find(p => p.id === id);
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("productModal").style.display = "flex";
  document.getElementById('modalDetailImage').src = product.detailImage || '';
  document.getElementById('modalDetailImage').style.display = product.detailImage ? 'block' : 'none';

}


document.querySelector(".close-btn").onclick = () => {
  document.getElementById("productModal").style.display = "none";
};

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    document.getElementById("productModal").style.display = "none";
  }
};

function showModal(product) {
  modalImage.src = product.image;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  document.getElementById('modalSpecs').textContent = product.specs || '';
  
  const brochureLink = document.getElementById('modalBrochure');
  if (product.brochure) {
    brochureLink.href = product.brochure;
    brochureLink.style.display = 'inline-block';
  } else {
    brochureLink.style.display = 'none';
  }

  modal.style.display = 'flex';
}


if (productList) renderProducts();
