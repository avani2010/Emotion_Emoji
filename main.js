prediction_1="";
prediction_2="";

Webcam.set({width:300,height:300,image_format:'png',png_quality:90});
var camera =document.getElementById("webcam");
Webcam.attach(camera)

function take_snapshot()
{
    Webcam.snap(function(data_uri){document.getElementById("snapshot").innerHTML='<img src="'+data_uri+'" id="photo">'});
}

console.log(ml5.version);

function model_loaded()
{
    console.log("model has been loaded");
}

var load=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json",model_loaded);

function got_result(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);

        prediction_1=results[0].label;
        prediction_2=results[1].label;

        document.getElementById("predict_1").innerHTML=results[0].label;
        if(results[0].label=="angry")
        {
            document.getElementById("emoji_1").src="angry.png";
        }
        if(results[0].label=="happy")
        {
            document.getElementById("emoji_1").src="happy.png";
        }
        if(results[0].label=="sad")
        {
            document.getElementById("emoji_1").src="sad.png";
        }

        document.getElementById("predict_2").innerHTML=results[1].label;
        if(results[1].label=="angry")
        {
            document.getElementById("emoji_2").src="angry.png";
        }
        if(results[1].label=="happy")
        {
            document.getElementById("emoji_2").src="happy.png";
        }
        if(results[1].label=="sad")
        {
            document.getElementById("emoji_2").src="sad.png";
        }
        speak();
    }
}
function speak()
{
    var synth=window.speechSynthesis;
    var data_1="prediction one is"+prediction_1;
    var data_2="prediction two is"+prediction_2;
    var utter_this=new SpeechSynthesisUtterance(data_1+data_2);
    synth.speak(utter_this);
}

function identify()
{
    var image_taken = document.getElementById("photo");
    load.classify(image_taken,got_result);
}

