function setup() {
  canvas = createCanvas(280, 280);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',model_loaded);
}
function model_loaded(){

  console.log("model loaded");
}
var preivous_result='';
function draw(){
  image(video,0,0,280,280);
  classifier.classify(video,gotresult);
}
function gotresult(error,results){
  if(error){
    console.error(error);

  }else{
    if((results[0].confidence>0.5 )&&(preivous_result!=results[0].label)){
    console.log(results);
    preivous_result=results[0].label;
    
synth=window.speechSynthesis;
speak_data="Object detected"+results[0].label;
utterthis=new SpeechSynthesisUtterance(speak_data);
synth.speak(utterthis);

    document.getElementById("object").innerHTML=results[0].label;
    document.getElementById("accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
  }
}



