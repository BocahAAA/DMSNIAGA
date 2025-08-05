const productList = document.getElementById("product-list");
const categorySelect = document.getElementById("categorySelect");

// Get modal and other related elements
const modal = document.getElementById("productModal");
const closeBtn = document.querySelector(".close-btn");
const stickyHeader = document.querySelector(".sticky-header");

// Function to open modal (this is usually inside your product click logic)
function openModal() {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // prevent background scroll
  stickyHeader.style.display = "none";     // Hide navbar + logo
}

// Function to close modal
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "";       // Restore scroll
  stickyHeader.style.display = "block";    // Show navbar + logo
}

// Attach close event
closeBtn.addEventListener("click", closeModal);

// Optional: Close modal if user clicks outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // adjust -80 to fit your navbar height
          behavior: "smooth"
        });
      }
    });
  });

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

  openModal(); 

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
document.getElementById('modalDetailImage').addEventListener('click', function() {
  const win = window.open();
  win.document.write('<img src="' + this.src + '" style="width:100%;">');
});


if (productList) renderProducts();

let teamIndex = 1;
showTeamSlides(teamIndex);

function plusTeamSlides(n) {
  showTeamSlides(teamIndex += n);
}

function currentTeamSlide(n) {
  showTeamSlides(teamIndex = n);
}

function showTeamSlides(n) {
  let i;
  let slides = document.getElementsByClassName("team-slide");
  let dots = document.getElementsByClassName("team-dot");

  if (n > slides.length) {teamIndex = 1}
  if (n < 1) {teamIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[teamIndex-1].style.display = "block";  
  dots[teamIndex-1].className += " active";
}
