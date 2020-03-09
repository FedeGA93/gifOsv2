let gifs = [];
const api = "https://api.giphy.com/v1/gifs/";
let botontest = document.getElementById("btn");
const searchBar = document.querySelector('input[type="text"]');
botontest.addEventListener("click", event => {
  event.target;
  searchtext();
});
let searches = document.getElementById("search").value;

function searchtext() {
  let search = document.getElementById("search").value;

  fetch(
    `${api}search?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR&q=${search}&limit=8&offset=0&rating=G&lang=en`
  )
    .then(function(response) {
      return response.json();
    })
    .then(populateContainer("divContainer"));
  newFrame = "";
  document.getElementById("trend").value = search;
  gifs = [];
  saveSearchs();
}

const populateContainer = container =>
  function caspsule(myJson) {
    for (let i = 0; i < myJson.data.length; i++) {
      gifs.push(myJson.data[i].embed_url);
      //revisar esto, hacer refactory
      let newFrame = document.createElement("iframe");
      newFrame.setAttribute("src", gifs[i]);
      document.getElementById(container).appendChild(newFrame);
    }
  };
function trends() {
  fetch(
    `${api}trending?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR&q=&limit=8&offset=0&rating=G&lang=en`
  )
    .then(function(response) {
      return response.json();
    })
    .then(populateContainer("divContainer"));
  newFrame = "";
  gifs = [];
}
let all;
function classToggle() {
  all = document.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    all[i].classList.add("dark");
  }
  document.getElementById("logo").src = "/img/gifOF_logo_dark.png";
}
function classDelete() {
  all = document.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("dark");
  }
  document.getElementById("logo").src = "/img/gifOF_logo.png";
}
trends();

let arrayBtn = [];
const set = new Set();
function saveSearchs(searches) {
  const searchInput = document.getElementById("search").value;
  const father = document.querySelector(".hashtags");
  const buttonHash = document.createElement("button");
  buttonHash.classList.add("btn-hash");
  father.appendChild(buttonHash);
  set.add(searchInput);
  arrayBtn = Array.from(set);
  console.log(arrayBtn);
  arrayBtn.forEach(item => {
    buttonHash.innerHTML = "#" + item;
  });
}
