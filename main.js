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
    speak_data_2 = "the second prediction is"+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2)
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
        
        Speak()

        if(result[0].label == "best"){
            document.getElementById("update_hand").innerHTML = "&#128522;";
            prediction1 = "all the best";
            
        }

        if(result[0].label == "amazing"){
            document.getElementById("update_hand").innerHTML = "&#128076;";
            prediction1 = "this is looking amazing";
        }

        if(result[0].label == "victory"){
            document.getElementById("update_hand").innerHTML = "&#9996;";
            prediction1 = "that was a marvelous victory";
        }

        if(result[1].label == "best"){
            document.getElementById("update_hand2").innerHTML = "&#128522;";
            prediction2 = "all the best";
        }

        if(result[1].label == "amazing"){
            document.getElementById("update_hand2").innerHTML = "&#128076;";
            prediction2 = "this is looking amazing";
        }

        if(result[1].label == "victory"){
            document.getElementById("update_hand2").innerHTML = "&#9996;";
            prediction2 = "that was a marvelous victory";
        }
    }
    }

