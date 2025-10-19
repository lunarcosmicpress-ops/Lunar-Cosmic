// === Lunarcosmic Community Feed with Like Feature ===

// Example Posts (you can edit or expand)
const posts = [
  {
    id: "001",
    title: "Field Record — Eclipse Journal",
    author: "A. Vesper",
    date: "2025.08.21",
    content: "The total eclipse passed silently. Shadows folded into themselves — an event both scientific and sacred."
  },
  {
    id: "002",
    title: "Personal Log — Lunar Reflection",
    author: "N. Han",
    date: "2025.09.03",
    content: "The Moon never changes, yet every night it looks new. Memory and illusion share the same light."
  },
  {
    id: "003",
    title: "Field Entry — Ocean Tides",
    author: "E. Mare",
    date: "2025.09.19",
    content: "The tide arrived earlier today. Gravity isn’t force, but conversation."
  },
  {
    id: "004",
    title: "Observation Log — Red Horizon",
    author: "T. Sol",
    date: "2025.09.28",
    content: "A thin red light painted the horizon — not sunset, but reflection. Light returning home."
  },
  {
    id: "005",
    title: "Data File — Moonlight Spectrum",
    author: "L. Vega",
    date: "2025.10.02",
    content: "Measured spectrum at 01:47 GMT. Reflected intensity stable at 0.12 albedo."
  },
  {
    id: "006",
    title: "Fragment — The Silent Orbit",
    author: "S. Lyra",
    date: "2025.10.05",
    content: "Silence is a perfect circle — the orbit of thought itself."
  },
  {
    id: "007",
    title: "Research Note — Dust Patterns",
    author: "D. Io",
    date: "2025.10.07",
    content: "Collected micro-particles under full moonlight. Each grain held a memory of heat."
  },
  {
    id: "008",
    title: "Field Log — Umbra Field",
    author: "M. Corvus",
    date: "2025.10.10",
    content: "In the deepest shadow, the air hums quietly. Umbra feels alive."
  },
  {
    id: "009",
    title: "Archive Entry — Sound of Moonlight",
    author: "H. Enceladus",
    date: "2025.10.12",
    content: "Sound travels differently in thought — maybe moonlight has its own frequency."
  },
  {
    id: "010",
    title: "Visual Record — Light Fragments",
    author: "E. Mare",
    date: "2025.10.13",
    content: "Fragments of reflected light were captured on glass — faint, but endless."
  }
];

// === DOM Elements ===
const feed = document.getElementById("feed");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// Load saved likes from localStorage
const savedLikes = JSON.parse(localStorage.getItem("lunarLikes")) || {};

// === Render Posts ===
let visibleCount = 5;

function renderPosts() {
  feed.innerHTML = "";
  posts.slice(0, visibleCount).forEach(post => {
    const isLiked = savedLikes[post.id] || false;

    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
      <div class="post-header">
        <span>File No. ${post.id}</span>
        <span>${post.date}</span>
      </div>
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="card-footer">— ${post.author}</div>

      <div class="post-actions">
        <div class="like-btn ${isLiked ? "liked" : ""}" data-id="${post.id}">
          <svg viewBox="0 0 24 24">
            <path d="M12 20.8l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                     2 6.42 3.42 5 5.5 5c1.54 0 3.04 1.04 3.57 2.36h1.87C13.46 6.04 14.96 5 16.5 5 
                     18.58 5 20 6.42 20 8.5c0 3.78-3.4 6.86-8.55 11L12 20.8z"/>
          </svg>
          <span>${isLiked ? 1 : 0}</span>
        </div>
      </div>
    `;
    feed.appendChild(card);
  });

  if (visibleCount >= posts.length) loadMoreBtn.style.display = "none";
  bindLikeEvents();
}

// === Like Button Handler ===
function bindLikeEvents() {
  const likeBtns = document.querySelectorAll(".like-btn");
  likeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const liked = btn.classList.toggle("liked");
      const countEl = btn.querySelector("span");
      countEl.textContent = liked ? 1 : 0;

      savedLikes[id] = liked;
      localStorage.setItem("lunarLikes", JSON.stringify(savedLikes));
    });
  });
}

// === Load More Button ===
loadMoreBtn.addEventListener("click", () => {
  visibleCount += 3;
  renderPosts();
});

// Initial Render
renderPosts();
// === ADD OBSERVATION SYSTEM ===
const openFormBtn = document.getElementById("openFormBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const observationForm = document.getElementById("observationForm");
const recordForm = document.getElementById("recordForm");

// Show form
openFormBtn.addEventListener("click", () => {
  observationForm.style.display = "flex";
});

// Hide form
closeFormBtn.addEventListener("click", () => {
  observationForm.style.display = "none";
});

// Submit new observation
recordForm.addEventListener("submit", e => {
  e.preventDefault();

  const author = document.getElementById("author").value.trim() || "Anonymous";
  const title = document.getElementById("title").value.trim() || "Untitled Record";
  const content = document.getElementById("content").value.trim();

  if (!content) return;

  const newPost = {
    id: String(posts.length + 1).padStart(3, "0"),
    title,
    author,
    date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
    content
  };

  // Add to the top of feed
  posts.unshift(newPost);
  renderPosts();

  // Save user posts in localStorage
  const savedUserPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
  savedUserPosts.unshift(newPost);
  localStorage.setItem("userPosts", JSON.stringify(savedUserPosts));

  // Clear form & hide
  recordForm.reset();
  observationForm.style.display = "none";
});

// === Load saved user posts ===
window.addEventListener("DOMContentLoaded", () => {
  const savedUserPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
  posts.unshift(...savedUserPosts);
  renderPosts();
});
