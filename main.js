//https://teachablemachine.withgoogle.com/models/xc0HfNbBz/model.json

Webcam.set({
    width:350,
    height:300,
    image_format : 'png' ,
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xc0HfNbBz/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded ! ')
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

var prediction_1 = "";
var prediction_2 = "";

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is " + prediction_1;
    speak_data_2 = "And the Second Prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Dancer pose")
        {
            document.getElementById("update_emoji").innerHTML = "<img src='dancer_pose.png' >";
        }
        if(results[0].label == "Tree pose")
        {
            document.getElementById("update_emoji").innerHTML = "<img src='Tree_pose.png' >";
        }
        if(results[0].label == "Warrior pose")
        {
            document.getElementById("update_emoji").innerHTML = "<img src='warrior_pose.png' >";
        }

        if(results[1].label == "Dancer pose")
        {
            document.getElementById("update_emoji2").innerHTML = "<img src='dancer_pose.png' >";
        }
        if(results[1].label == "Tree pose")
        {
            document.getElementById("update_emoji2").innerHTML = "<img src='Tree_pose.png' >";
        }
        if(results[1].label == "Warrior pose")
        {
            document.getElementById("update_emoji2").innerHTML = "<img src='warrior_pose.png' >";
        }
    }
}