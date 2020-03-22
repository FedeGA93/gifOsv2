let gifs = [];
const api = "https://api.giphy.com/v1/gifs/";
let botontest = document.getElementById("btn");
const searchBar = document.querySelector('input[type="text"]');
botontest.addEventListener("click", event => {
  event.target;
  searchtext();
  document.getElementById("divContainer").scrollIntoView({ block: "end" });

});

function searchtext() {
  gifs = [];
  clear();
  let searchTerm = document.getElementById("search").value;
  fetch(
    `${api}search?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR&q=${searchTerm}&limit=8&offset=0&rating=G&lang=en`
  )
    .then(function (response) {
      return response.json();
    })
    .then(populateContainer("divContainer"));
  newFrame = "";
  document.getElementById("trend").value = search;
  addSearchTerm(searchTerm);
}

let newframe;
const populateContainer = container =>
  function caspsule(myJson) {
    myJson.data.forEach(data => gifs.push(data.embed_url));
    gifs.forEach(element => {
      (newFrame = document.createElement("iframe")),
        newFrame.setAttribute("src", element),
        document.getElementById(container).appendChild(newFrame);
      newFrame.setAttribute("height", "280px")
      newFrame.setAttribute("width", "280px")

    });
  };
function trends() {
  fetch(
    `${api}trending?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR&q=&limit=8&offset=0&rating=G&lang=en`
  )
    .then(function (response) {
      return response.json();
    })
    .then(populateContainer("divContainer"));
}

let all;

document.getElementById("dark-theme").addEventListener("click", function classToggle() {
  all = document.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    all[i].classList.add("dark");
  }
  document.getElementById("logo").src = "/img/gifOF_logo_dark.png";
});
document.getElementById("light-theme").addEventListener("click", function classDelete() {
  all = document.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("dark");
  }
  document.getElementById("logo").src = "/img/gifOF_logo.png";
});
trends();

/* const arrayBtn = [];
const set = new Set();
function saveSearchs() {
let search = document.getElementById("search").value;
set.add(search);
setJson = JSON.stringify([...set.values()]);
arrayBtn.push(setJson);
let setArrayBtn = JSON.stringify([...arrayBtn.values()]);

console.log(setArrayBtn)}

 */
function clear() {
  document.getElementById("divContainer").innerHTML = "";

}

const set = new Set();
function addSearchTerm(searchTerm) {
  set.add(searchTerm);
  localStorage.setItem('searchTerms', JSON.stringify(Array.from(set)));
  renderStoredSearchTerms();
}
function renderStoredSearchTerms() {
  let storedSearchTerms = localStorage.getItem('searchTerms');
  const father = document.querySelector('.hashtags');
  father.innerHTML = '';
  JSON.parse(storedSearchTerms).forEach(item => {
    const buttonHash = document.createElement('button');
    buttonHash.classList.add('btn-hash');
    father.appendChild(buttonHash);
    buttonHash.innerHTML = ('#' + item);
  });
}