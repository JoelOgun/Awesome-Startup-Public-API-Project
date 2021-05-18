// Display search
const searchContainer = document.querySelector(".search-container");
let searchForm = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
 <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
 </form>`;
searchContainer.insertAdjacentHTML("beforeend", searchForm);
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");

// Function to fetch data from random user api
const galleryDiv = document.getElementById("gallery");
function fetchData(employees) {
  fetch(
    "https://randomuser.me/api/?results=12&nat=us&inc=name,email,location,picture,cell,dob,nat"
  )
    .then((response) => response.json())
    .then((data) => {
      const employees = data.results;
      console.log(employees);
      showRandomuserData(employees);
      cardSelectModalOpen(employees);
      createModal();
      toggleModal(employees);
    });
}
// Display basic information on each employee
function showRandomuserData(data) {
  data.forEach((employee) => {
    //const galleryDiv = document.getElementById("gallery");
    let galleryCard = `
    <div class="card">
<div class="card-img-container">
<img class="card-img" src= '${employee.picture.large}' alt="profile picture">
</div>
<div class="card-info-container">
<h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
<p class="card-text">${employee.email}</p>
<p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
</div>
</div>`;

    galleryDiv.insertAdjacentHTML("beforeend", galleryCard);
  });
}

// Click a Card the Modal Opens up
function cardSelectModalOpen(data) {
  const cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", (e) => {
      document.querySelector(".modal-container").style.display = "block";
      infoModal(data[i]);
    });
  }
  console.log(cards);
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
  console.log(data);
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
// Next Prev Button for modal
function toggleModal(data, index) {
  const nextBtn = document.getElementById("modal-next");
  const prevBtn = document.getElementById("modal-prev");
  const cards = document.querySelectorAll(".card");
  const modal = document.querySelector(".modal");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
      index = data.indexOf(data[i]);
      if (index === 0) {
        prevBtn.style.display = "none";
      }
    });
  }

  nextBtn.addEventListener("click", () => {
    index++;
    if (index <= data.length) {
      modal.firstElementChild.remove();
      infoModal(data[index]);
    } else if (index >= data.length) {
      index = -1;
    }

    //removes next button if it reaches last employee
    if (index === data.length - 1) {
      nextBtn.style.display = "none";
    } else if (index < data.length) {
      prevBtn.style.display = "block";
    }
  });

  prevBtn.addEventListener("click", () => {
    index--;
    if (index <= -1) {
      index = -1;
    } else if (index <= data.length) {
      modal.firstElementChild.remove();
      infoModal(data[index]);
      console.log(index);
    }

    //removes prev button if it reaches first employee
    if (index < data.length) {
      nextBtn.style.display = "block";
    }
    if (index === 0) {
      prevBtn.style.display = "none";
    }
  });
}

// Creates a div to notify user if the their search finds no matches... Adds styling to noMatch div... appeneds noMatch div to gallery.

const noMatch = document.createElement("div");

noMatch.textContent = "Sorry. No matches found. Try a new Search.";
noMatch.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
noMatch.style.textShadow = "3px 3px #c250c2";
noMatch.style.fontSize = "xx-large";
noMatch.style.color = "#e1f1f0";

noMatch.style.display = "none";

gallery.append(noMatch);

// stores input in input var
const input = document.querySelector("input");

// `filterEmployees` function filters through employees and displays employee with matching name value.
// if there are no matches a message is displayed to make user aware that no matches were found.

function filterEmployees() {
  //selects all elements with `card` class and stores them into `card` variable.
  const card = document.querySelectorAll(".card");

  // creates an array with elements stored in `card` variable, stores array into `names` variable.
  const names = Array.from(card);

  // grabs the value of `search-input`, converts that value to upper case then stores the converted value inside `searchValue` variable.
  let searchValue = document.getElementById("search-input").value.toUpperCase();

  // creates array and stores it inside of `searchResults` variable.
  const searchResults = [];

  // for loop iterates through the elements in `names` array.
  for (let i = 0; i < names.length; i++) {
    // hides element by setting it's display to `none`.
    card[i].style.display = "none";

    // grabs the first element of live element with an `h3` tagname and stores it into our `h3` variable.
    let h3 = card[i].getElementsByTagName("h3")[0];

    // if our `h3` variable's innerHTML, when converted to uppercase, includes our `searchValue` value:
    if (h3.innerHTML.toUpperCase().includes(searchValue)) {
      // push the live `card` element to our `searchResults` array.
      searchResults.push(card[i]);

      // shows element by setting it's display to `block`.
      card[i].style.display = "block";
    }

    // if the length of our `searchResults` array is equal to 0:
    if (searchResults.length === 0) {
      //display `noMatch` div (which lets the user know that no employee name matches were found).
      noMatch.style.display = "block";

      //otherwise:
    } else {
      //hide `noMatch` div by setting display to `none`.
      noMatch.style.display = "none";
    }
  }
}

// stores search submit button in `searchBtn` var, adds event listeners to search input & button. Both call filterEmployees function
const searchBtn = document.querySelector(".search-submit");
input.addEventListener("keyup", filterEmployees);
searchBtn.addEventListener("click", filterEmployees);

window.onload = () => {
  fetchData();
  cardSelectModalOpen();
  createModal();
};

//testing
