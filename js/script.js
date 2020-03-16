let gifs = [];
const api = "https://api.giphy.com/v1/gifs/";
let botontest = document.getElementById("btn");
const searchBar = document.querySelector('input[type="text"]');
botontest.addEventListener("click", event => {
  event.target;
  searchtext();
  document.getElementById("divContainer").scrollIntoView({block: "end"});

});
let searches = document.getElementById("search").value;

function searchtext() {
  gifs = [];
  clear();
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
  saveSearchs();
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
    .then(function(response) {
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

let arrayBtn = [];
const set = new Set();
function saveSearchs() {
  const search = document.getElementById("search").value;
  let father = document.querySelector(".hashtags");
  const buttonHash = document.createElement("button");
  buttonHash.classList.add("btn-hash");
  father.appendChild(buttonHash);
  set.add(search);
  arrayBtn = Array.from(set);

  arrayBtn.forEach(item => {
  buttonHash.innerHTML = "#" + item;
  father = "";

});
}

function btnSearch(){
  btnHash = document.querySelector(".btn-hash");
  btnSearch = btnHash.value
  btnHash.addEventListener("click", ()=>{
  btnSearch = btnHash.value
  searchtext(btnHash)
  })
}
function clear(){
  document.getElementById("divContainer").innerHTML = "";

}
/* 

function renderTags(tags){
  const tagElements  = tags.map(item => {const tag = createElement('div');
  tag.innerHtml = `#${item}`;
  const tagContainer = document.getElementById("tag-container");
  tagElements.forEach(element => tagContainer.appendChild(element))
})}

function createTags(search){
 const tags =localStorage.getItem('searchHistory');
 const newTags = [search].concat(tags.filter(item => item != search))
 localStorage.setItem('searchHistory',newTags)
 createTags(newTags)
} */