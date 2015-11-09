showRandImg();
global_init();
resetPool();

var img_fn = ["blueMarinatedTurkey.jpg", "condimentSprays.jpg", "cornDogs.jpg", "cranberryCandles.jpg", "frozenShrimp.jpg", "frozenWhatAreThese.jpg", "heatedSoda.jpg", "jelloMayoTurkey.jpg", "pastaOnionsCandy.jpg", "whipcreamSoup.jpg"];
imgDir = "./img/"
var fnPool = [];
var working_array = [];
var imgLeftE  = document.getElementById("imgLeft");
var imgRightE = document.getElementById("imgRight");
var btnVote   = document.getElementById("btnVote");
var btnNew    = document.getElementById("btnNew");
var divStats  = document.getElementById("divStats");
var myChart   = document.getElementById("myChart");

var ctx = myChart.getContext("2d");
var myChartObj = 0;

imgLeftE.addEventListener( "click", selectImg);
imgRightE.addEventListener("click", selectImg);
imgLeftE.addEventListener( "mouseover", selectImg);
imgRightE.addEventListener("mouseover", selectImg);

btnVote.addEventListener("click", recordVote);
btnNew.addEventListener("click", newPair);


var index_1 = getRandIntOnRange(0, (fnPool.length)-1);
var index_2 = getRandIntOnRange(0, (fnPool.length)-1);

function resetImgs() {
  voteAllowed = true;
  imgLeftE.className  = "imgNormal";
  imgRightE.className = "imgNormal";
}

function resetPool() { // Once all images have been shown, start over
  resetImgs();
  // Slice() forces copy by value (doesn't just create a reference)
  if (myChartObj) { delete myChartObj; }
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
  fnPool  = working_array.slice();
}

/**/
function getRandIntOnRange (a, b) {
  var r = Math.random();
  var t = a + Math.floor(r * (b-a+1));
  return t;
}

function showRandImg() {
  if (index_1 === index_2) {
    index_2 = getRandIntOnRange(0, (fnPool.length)-1);
  }
  imgLeftE.src = imgDir + fnPool[index_1].img_name;
  imgRightE.src =  imgDir +  fnPool[index_2].img_name;
}
/*if (index_1 < index_2) {
fnPool.splice(index_2, 1)
} else {
fnPool.splice(index_1, 1)
}

}*/
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
  } else {
    console.log("voted. idxSelect="+idxSelect);
    fnPool[index_2].vote++;
    voteAllowed = false;
    btnVote.style.visibility = "hidden";
    showChart();
  }
}
function newPair() {
  console.log("newPair()");
  btnNew.style.visibility = "hidden";
  btnVote.style.visibility = "visible";


  /*** !! Insert code HERE to hide your chart !! ***/

  // This might correctly free some memory, but it doesn't wipe or hide the
  // graphic that is "cached" in your <canvas>
  if (myChartObj) { delete myChartObj; }


  if (fnPool.length < 2) {
    console.log("Not enough images left. Resetting pool");
    resetPool();
  }

  voteAllowed = true;
  showRandImg(imgLeftE);
  showRandImg(imgRightE);
}
