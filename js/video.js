const video = document.querySelector("video");
const uploadURL = "http://upload.giphy.com/v1/gifs?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR";
const myGifosLocal = [];
let all;

let recorder;

async function stopRecordingCallback() {
  video.srcObject = null;
  let blob = await recorder.getBlob();
  console.log(blob)
  video.src = URL.createObjectURL(blob);
  document.querySelector("#repeat").addEventListener("click", async function() {
    await recorder.reset();
    await recorder.destroy();
    recorder = null;
    clearLayout();
    videoLayout();
    startRecording()

  });

  document.querySelector("#video-preview").classList.add("hide");
  document.querySelector("#gif-preview").setAttribute("src", video.src);
  document.querySelector("#gif-preview").classList.add("gif-size");
  document.querySelector("#upload").addEventListener("click", () => {
    uploading()
    let formData = new FormData();
    formData.append("file", blob, "myGif.gif");
    console.log(formData.get("file"));
    let req = new Request(uploadURL, {
      method: "POST",
      headers: new Headers(),
      mode: "no-cors",
      body: formData,
      username: "fedegomezavalos",
      type: "video/webm"
    });
    console.log(req);
    fetch(req)
      .then(response => {
        console.log("Response received from server " + response);
      })
      .catch(err => {
        console.log("ERROR: ", err.message);
      });
  });
}
document
  .querySelector("#btn-start-recording")
  .addEventListener("click", async function startRecording() {
    videoLayout();
    this.disabled = true;
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    video.srcObject = stream;
    recorder = new RecordRTCPromisesHandler(stream, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240
    });
    document
      .querySelector("#btn-record")
      .addEventListener("click", async function() {
        midStep();
        await recorder.startRecording();
        // helps releasing camera on stopRecording
        recorder.stream = stream;
        /* // if you want to access internal recorder
        const internalRecorder = await recorder.getInternalRecorder();
        console.log("internal-recorder", internalRecorder.name);
        // if you want to read recorder's state
        console.log("recorder state: ", await recorder.getState()); */
        document
          .querySelector("#btn-save")
          .addEventListener("click", async function() {
            await recorder.stopRecording();
            recorder.stream.getTracks(t => t.stop());
            finalStep();
          });
      });
 
    });

document
  .querySelector("#dark-theme")
  .addEventListener("click", function classToggle() {
    all = document.getElementsByTagName("*");
    for (let i = 0; i < all.length; i++) {
      all[i].classList.add("dark");
    }
    document.querySelector("#logo").src = "/img/gifOF_logo_dark.png";
  });
document
  .querySelector("#light-theme")
  .addEventListener("click", function classDelete() {
    all = document.getElementsByTagName("*");
    for (let i = 0; i < all.length; i++) {
      all[i].classList.remove("dark");
    }
    document.querySelector("#logo").src = "/img/gifOF_logo.png";
  });

function videoLayout() {
  document.querySelector("#video").classList.remove("hide");
  document.querySelector("#text-box").classList.add("hide");
  document.querySelector("#myGifos-bar").classList.add("hide");
  document.querySelector("#window-txt").innerHTML="Un Chequeo Antes de Empezar";
  document.querySelector("#windowContainer").classList.remove("square-windows");
  document.querySelector("#windowContainer").classList.add("newSize");
  document.querySelector("#btn-record").classList.add("btn-flex");
  document.querySelector("#video-preview").classList.remove("hide");

}

function menuLayout() {
  document.querySelector("#video").classList.add("hide");
  document.querySelector("#text-box").classList.remove("hide");
  document.querySelector("#myGifos-bar").classList.remove("hide");
}
function midStep() {
  document.querySelector("#btn-record").classList.remove("btn-flex");
  document.querySelector("#btn-record").classList.add("hide");
  document.querySelector("#btn-save").classList.remove("hide");
  document.querySelector("#btn-save").classList.add("btn-flex");
}
function finalStep() {
  document.querySelector("#gif-preview").classList.remove("hide");
  document.querySelector("#btn-save").classList.remove("btn-flex");
  document.querySelector("#btn-save").classList.add("hide");
  document.querySelector("#final-step").classList.remove("hide");
  document.querySelector("#final-step").classList.add("btn-flex");
  stopRecordingCallback();
}
function clearLayout() {
  document.querySelector("#final-step").classList.remove("btn-flex");
  document.querySelector("#final-step").classList.add("hide");
  document.querySelector("#gif-preview").classList.remove("gif-size");
  document.querySelector("#gif-preview").classList.add("hide");

}

function uploading(){
  document.querySelector("#uploading").classList.remove("hide");
  document.querySelector("#gif-preview").classList.add("hide");
  document.querySelector("#repeat").classList.add("hide");
  document.querySelector("#upload").classList.add("hide");
  
}
