
let travelData = [];

// Fetch API "DB" on page load
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => travelData = data)
  .catch(err => console.error("Error loading data:", err));

document.getElementById('searchBtn').addEventListener('click', function() {
    searchRecommendations();
});
document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('recommendations').innerHTML = '';
    document.getElementById('searchInput').value = '';
});

function searchRecommendations() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    const results = [];
    // Allow variations for beach(es), temple(s), country names etc.
    if(q.includes('beach')) {
        results.push(...travelData.filter(d => d.tags.includes('beach')));
    } else if(q.includes('temple')) {
        results.push(...travelData.filter(d => d.tags.includes('temple')));
    } else {
        // Look for country or partial matches
        results.push(...travelData.filter(d => d.country && d.country.toLowerCase().includes(q)));
    }
    displayResults(results);
}

function displayResults(results) {
    const div = document.getElementById('recommendations');
    div.innerHTML = '';
    if(results.length === 0) { div.innerHTML = 'No recommendations found.'; return; }
    results.forEach(place => {
        div.innerHTML += `
            <div class="card">
                <img src="${place.imageUrl}" alt="${place.name}">
                <div><strong>${place.name}</strong></div>
                <div>${place.description}</div>
                <div><em>${place.country || ''}</em></div>
            </div>
        `;
    });
}
