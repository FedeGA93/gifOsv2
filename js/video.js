const video = document.querySelector("video");
const uploadURL = "http://upload.giphy.com/v1/gifs?api_key=5k0ncuBQ9e0JQau3FauPqVrzbWfJiqqR";
let all;
let stream;
let recorder;
let myGifosLocal = localStorage.getItem("myGifs");

async function stopRecordingCallback() {
    video.srcObject = null;
    let blob = await recorder.getBlob();
    video.src = URL.createObjectURL(blob);
    await recorder.reset();
    await recorder.destroy();
    recorder = null;
    createPreviews()
    document.querySelector("#upload").addEventListener("click", () => {
        uploading()
        let formData = new FormData();
        formData.append("file", blob, "myGif.gif");
        console.log(formData.get("file"));
        let req = new Request(uploadURL, {
            method: "POST",
            headers: new Headers(),
            body: formData,
            username: "fedegomezavalos",
            type: "gif"
        });
        console.log(req);
        fetch(req)
            .then(response => response.json())
            .then(json => {
                let id = json.data.id;
                console.log(id)
                storeGifId(id);
            })
            .catch(err => {
                console.log("ERROR: ", err.message);
            });
    });
}

function recordAgain() {
    document.querySelector("#repeat").addEventListener("click", async function () {
        clearLayout();
        videoLayout();
        video.srcObject = stream;
        document.querySelector("#videoContainer").classList.remove("hide");
        document.querySelector("#btn-record").classList.remove("hide");
    });
}

function startRecord() {
    document
        .querySelector("#btn-start-recording")
        .addEventListener("click", async function startRecording() {
            videoLayout();
            this.disabled = true;
            stream = await navigator.mediaDevices.getUserMedia({
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
                .addEventListener("click", async function () {

                    midStep();
                    this.disabled = true;
                    stream = await navigator.mediaDevices.getUserMedia({
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
                    })
                    await recorder.startRecording();
                    recorder.stream = stream;
                    document
                        .querySelector("#btn-save")
                        .addEventListener("click", async function () {
                            await recorder.stopRecording();
                            recorder.stream.getTracks(t => t.stop());
                            finalStep();
                        });
                });

        });
}
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
    document.querySelector("#myGifos").classList.add("hide");
    document.querySelector("#window-txt").innerHTML = "Un Chequeo Antes de Empezar";
    document.querySelector("#windowContainer").classList.remove("square-windows");
    document.querySelector("#windowContainer").classList.add("newSize");
    document.querySelector("#btn-record").classList.add("btn-flex");
    document.querySelector("#video-preview").classList.remove("hide");

}

function menuLayout() {
    document.querySelector("#video").classList.add("hide");
    document.querySelector("#text-box").classList.remove("hide");
    document.querySelector("#myGifos-bar").classList.remove("hide");
    document.querySelector("#miGifos").classList.add("hide");

}

function midStep() {
    document.querySelector("#btn-record").classList.remove("btn-flex");
    document.querySelector("#btn-record").classList.add("hide");
    document.querySelector("#btn-save").classList.remove("hide");
    document.querySelector("#btn-save").classList.add("btn-flex");
    document.querySelector("#window-txt").innerHTML = "Capturando tu Guifo";

}

function finalStep() {
    document.querySelector("#gif-preview").classList.remove("hide");
    document.querySelector("#btn-save").classList.remove("btn-flex");
    document.querySelector("#btn-save").classList.add("hide");
    document.querySelector("#final-step").classList.remove("hide");
    document.querySelector("#final-step").classList.add("btn-flex");
    document.querySelector("#window-txt").innerHTML = "Vista Previa";

    stopRecordingCallback();
}

function clearLayout() {
    document.querySelector("#final-step").classList.remove("btn-flex");
    document.querySelector("#final-step").classList.add("hide");
    document.querySelector("#gif-preview").classList.remove("gif-size");
    document.querySelector("#gif-preview").classList.add("hide");

}

function createPreviews() {
    document.querySelector("#video-preview").classList.add("hide");
    document.querySelector("#gif-preview").setAttribute("src", video.src);
    document.querySelector("#gif-preview").classList.add("gif-size");
    document.querySelector("#gif-uploaded").setAttribute("src", video.src)
}

function uploading() {
    document.querySelector("#uploading").classList.remove("hide");
    document.querySelector("#gif-preview").classList.add("hide");
    document.querySelector("#repeat").classList.add("hide");
    document.querySelector("#upload").classList.add("hide");
    setTimeout(function uploadFinished() {
        document.querySelector("#guifoCreate").classList.remove("hide");
        document.querySelector("#uploading").classList.add("hide");
        document.querySelector("#gif-uploaded").classList.add("gif-preview");
        document.querySelector("#windowContainer").classList.add("window-resize")

    }, 13000);
};
function storeGifId(id) {
    let storedIds = localStorage.getItem('storedGifs');
    let localStorageIds = [];
    if(storedIds !== null){
        localStorageIds = JSON.parse(storedIds);
    }
    localStorageIds.push(id)
    localStorage.setItem('storedGifs', JSON.stringify(localStorageIds));
}


function renderStoredGifs() {
    let storedId = localStorage.getItem('storedGifs');
    console.log(storedId)
    const father = document.querySelector('#myLocalGifs');
    father.innerHTML = '';
    if (storedId !== null) {
        JSON.parse(storedId).forEach(id => {
            const imgContainer = document.createElement('img');
            let url = `https://i.giphy.com/media/${id}/giphy.webp`;
            console.log(url)
            imgContainer.setAttribute("src", url)
            imgContainer.className =" img-size";
            father.appendChild(imgContainer);
        })
    };


}

window.onload = renderStoredGifs();

startRecord()
recordAgain();