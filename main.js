var prediction1 =  ""
var prediction2 =  ""

Webcam.set(
    {
        width:350,
        height:300,
        image_format: "png",
        png_quality:90
    }
);
camera= document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
    
    });
    
}

console.log("ml5_vesion :"+ml5.version);

Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/s_zlCBwGX/model.json",modelLoded);

function modelLoded()
{
    console.log("Model Loded");
}

function Speak()
{
    synth = window.speechSynthesis;
    speak_data_1 = "the first prediction is"+prediction1;
    speak_data_2 = "the first prediction is"+prediction2;
    speak_data_3 = "all the best"
    speak_data_4 = "this is looking amazing"
    speak_data_5 = "that was a marvelous victory"
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2+speak_data_3+speak_data_4+speak_data_5)
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_image");
    Classifier.classify(img, gotresult);
}

function gotresult(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result)
        document.getElementById("result_hand_name").innerHTML = result[0].label;
        document.getElementById("result_hand_name2").innerHTML = result[1].label;
        
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();

        if(result[0].label == "best"){
            document.getElementById("update_hand").innerHTML = "&#128522;";
            speak_data_3;speak();
        }

        if(result[0].label == "amazing"){
            document.getElementById("update_hand").innerHTML = "&#128076;";
            speak_data_4;speak();
        }

        if(result[0].label == "victory"){
            document.getElementById("update_hand").innerHTML = "&#9996;";
            speak_data_5;speak();
        }

        if(result[1].label == "best"){
            document.getElementById("update_hand2").innerHTML = "&#128522;";
        }

        if(result[1].label == "amazing"){
            document.getElementById("update_hand2").innerHTML = "&#128076;";
        }

        if(result[1].label == "victory"){
            document.getElementById("update_hand2").innerHTML = "&#9996;";
        }
    }
    }

