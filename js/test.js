let btnRecord = document.getElementById("btn-record");
btnRecord.addEventListener("click", event => {
    event.target;
    getStreamAndRecord();
})
function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();

        })
}
