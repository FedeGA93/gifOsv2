let gifs = [];
const api = "https://api.giphy.com/v1/gifs/";
let botontest = document.getElementById("btn");
let all;

const searchBar = document.querySelector('input[type="text"]');
botontest.addEventListener("click", event => {
  event.target;
  searchtext();
});

function searchtext() {
  gifs = [];
  clearContainer();
  let searchTerm = document.getElementById("search").value;
  console.log(searchTerm)

  if (searchTerm !== null) {
  fetch(
    `${api}search?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR&q=${searchTerm}&limit=8&offset=0&rating=G&lang=en`
  )
    .then(function (response) {
      return response.json();
    })
    .then(populateContainer("divContainer"));
  newImg = "";
  document.getElementById("trend").value = searchTerm;
  addSearchTerm(searchTerm);
  }else{alert("La busqueda está vacia")}
}
let newImg;
const populateContainer = container =>
  function caspsule(myJson) {
    myJson.data.forEach(data => gifs.push(data.id));
    gifs.forEach(element => {
        newImg = document.createElement("img"),
        newImg.setAttribute("src",`https://i.giphy.com/media/${element}/giphy.webp`),
        document.getElementById(container).appendChild(newImg),
        newImg.setAttribute("height", "280px"),
        newImg.setAttribute("width", "280px")     
     });
  };
function trendsGenerator() {
  fetch(
    `${api}trending?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR&q=&limit=20&offset=0&rating=G&lang=en`
  )
    .then(function (response) {
      return response.json();
    })
    .then(populateContainer("divContainer"));
}

function randomSuggestionsGenerator(){
  fetch(
    `${api}random?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR`
  )
    .then(function (response) {
      return response.json();
    })
    .then(populateRandomContainer("divSuggestions"));
}

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


function clearContainer() {
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
    buttonHash.value = item;
  });
}
const populateRandomContainer = container =>
  function caspsule(myJson) {
    let id = myJson.data.id;
    let title = myJson.data.title
    newImg = document.createElement("img");
    newImg.setAttribute("src",`https://i.giphy.com/media/${id}/giphy.webp`);
    document.getElementById(container).appendChild(newImg);
    newImg.setAttribute("height", "280px");
    newImg.setAttribute("width", "280px");
    newImg.setAttribute("title", title);
    newImg.setAttribute("class", "holi")
    
  };

for(i=0;i<4;i++){ randomSuggestionsGenerator();}
setTimeout(function(){ document.getElementsByClassName("trends").addEventListener("mouseover", function(){
  alert("prueba")
}) }, 10000);


renderStoredSearchTerms()
trendsGenerator()