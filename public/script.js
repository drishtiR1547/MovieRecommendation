const data = {
  Action: [
    { title: "John Wick", video: "2AUmvWm5ZDQ" },
    { title: "Avengers Endgame", video: "TcMBFSGVi1c" },
    { title: "Pathaan", video: "vqu4z34wENw" },
    { title: "War", video: "tQ0mzXRk-oM" },
    { title: "Dark Knight", video: "EXeTwQWrcwY" }
  ],
  Comedy: [
    { title: "Hangover", video: "tcdUhdOlz9M" },
    { title: "Superbad", video: "4eaZ_48ZYog" },
    { title: "Hera Pheri", video: "m1zMmVwWr-M" },
    { title: "Golmaal", video: "J8c3Lh9y0rE" }
  ],
  Horror: [
    { title: "Conjuring", video: "k10ETZ41q5o" },
    { title: "It", video: "FnCdOQsX5kc" },
    { title: "Insidious", video: "zuZnRUcoWos" },
    { title: "Nun", video: "pzD9zGcUNrw" }
  ]
};

// LOAD ROWS
function loadRows() {
  const container = document.getElementById("rows");
  container.innerHTML = "";

  Object.keys(data).forEach(genre => {
    const row = document.createElement("div");

    row.innerHTML = `
      <h2>${genre}</h2>
      <div class="row-wrapper">
        <button class="scroll left">‹</button>
        <div class="row">
          ${data[genre].map(m => `
            <div class="card" onclick="play('${m.video}','${m.title}')">
              <img src="https://img.youtube.com/vi/${m.video}/0.jpg">
              <div class="card-info">
                <h4>${m.title}</h4>
              </div>
            </div>
          `).join("")}
        </div>
        <button class="scroll right">›</button>
      </div>
    `;

    container.appendChild(row);
  });

  // scroll buttons
  document.querySelectorAll(".left").forEach(btn => {
    btn.onclick = () => btn.nextElementSibling.scrollBy({ left: -300, behavior: 'smooth' });
  });

  document.querySelectorAll(".right").forEach(btn => {
    btn.onclick = () => btn.previousElementSibling.scrollBy({ left: 300, behavior: 'smooth' });
  });
}

// HERO
function setHero() {
  const all = Object.values(data).flat();
  const pick = all[Math.floor(Math.random() * all.length)];

  document.getElementById("hero").style.backgroundImage =
    `url(https://img.youtube.com/vi/${pick.video}/maxresdefault.jpg)`;

  document.getElementById("hero-title").innerText = pick.title;
  document.getElementById("hero-play").onclick = () => play(pick.video, pick.title);
}

// PLAY
function play(videoId) {
  document.getElementById("video").src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  document.getElementById("modal").style.display = "flex";
}

// CLOSE
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("video").src = "";
}

// SEARCH
document.getElementById("search").addEventListener("input", function () {
  const val = this.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      card.innerText.toLowerCase().includes(val) ? "block" : "none";
  });
});

// INIT
loadRows();
setHero();