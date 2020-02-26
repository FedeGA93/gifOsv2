let gifs = [];
const api = "https://api.giphy.com/v1/gifs/";
let botontest = document.getElementById("btn");
let divContainer = document.getElementById("divContainer");
let searchBar = document.getElementById("trend");
botontest.addEventListener("click", event => {
  event.target;
  searchtext();
});
function searchtext() {
  let search = document.getElementById("search").value;
  fetch(
    `${api}search?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR&q=${search}&limit=25&offset=0&rating=G&lang=en`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      for (let i = 0; i < myJson.data.length; i++) {
        gifs.push(myJson.data[i].embed_url);
        //revisar esto, hacer refactory
        let newFrame = document.createElement("iframe");
        newFrame.setAttribute("src", gifs[i]);
        document.body.appendChild(newFrame)
      }
    });
    searchBar.innerHTML= search;

  gifs = [];
  let test = document.getElementById("barra");
}
/* document
  .querySelector("section div form button")
  .addEventListener("click", event => {
    event.preventDefault();
  }); */
