var img_fn = ["blueMarinatedTurkey.jpg", "condimentSprays.jpg", "cornDogs.jpg",
 "cranberryCandles.jpg", "frozenShrimp.jpg", "frozenWhatAreThese.jpg", "heatedSoda.jpg",
 "jelloMayoTurkey.jpg", "pastaOnionsCandy.jpg", "whipcreamSoup.jpg",
"BotChien.jpg", "BunBoHue.jpg", "OrangeChick.jpg", "StirfriedVeggie.jpg", "VNpancake.jpg",
"bellPeper.jpg", "bunRieu.jpg", "chickenSalad.jpg", "kimbap.jpg", "tteokbokki2.jpg"];
var imgDir = "./img/"
var fnPool = [];
var working_array = [];
var intermediate = [];
var imgLeftE  = $('#imgLeft')[0];
var imgRightE = $('#imgRight')[0];
var btnVote   = $('#btnVote')[0];
var btnNew    = $('#btnNew')[0];
var divStats  = $("#divStats")[0];
var myChart   = $("#myChart")[0];

var ctx = myChart.getContext("2d");
var myChartObj = 0;

imgLeftE.addEventListener( "click", selectImg);
imgRightE.addEventListener("click", selectImg);
/*imgLeftE.addEventListener( "mouseover", selectImg);
imgRightE.addEventListener("mouseover", selectImg);*/

btnVote.addEventListener("click", recordVote);
btnNew.addEventListener("click", newPair);

function resetImgs() {
  voteAllowed = true;
  imgLeftE.className  = "imgNormal";
  imgRightE.className = "imgNormal";
}

function resetPool() { // Once all images have been shown, start over
  resetImgs();
  // Slice() forces copy by value (doesn't just create a reference)
  if (myChartObj) { myChartObj.destroy(); }
<<<<<<< HEAD
  fnPool  = working_array.slice();
=======
  fnPool  = intermediate.slice();
  intermediate = [];
>>>>>>> eee1086ab6183fd86751c2ea80128d2f1dc88a9a
}

function img_obj (img_name, vote) {
  this.img_name = img_name;
  this.vote = vote;
}

function global_init() {
  for (var jj=0; jj < img_fn.length; jj++) {
    var vote = getRandIntOnRange(2, 50);
    working_array.push(new img_obj(img_fn[jj], vote));
    console.log(working_array);
  }
<<<<<<< HEAD
=======
  intermediate = working_array.slice();
>>>>>>> eee1086ab6183fd86751c2ea80128d2f1dc88a9a
  /*fnPool  = working_array.slice();*/
}

function getRandIntOnRange (a, b) {
  var r = Math.random();
  var t = a + Math.floor(r * (b-a+1));
  return t;
}

function showRandImg() {
  index_1 = getRandIntOnRange(0, (fnPool.length)-1);
  index_2 = getRandIntOnRange(0, (fnPool.length)-1);

while (index_1 === index_2) {
    index_2 = getRandIntOnRange(0, (fnPool.length)-1);
  }
  imgLeftE.src = imgDir + fnPool[index_1].img_name;
  imgRightE.src =  imgDir +  fnPool[index_2].img_name;
}

function selectImg() {
  if (voteAllowed) {
    resetImgs();
    this.className = "imgPicked";
    if (imgLeftE.className === "imgPicked") {
      idxSelect = index_1;
    } else
    idxSelect = index_2;
  }
}

function recordVote() {
  if (idxSelect == index_1) {
    console.log("voted. idxSelect="+idxSelect);
    fnPool[index_1].vote++;
    voteAllowed = false;
    btnVote.style.visibility = "hidden";
    showChart();
  } else {
    console.log("voted. idxSelect="+idxSelect);
    fnPool[index_2].vote++;
    voteAllowed = false;
    btnVote.style.visibility = "hidden";
    showChart();

  }
  if (index_1 < index_2) {
<<<<<<< HEAD
    fnPool.splice(index_2, 1)
    fnPool.splice(index_1, 1)
  } else {
    fnPool.splice(index_1, 1)
    fnPool.splice(index_2, 1)
=======
    var temp1, temp2;
    temp1 = fnPool.splice(index_2, 1);
    intermediate.push(temp1[0]);
    temp2 = fnPool.splice(index_1, 1);
    intermediate.push(temp2[0]);
  } else {
    temp1 = fnPool.splice(index_1, 1);
    intermediate.push(temp1[0]);
    temp2 = fnPool.splice(index_2, 1);
    intermediate.push(temp2[0]);
>>>>>>> eee1086ab6183fd86751c2ea80128d2f1dc88a9a
  }
  console.log(fnPool)
}

function newPair() {
  console.log("newPair()");
  btnNew.style.visibility = "hidden";
  btnVote.style.visibility = "visible";
  if (myChartObj) { myChartObj.destroy(); }
  if (fnPool.length < 2) {
    console.log("Not enough images left. Resetting pool");
    if (fnPool.length===1){
      intermediate.push(fnPool[0]);
    }
    resetPool();
  }
  voteAllowed = true;
  showRandImg();

}

function showChart() {
  console.log("showChart()");
  var fnL = fnPool[index_1].img_name;
  var fnR = fnPool[index_2].img_name;;
  var labelL = fnL.split(".")[0];
  var labelR = fnR.split(".")[0];

  var data = {
    labels: [labelL, labelR],
    datasets: [
      { label: "Raw votes",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: [ fnPool[index_1].vote, fnPool[index_2].vote] // Bogus data -- use your vote counts instead
    },
    { label: "Percentage split",
    fillColor: "rgba(151,187,205,0.5)",
    strokeColor: "rgba(151,187,205,0.8)",
    highlightFill: "rgba(151,187,205,0.75)",
    highlightStroke: "rgba(151,187,205,1)",
    data: [fnPool[index_1].vote/(fnPool[index_1].vote+fnPool[index_2].vote)*100, fnPool[index_2].vote/(fnPool[index_1].vote+fnPool[index_2].vote)*100]
  }
]
};
myChartObj = new Chart(ctx).Bar(data);

btnNew.style.display = "inline";
btnNew.style.visibility = "visible";
}

global_init();
resetPool();
showRandImg();
