let gifs = [];
const api = "https://api.giphy.com/v1/gifs/";
let botontest = document.getElementById("btn");
const searchBar = document.querySelector('input[type="text"]');
botontest.addEventListener("click", event => {
  event.target;
  searchtext();
  document.getElementById("divContainer").scrollIntoView({block: "end"});

});

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
  getSearchs(search);
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
function clear(){
  document.getElementById("divContainer").innerHTML = "";

}


let arrayBtn = []
const set = new Set()
function getSearchs (search) {
  set.add(search)
  arrayBtn = Array.from(set)
  console.log(set)
  localStorage.setItem("searchs", JSON.stringify(arrayBtn));
  savedSearchs()
};

function savedSearchs(){
  const father = document.querySelector(".hashtags");
  const buttonHash = document.createElement("button");
  buttonHash.classList.add("btn-hash");
  father.appendChild(buttonHash);
  let newButton = localStorage.getItem("searchs");
  console.log(JSON.parse(newButton))
  JSON.parse(newButton).forEach(item  => {
    buttonHash.innerHTML = ("#" + item);
  })
}