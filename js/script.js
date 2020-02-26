let gifs = [];
const api = "https://api.giphy.com/v1/gifs/";
let botontest = document.getElementById("btn");
botontest.addEventListener("click", event => {
  event.target;
  searchtext();
});

function searchtext() {
  let search = document.getElementById("search").value;
  fetch(
    `${api}search?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR&q=${search}&limit=8&offset=0&rating=G&lang=en`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      for (let i = 0; i < myJson.data.length; i++) {
        gifs.push(myJson.data[i].embed_url);
        //revisar esto, hacer refactory
        let newFrame = document.createElement("iframe");
        newFrame.setAttribute("src", gifs[i]);
        document.getElementById("divContainer").appendChild(newFrame)
      }
    });
  document.getElementById("trend").value = search;
  gifs = [];
  document.getElementById("trend").scrollIntoView();
}

function darkMode() {
  let element = document.body;
  element.classList.toggle("dark");
}


