// Display search
const searchContainer = document.querySelector(".search-container");
let searchForm = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
 <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
 </form>`;
searchContainer.insertAdjacentHTML("beforeend", searchForm);
const searchInput = document.getElementById("search-input");
const seaarchSubmit = document.getElementById("search-submit");

// show 12 item on page

window.onload = () => {
  randomUserGenerator();
};
// Function to fetch data from random user api
const galleryDiv = document.getElementById("gallery");
const randomUserGenerator = () => {
  fetch(
    "https://randomuser.me/api/?results=12&nat=us&inc=name,email,location,picture,cell,dob,nat"
  )
    .then((response) => response.json())
    .then((data) => {
      showRandomuserData(data.results);
      cardSelectModalOpen(data);
      createModal(data);
    });
};

function showRandomuserData(data) {
  data.forEach(function showInd(randomUser, i) {
    //const galleryDiv = document.getElementById("gallery");
    let galleryCard = `
    <div class="card">
<div class="card-img-container">
<img class="card-img" src= '${randomUser.picture.large}' alt="profile picture">
</div>
<div class="card-info-container">
<h3 id="name" class="card-name cap">${randomUser.name.first} ${randomUser.name.last}</h3>
<p class="card-text">${randomUser.email}</p>
<p class="card-text cap">${randomUser.location.city}, ${randomUser.location.state}</p>
</div>
</div>`;

    galleryDiv.insertAdjacentHTML("beforeend", galleryCard);
  });
}
// Click a Card the Modal Opens up
function cardSelectModalOpen(data) {
  const cards = document.querySelectorAll(".card");
  console.log(cards);
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", (e) => {
      document.querySelector(".modal-container").style.display = "block";
    });
  }
}

//Modal
function createModal() {
  let modalDiv = ` <div class="modal-container">
<div class="modal">
<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>

</div>`;
  galleryDiv.insertAdjacentHTML("afterend", modalDiv);
  const modalContainer = document.querySelector(".modal-container");
  let closeBtn = document.getElementById("modal-close-btn");

  modalContainer.style.display = "none";
  closeBtn.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
}

/*
let modalInfo = ` 
<div class="modal-info-container">
<img class="modal-img" src='${randomUser.picture.large}' alt="profile picture">
<h3 id="name" class="modal-name cap">${randomUser.name.first} ${randomUser.name.last}</h3>
<p class="modal-text">${randomUser.email}</p>
<p class="modal-text cap">${randomUser.location.city}</p>
<hr>
<p class="modal-text">${randomUser.cell}</p>
<p class="modal-text"> ${randomUser.street}.,  ${randomUser.location.city}, ${randomUser.location.state} 
${randomUser.location.postcode}</p>
<p class="modal-text">Birthday: ${randomUser.dob.date}</p>
</div>
`;
*/

/*
let modalOpen = document.querySelector(".card-info-container");
console.log(modalOpen);
let modal = document.querySelector(".modal");
let closeBtn = document.getElementById("modal-close-btn");
console.log(modal);
*/
/*
gallery.onclick = function () {
  modal.style.display = "block";
};

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
*/
//closeBtn.onclick = function () {
// modal.style.display = "none";
//};
/*
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
*/
