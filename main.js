prediction = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IENOfbcVU/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The gesture is " + toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}


function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}


function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;


        gesture = results[0].label;


        if (results[0].label == "Amazing") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
            toSpeak = "This is looking amazing";
        }
        if (results[0].label == "All the best") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
            toSpeak = "All the best";
        }
        if (results[0].label == "Victory") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
            toSpeak = "That was the marvelous victory";
        }

        
    }
}