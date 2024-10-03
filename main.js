Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
})
camera = document.getElementById("camera")
Webcam.attach('#camera')

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="cap"src="' + data_uri + '"/>'
    })
}

console.log("ml5version:", ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dMq4oUeH3/model.json", modelLoaded)

function modelLoaded() {
    console.log(modelLoaded)
}
var prediction1
var prediction2

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The First Prediction is" + prediction1;
    speak_data2 = "The Second Prediction is" + prediction2;
    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    utterThis.rate = 0.5
    synth.speak(utterThis)
}
function check() {
    img = document.getElementById("cap");
    classifier.classify(img, gotResult)
}
function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label
        document.getElementById("result_emotion_name2").innerHTML = results[1].label
        prediction1 =results[0].label
        prediction2 = results[1].label
        speak()
        if (prediction1 == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;"
        }
        if (prediction1 == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;"
        }
        if (prediction1 == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548;"
        }
        if (prediction2 == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;"
        }
        if (prediction2 == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;"
        }
        if (prediction2 == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;"
        }
    }
}