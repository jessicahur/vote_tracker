
/*function resetImgs() {
  voteAllowed = true;
  imgLeftE.className  = "imgNormal";
  imgRightE.className = "imgNormal";
}

function resetPool() { // Once all images have been shown, start over
  resetImgs();
  // Slice() forces copy by value (doesn't just create a reference)
  if (myChartObj) { delete myChartObj; }
}
working_array = [];

fnPool  = working_array.slice();

img_fn = ["blueMarinatedTurkey.jpg", "condimentSprays.jpg", "cornDogs.jpg", "cranberryCandles.jpg", "frozenShrimp.jpg", "frozenWhatAreThese.jpg", "heatedSoda.jpg", "jelloMayoTurkey.jpg", "pastaOnionsCandy.jpg", "whipcreamSoup.jpg"];

function img_obj (img_name, vote) {
  this.img_name = img_name;
  this.vote = vote;
}
working_array = [];
for (var jj=0; jj < img_fn.length; jj++) {

  var vote = getRandIntOnRange(2, 50);
  working_array.push(new img_obj(img_fn[jj], vote));
  console.log(working_array);
}

function global_init() {
  imgDir = "./img/"

  imgLeftE  = document.getElementById("imgLeft");
  imgRightE = document.getElementById("imgRight");
  btnVote   = document.getElementById("btnVote");
  btnNew    = document.getElementById("btnNew");
  divStats  = document.getElementById("divStats");
  myChart   = document.getElementById("myChart");

  ctx = myChart.getContext("2d");
  myChartObj = 0;

  resetPool();

  imgLeftE.addEventListener( "click", selectImg);
  imgRightE.addEventListener("click", selectImg);
  imgLeftE.addEventListener( "mouseover", selectImg);
  imgRightE.addEventListener("mouseover", selectImg);

  btnVote.addEventListener("click", recordVote);
  btnNew.addEventListener("click", newPair);
}

function getRandIntOnRange (a, b) {
  var r = Math.random();
  var t = a + Math.floor(r * (b-a+1));
  return t;
}

var index_1 = getRandIntOnRange(0, (fnPool.length)-1);
var index_2 = getRandIntOnRange(0, (fnPool.length)-1);

function showRandImg() {
  while (index_1 === index_2) {
    index_2 = getRandIntOnRange(0, (fnPool.length)-1);
  }
imgLeftE.src = imgDir + fnPool[index_1].img_name;
// Extend object to have an property that holds idx w.r.t. original fn array
imgRightE.src =  imgDir +  fnPool[index_2].img_name;
if (index_1 < index_2) {
  fnPool.splice(index_2, 1)
} else {
  fnPool.splice(index_1, 1)
}
}

function selectImg() {
  if (voteAllowed) {
    resetImgs();
    this.className = "imgPicked";
    if (this.src == imgDir + fnPool[index_1].img_name) {
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
  }
}

function showChart() {
  console.log("showChart()");
  var fnL = img_fn[imgLeftE.idxOrig];
  var fnR = img_fn[imgRightE.idxOrig];
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
      data: [5, 2] // Bogus data -- use your vote counts instead
    },
    { label: "Percentage split",
    fillColor: "rgba(151,187,205,0.5)",
    strokeColor: "rgba(151,187,205,0.8)",
    highlightFill: "rgba(151,187,205,0.75)",
    highlightStroke: "rgba(151,187,205,1)",
    data: [5/(5+2), 2/(5+2)]
  }
]
};
myChartObj = new Chart(ctx).Bar(data);

btnNew.style.display = "inline";
btnNew.style.visibility = "visible";
}

  if (myChartObj) { delete myChartObj; }


  if (fnPool.length < 2) {
    console.log("Not enough images left. Resetting pool");
    resetPool();
  }

  voteAllowed = true;
  showRandImg(imgLeftE);
  showRandImg(imgRightE);
}

global_init();

showRandImg(imgLeftE);
showRandImg(imgRightE);
*/
