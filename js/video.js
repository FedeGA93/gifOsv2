const video = document.querySelector("video");
let recorder;
async function stopRecordingCallback() {
  video.srcObject = null;
  let blob = await recorder.getBlob();
  video.src = URL.createObjectURL(blob);
  recorder.stream.getTracks(t => t.stop());
  // reset recorder's state
  await recorder.reset();
  // clear the memory
  await recorder.destroy();
  // so that we can record again
  recorder = null;
}

document.getElementById("btn-start-recording").addEventListener("click", async function() {
  videoLayout();
  this.disabled = true;
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });
  video.srcObject = stream;
  recorder = new RecordRTCPromisesHandler(stream, {
    type: "video",
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240
  });
  document.getElementById("btn-record").addEventListener("click", async function(){
   midStep();
    await recorder.startRecording();
    // helps releasing camera on stopRecording
    recorder.stream = stream;
    document.getElementById("btn-stop-recording").disabled = false;
    // if you want to access internal recorder
    const internalRecorder = await recorder.getInternalRecorder();
    console.log("internal-recorder", internalRecorder.name);
    // if you want to read recorder's state
    console.log("recorder state: ", await recorder.getState());
    document.getElementById("btn-save").addEventListener("click", async function() {
      await recorder.stopRecording();
      recorder.stream.getTracks(t => t.stop());
      finalStep();
    });

 /*    document.getElementById("btn-stop-recording").addEventListener("click", async function() {
        menuLayout()
        this.disabled = true;
        await recorder.stopRecording();
        stopRecordingCallback();
        document.getElementById("btn-start-recording").disabled = false;
      }); */
  })
})

/* document.getElementById("btn-start-recording").addEventListener("click", async function() {
    videoLayout();
    this.disabled = true;
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    video.srcObject = stream;
    recorder = new RecordRTCPromisesHandler(stream, {
      type: "video",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240
    });
    await recorder.startRecording();
    // helps releasing camera on stopRecording
    recorder.stream = stream;
    document.getElementById("btn-stop-recording").disabled = false;
    // if you want to access internal recorder
    const internalRecorder = await recorder.getInternalRecorder();
    console.log("internal-recorder", internalRecorder.name);
    // if you want to read recorder's state
    console.log("recorder state: ", await recorder.getState());
    document.getElementById("btn-stop-recording").addEventListener("click", async function() {
        menuLayout()
        this.disabled = true;
        await recorder.stopRecording();
        stopRecordingCallback();
        document.getElementById("btn-start-recording").disabled = false;
      });
  });
 */
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

function videoLayout() {
  document.getElementById("video").classList.remove("hide");
  document.getElementById("text-box").classList.add("hide");
  document.getElementById("myGifos-bar").classList.add("hide");
  document.getElementById("window-txt").innerHTML="Un Chequeo Antes de Empezar";
  document.getElementById("windowContainer").classList.remove("square-windows");
  document.getElementById("windowContainer").classList.add("newSize");
  document.getElementById("btn-record").classList.add("btn-flex");
}

function menuLayout() {
  document.getElementById("video").classList.add("hide");
  document.getElementById("text-box").classList.remove("hide");
  document.getElementById("myGifos-bar").classList.remove("hide");
}
function midStep(){  
  document.getElementById("btn-record").classList.remove("btn-flex");
  document.getElementById("btn-record").classList.add("hide");
  document.getElementById("btn-save").classList.remove("hide");
  document.getElementById("btn-save").classList.add("flex");
}
function finalStep() {
  document.getElementById("btn-save").classList.add("hide");
  document.getElementById("final-step").classList.remove("hide");
  document.getElementById("final-step").classList.add("flex")
  stopRecordingCallback();
  
}