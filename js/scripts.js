// Display search
const searchContainer = document.querySelector(".search-container");
let searchForm = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
 <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
 </form>`;
searchContainer.insertAdjacentHTML("beforeend", searchForm);
const searchInput = document.getElementById("search-input");
const seaarchSubmit = document.getElementById("search-submit");

// Display Gallery
/*
const galleryDiv = document.getElementById("gallery");
let galleryCard = `<div class="card">
<div class="card-img-container">
<img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
</div>
<div class="card-info-container">
<h3 id="name" class="card-name cap">first last</h3>
<p class="card-text">email</p>
<p class="card-text cap">city, state</p>
</div>
</div>`;
galleryDiv.insertAdjacentHTML("beforeend", galleryCard);
*/

//Modal
/* 
let modalDiv = ` <div class="modal-container">
<div class="modal">
<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
<div class="modal-info-container">
<img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
<h3 id="name" class="modal-name cap">name</h3>
<p class="modal-text">email</p>
<p class="modal-text cap">city</p>
<hr>
<p class="modal-text">(555) 555-5555</p>
<p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
<p class="modal-text">Birthday: 10/21/2015</p>
</div>
</div>`;
galleryDiv.insertAdjacentHTML("afterend", modalDiv);
*/
window.onload = () => {
  randomUserGenerator();
};
// Function to fetch data from random user api

const randomUserGenerator = () => {
  fetch("https://randomuser.me/api/?nat=us")
    .then((response) => response.json())
    .then((data) => showRandomuserData(data));
};
//
let showRandomuserData = function showRandomuserData(randomUser) {
  const galleryDiv = document.getElementById("gallery");
  const galleryCard = `
    <div class="card">
<div class="card-img-container">
<img class="card-img" src= '${randomUser.results[0].picture.large}' alt="profile picture">
</div>
<div class="card-info-container">
<h3 id="name" class="card-name cap">${randomUser.results[0].name.first} ${randomUser.results[0].name.last}</h3>
<p class="card-text">${randomUser.results[0].email}</p>
<p class="card-text cap">${randomUser.results[0].location.city}, ${randomUser.results[0].location.state}</p>
</div>
</div>`;
  galleryDiv.insertAdjacentHTML("beforeend", galleryCard);
};

// Helper Function
/* 
showRandomuserData = (randomUser) => {
  document.querySelector(
    ".card-img"
  ).src = `${randomUser.results[0].picture.large}`;
  document.getElementById(
    "name"
  ).innerText = `${randomUser.results[0].name.first} ${randomUser.results[0].name.last}`;

  document.querySelector(
    ".card-text"
  ).innerText = `${randomUser.results[0].email}`;

  document.querySelector(
    ".card-text cap"
  ).innerText = `${randomUser.results[0].location.city} , ${randomUser.results[0].location.state}`;
};
*/
