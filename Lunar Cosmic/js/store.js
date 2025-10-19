// Sample Product Data
const products = [
  {
    id: 1,
    name: "CELESTIAL RECORDS",
    images: ["images/mockbookcover.png", "images/backmockbook.png"],
    description: "A 20-page printed publication exploring eclipses, lunar phases, and celestial philosophy.",
    detail: "Printed on recycled matte paper,Includes an observational chart insert(Come with Bookmarks series)."
  },
  {
    id: 2,
    name: "Moonphase Bookmarks (Set of 3)",
    images: ["images/bookmark1-01.png", "images/bookmark2.png", "images/bookmark3.png"],
    description: "Three paper bookmarks with the moon and planet series.",
    detail: "Each piece comes with a matching rope. Designed to age gracefully with use."
  },
  {
    id: 3,
    name: "Celestial Postcards (Set of 2)",
    images: ["images/pscards1.png", "images/pscards1 - Copy.png", "images/pscardback.png"],
    description: "A collection of lunar imagery and illustration— printed on textured paper.",
    detail: "Back side all the same, postcard 4x6 inch format."
  },
  {
    id: 4,
    name: "Lunar Keychains",
    images: ["images/keychain1.png", "images/keychain2.png"],
    description: "Keychains inspired by the geometry of eclipses and lunar orbits.",
    detail: "Made of acrylic."
  },
  {
    id: 5,
    name: "Shadow Notebook",
    images: ["images/notebook1.png", "images/notebook2.png"],
    description: "Simple doodle tools for documenting silence, thoughts, and fragments of light..",
    detail: "They are not only made to be written in,but to remind us that even in silence, something is always orbiting."
  }
];

// DOM
const gallery = document.getElementById("productGallery");

// Render product cards
products.forEach(prod => {
  let currentImg = 0;

  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-images" id="imgSet-${prod.id}">
      <img src="${prod.images[0]}" alt="${prod.name}">
      <div class="slide-controls">
        <button class="prev">‹</button>
        <button class="next">›</button>
      </div>
    </div>
    <div class="product-info">
      <h2>${prod.name}</h2>
      <p>${prod.description}</p>
      <span class="detail-link" data-id="${prod.id}">View Details →</span>
      <div class="product-actions">
        <button class="action-btn">♡ Favorite</button>
        <button class="action-btn">Add to Cart</button>
      </div>
    </div>
  `;

  gallery.appendChild(card);

  // image slider
  const imgBox = card.querySelector(`#imgSet-${prod.id}`);
  const imgEl = imgBox.querySelector("img");
  const prev = imgBox.querySelector(".prev");
  const next = imgBox.querySelector(".next");

  next.addEventListener("click", () => {
    currentImg = (currentImg + 1) % prod.images.length;
    imgEl.src = prod.images[currentImg];
  });
  prev.addEventListener("click", () => {
    currentImg = (currentImg - 1 + prod.images.length) % prod.images.length;
    imgEl.src = prod.images[currentImg];
  });
});

// detail popup
const popup = document.createElement("div");
popup.className = "detail-popup";
popup.innerHTML = `
  <div class="detail-content">
    <span class="close-detail">✕</span>
    <h2 id="detailTitle"></h2>
    <p id="detailText"></p>
  </div>
`;
document.body.appendChild(popup);

document.querySelectorAll(".detail-link").forEach(link => {
  link.addEventListener("click", e => {
    const id = e.target.dataset.id;
    const product = products.find(p => p.id == id);
    document.getElementById("detailTitle").textContent = product.name;
    document.getElementById("detailText").textContent = product.detail;
    popup.style.display = "flex";
  });
});

popup.querySelector(".close-detail").addEventListener("click", () => {
  popup.style.display = "none";
});
