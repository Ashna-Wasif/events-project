const eventContainer = document.getElementById("eventCards");
const searchToggleBtn = document.getElementById("searchToggleBtn");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("searchInput");
let events = [];

function renderEvents(filter = "") {
  eventContainer.innerHTML = "";
  const filtered = events.filter(event =>
    event.title.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(event => {
    eventContainer.innerHTML += `
      <div class="col">
        <div class="card h-100">
          <img src="${event.image}" class="card-img-top" alt="${event.title}">
          <div class="card-body">
            <h5 class="card-title">${event.title}</h5>
            <p class="card-text"><i class="fas fa-calendar-alt me-2"></i> ${event.date}</p>
            <p class="card-text"><i class="fas fa-map-marker-alt me-2"></i> ${event.location}</p>
            <p class="card-text">${event.description}</p>
            <a href="#" class="btn">Register</a>
          </div>
        </div>
      </div>
    `;
  });
}

searchToggleBtn.addEventListener("click", () => {
  searchContainer.style.display = searchContainer.style.display === "none" ? "block" : "none";
  searchInput.focus();
});

searchInput.addEventListener("input", () => {
  renderEvents(searchInput.value);
});

fetch("events.json")
  .then(response => response.json())
  .then(data => {
    events = data;
    renderEvents();
  })
  .catch(err => console.error("Error loading events:", err));
