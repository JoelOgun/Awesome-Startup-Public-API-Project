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

// Function to fetch data from random user api
const galleryDiv = document.getElementById("gallery");
const randomUserGenerator = () => {
  fetch(
    "https://randomuser.me/api/?results=12&nat=us&inc=name,email,location,picture,cell,dob,nat"
  )
    .then((response) => response.json())
    .then((data) => {
      const employees = data.results;
      showRandomuserData(employees);
      cardSelectModalOpen(employees);
      createModal();
      toggleModal(employees);
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
      infoModal(data[i]);
    });
  }
}

//Modal
function createModal(data) {
  let modalDiv = ` <div class="modal-container">
<div class="modal">
<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>

<div class="modal-btn-container">
<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
<button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>

</div>`;
  galleryDiv.insertAdjacentHTML("afterend", modalDiv);
  const modalContainer = document.querySelector(".modal-container");
  let closeBtn = document.getElementById("modal-close-btn");

  modalContainer.style.display = "none";

  closeBtn.addEventListener("click", () => {
    modalContainer.style.display = "none";
    document.querySelector(".modal-info-container").remove();
  });
}

// ModalInfo
function infoModal(data) {
  const date = new Date(`${data.dob.date}`);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const mmddyyyy = `${month}/${day}/${year}`;
  let modalInfo = ` 
<div class="modal-info-container">
<img class="modal-img" src='${data.picture.large}' alt="profile picture">
<h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
<p class="modal-text">${data.email}</p>
<p class="modal-text cap">${data.location.city}</p>
<hr>
<p class="modal-text">${data.cell}</p>
<p class="modal-text"> ${data.location.street.number} ${data.location.street.name}.,  ${data.location.city}, ${data.location.state} 
${data.location.postcode}</p>
<p class="modal-text">Birthday: ${mmddyyyy}</p>
</div>
`;
  const modal = document.querySelector(".modal");
  modal.insertAdjacentHTML("afterbegin", modalInfo);
}

function toggleModal(data, i) {
  const nextBtn = document.getElementById("modal-next");
  const prevBtn = document.getElementById("modal-prev");
  const cards = document.querySelectorAll(".card");
  const modal = document.querySelector(".modal");

  prevBtn.addEventListener("click", () => {
    i--;
    if (i === 0) {
      modalPrev.style.display = "none";
    } else {
      infoModal(data[i]);
    }
  });

  nextBtn.addEventListener("click", () => {
    for (let i = 0; i < 12; i++) {
      if (cards[i] === 11) {
        nextBtn.style.display = "none";
        nextBtn.disabled = true;
      } else {
        nextBtn.style.display = "block";
        nextBtn.disabled = false;
      }
    }
  });

  /*
  prevBtn.addEventListener("click", () => {
    if (i === 0) {
      prevBtn.disabled = true;
      prevBtn.style.display = "none";
    } else {
      prevBtn.disabled = false;
    }
  });

  nextBtn.addEventListener("click", () => {
    for (let i = 0; i < employees.length; i++) {
      if (i === 11) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }
    }
  });
*/
}

window.onload = () => {
  randomUserGenerator();
  cardSelectModalOpen();
  createModal();
};
/*
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
*/
